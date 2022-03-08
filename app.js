const PORT = 3000
const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const generateShortUrl = require('./generateShortUrl')
const bodyParser = require('body-parser')
const URL = require('./models/shortUrl')
const mongoose = require('mongoose')
const { redirect } = require('statuses')
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
  const originalUrl = req.body.url
  URL.find()
    .then(urls => {
      let shortUrl = generateShortUrl()
      if (urls.includes(shortUrl)) {
        shortUrl = generateShortUrl()
      } else {
        URL.create({
          originalUrl: originalUrl,
          shortUrl: shortUrl
        })
      }
    })
    .then(()=>res.redirect('/'))
    .catch(err => console.log(err))
})



app.listen(PORT, () => {
  console.log(`localhost:${PORT} is running`)
})