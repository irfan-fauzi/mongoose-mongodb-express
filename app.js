/* eslint-disable linebreak-style */
// eslint-disable-next-line no-undef
const express = require('express')
const app = express()
const PORT = 3000
// set view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// ----------------
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`aplikasi sedang berjalan di : http://localhost:${PORT}`)
})
