const mongoose = require('mongoose')
const uriLocal = 'mongodb://127.0.0.1:27017/contactApp'

mongoose.connect(uriLocal)

// CREATE SCHEMA
// mongoose.model(Collection of dbs, type data)
// jika COllection belum ada, otomatis akan dibuat dengan versi jamak(s)
const Contact = mongoose.model('Contact', {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

const myContact = new Contact({
  name : 'scorpion',
  email: 'scorpion@yahoo.com'
})


module.exports = {myContact}
