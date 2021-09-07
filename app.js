const express = require('express')
const { body, validationResult, check } = require('express-validator')
const app = express()
require('./utils/mongoose-module.js')
const { Contact } = require('./model/mContact.js')
const PORT = 3000

// set view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
// ----------------


app.get('/contact', async(req, res) => {
  const allDataContact = await Contact.find()
  res.render('contact-page', {
    allDataContact
  })
})

app.get('/contact/add', (req,res) => {
  res.render('add-page')
})

app.post('/contact', [
  body('name').custom(async(name) => {
    const allDataContact = await Contact.find()
    const isDuplicate = allDataContact.find(contact => contact.name === name)
    if(isDuplicate){
      throw new Error('Nama kontak sudah terdaftar')
    }
  }),
  check('email', 'masukan email tidak valid').isEmail
  ], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const error = errors.array()
      res.render('add-page', { error })
    } else {
      console.log('ok masuk')
    }
})

app.get('/contact/:name', async(req, res) => {
  const name = req.params.name
  const detail = await Contact.findOne({name})
  res.render('detail-page', { detail })
})

app.get('/', (req, res) => {
  res.render('index')
})  

// server ---------------------------------------------
app.listen(PORT, () => {
  console.log(`aplikasi sedang berjalan di : http://localhost:${PORT}`)
})

// ----------------------------------------------------