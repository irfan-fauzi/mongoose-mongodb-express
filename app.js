const express = require('express')
const app = express()
const { myContact } = require('./utils/mongoose-module.js')
const PORT = 3000

// set view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
// ----------------

myContact.save().then(res => console.log(res)).catch(err => console.log(err))

// Home page  ----------------------
app.get('/', (req, res) => {
  res.render('index')
})
// end Home page

//  Contact page
app.get('/contact', (req, res) => {
  res.render('contact-page')
})  
// end Contact page ----------------




app.listen(PORT, () => {
  console.log(`aplikasi sedang berjalan di : http://localhost:${PORT}`)
})
