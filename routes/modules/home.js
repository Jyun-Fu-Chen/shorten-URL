const express = require('express')
const PORT = process.env.PORT || 3000
const router = express.Router()

const generateShortUrl = require('../../generateShortUrl')
const URL = require('../../models/shortUrl')


router.get('/', (req, res) => {
  res.render('home')
})

router.get('/shortUrl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  const onLine = PORT === 3000
  res.render('shortUrl', { shortUrl, onLine, PORT })
})

router.post('/', (req, res) => {
  const originalUrl = req.body.url
  let shortUrl = generateShortUrl()
  URL.find()
    .then(urls => {
      if (urls.includes(shortUrl)) {
        shortUrl = generateShortUrl()
      } else {
        URL.create({
          originalUrl: originalUrl,
          shortUrl: shortUrl
        })
      }
    })
    .then(() => res.redirect(`/shortUrl/${shortUrl}`))
    .catch(err => res.render('errPage', { err: err.message }))
})
router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  URL.findOne({ shortUrl: shortUrl })
    .then(url => res.redirect(url.originalUrl))
    .catch(err => res.render('errPage', { err: err.message }))
})

module.exports = router