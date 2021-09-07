const express = require('express')
const app = express()
require('./utils/mongoose-module.js')
const { Contact } = require('./model/mContact.js')
const PORT = 3000

// set view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
// ----------------

const getAllContact = async() => {
  try {
    const contacts = await Contact.find()
    readAllContactSuccess(contacts)
  } catch (error) {
    errorGetAllDataContact(`ada kesalahan di : ${error}`)
  }
}


const readAllContactSuccess = (allDataContact) => {
  app.get('/contact', (req, res) => {
    res.render('contact-page', {
      allDataContact
    })
  })
}

const errorGetAllDataContact = (erorMsg) => {
  app.get('/contact', (req, res) => {
    res.render('error-page', {
      erorMsg
    })
  })
} 


app.get('/', (req, res) => {
  res.render('index')
})  



// server ---------------------------------------------
app.listen(PORT, () => {
  console.log(`aplikasi sedang berjalan di : http://localhost:${PORT}`)
})
getAllContact()
// ----------------------------------------------------