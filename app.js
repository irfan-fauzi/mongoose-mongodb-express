const express = require('express')
const app = express()
const PORT = 3000

// start server
app.listen(PORT, () => {
  console.log(`aplikasi sedang berjalan di : http://localhost:${PORT}`)
})