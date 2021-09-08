const express = require('express')
const methodOverride = require('method-override')
const { body, validationResult, check } = require('express-validator')
const app = express()
require('./utils/mongoose-module.js')
const { Contact } = require('./model/mContact.js')
const PORT = 3000

// set view engine
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.urlencoded())
// ----------------

// CONTACT PAGE
app.get('/contact', async(req, res) => {
  const allDataContact = await Contact.find()
  res.render('contact-page', {
    allDataContact
  })
})

// ADD FORM PAGE
app.get('/contact/add', (req,res) => {
  res.render('add-page')
})


// ADD PROCESS
app.post('/contact', [
  body('name').custom( async(name) => {
   const isDuplicate = await Contact.findOne({name})
   if(isDuplicate){
     throw new Error('Nama kontak sudah terdaftar')
   }
   return true
  }),
  
  check('email', 'email tidak valid')
  .isEmail()],
   (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     const error = errors.array()
     res.render('add-page', { error })
     
   } else {
     const inputUser = req.body
     const insertNew = new Contact(inputUser)
     insertNew.save().then()
     res.redirect('/contact') 
   }
 })

// DELETE
app.delete('/contact', async(req, res) => {
  const idContact = req.body.id
  await Contact.deleteOne({ _id: idContact })
  res.redirect('/contact')
})

// UPDATE PAGE
app.get('/contact/edit/:name', async(req, res) => {
  const idTarget = req.params.name
  const detail = await Contact.findOne({ _id: idTarget })
  res.render('update-page', {detail})
})

// UPDATE PROCESS
app.put('/contact', [
  body().custom(async(contact) => {
    const isDuplicate = await Contact.findOne({name: contact.name})
    const nameIsNotSame = contact.oldName !== contact.name
    if(nameIsNotSame && isDuplicate){ throw new Error('Nama sudah tersedia')}
    return true
  }),
  check('email', 'email tidak valid').isEmail()
  ], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const error = errors.array()
      const detail = req.body
      res.render('update-page', { error, detail })
    } else {
      try {
        const targetID = req.body._id
        await Contact.updateOne({ _id: targetID },{$set: { name: req.body.name, email: req.body.email }})
        res.redirect('/contact')
      } catch (error) {
        console.log(`ada masalah ${error}`)
      }
    }
})


//  DETAIL PAGE
app.get('/contact/:name', async(req, res) => {
  const name = req.params.name
  const detail = await Contact.findOne({name})
  res.render('detail-page', { detail })
})


// HOME PAGE
app.get('/', (req, res) => {
  res.render('index')
})  

// SERVER ---------------------------------------------
app.listen(PORT, () => {
  console.log(`aplikasi sedang berjalan di : http://localhost:${PORT}`)
})

// ----------------------------------------------------