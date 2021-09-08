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
  const contacts = await Contact.findOne({ _id: idContact })
  if(!contacts){ res.status(404).send('<h1>error</h1>')}
  await Contact.deleteOne({ _id: contacts._id })
  res.redirect('/contact')
  
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