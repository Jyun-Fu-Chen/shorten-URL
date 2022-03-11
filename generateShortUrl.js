const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCase = upperCase.toLocaleLowerCase()
const number = "1234567890"
const generateWords = upperCase + lowerCase + number
const generateArr = generateWords.split('')


const generateShortUrl = function () {
  let code = ""
  
  const randomNumber = generateArr.length

  for (let i = 0; i < 5; i++) {
    code += generateArr[Math.floor(Math.random() * randomNumber)]
  }
  return code
}

module.exports = generateShortUrl