const express = require('express')
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

app.get('/contact/:name', async(req, res) => {
  const name = req.params.name
  const allDataContact = await Contact.find()
  const select = allDataContact.filter(el => {
    return el.name === name
  })
  const detail = select[0]
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