const URL = require('../shortUrl')
const db = require('../../config/mongoose')
const seederData = [
  { originalUrl: `https://www.google.com/`, shortUrl: `ijK39` },
  { originalUrl: `https://www.facebook.com/`, shortUrl: `eh739` },
  { originalUrl: `https://www.yahoo.com/`, shortUrl: `d3u6c` },
  { originalUrl: `https://developer.mozilla.org/en-US/`, shortUrl: `1js4n` },
  { originalUrl: `https://mongoosejs.com/`, shortUrl: `8am30` }
]
db.once('open', () => {
  console.log('mongodb connected!!')
  URL.insertMany(seederData, function (err, docs) {
    if (err) {
      return console.error(err);
    }
  });
  console.log("Multiple documents inserted to Collection")
})