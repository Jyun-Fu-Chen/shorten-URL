const express = require('express')
const PORT = process.env.PORT || 3000
const router = express.Router()

const generateShortUrl = require('../../generateShortUrl')
const URL = require('../../models/shortUrl')


router.get('/', (req, res) => {
  res.render('home')
})

router.get('/shortUrl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl.trim()
  const onLine = PORT === 3000
  res.render('shortUrl', { shortUrl, onLine, PORT})
})

router.post('/', (req, res) => {
  const originalUrl = req.body.url
  let shortUrl = generateShortUrl().trim()
  URL.find()
    .then(urls => {
      if (urls.includes(shortUrl)) {
        shortUrl = generateShortUrl().trim()
      } else {
        URL.create({
          originalUrl: originalUrl,
          shortUrl: shortUrl
        })
      }
    })
    .then(() => res.redirect(`/shortUrl/${shortUrl}`))
    .catch(err => console.log(err))
})
router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  URL.findOne({ shortUrl: shortUrl })
    .then(url => res.redirect(url.originalUrl))
    .catch(err => console.log(err))
})

module.exports = router