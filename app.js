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
    const res = await Contact.find()
    readAllContact(res)
  } catch (error) {
    console.log(`ada kesalahan : ${error}`)
  }
}


const readAllContact = (allDataContact) => {
  app.get('/contact', (req, res) => {
    res.render('contact-page', {
      allDataContact
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