const PORT = 3000
const express = require('express')
const app = express()
const exhbs = require('express-handlebars')


app.engine('.hbs', exhbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')


app.get('/', (req, res) => {
  res.render('home')

})

app.listen(PORT, () => {
  console.log(`localhost:${PORT} is running`)
})