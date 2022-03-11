const express = require('express')
const app = express()
const PORT = 3000
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')

const URL = require('./models/shortUrl')
const routes = require('./routes')
require('./config/mongoose')

app.engine('.hbs', exhbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`localhost:${PORT} is running`)
})