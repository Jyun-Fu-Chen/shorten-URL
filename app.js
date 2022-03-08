const PORT = 3000
const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const URL = require('./models/shortUrl')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!!')
})
db.once('open', () => {
  console.log('mongodb connected!!')
})

app.engine('.hbs', exhbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('home')
})

app.post('/', (req, res) => {

  console.log(req.body.url)
})


app.listen(PORT, () => {
  console.log(`localhost:${PORT} is running`)
})