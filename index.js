const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const db = require('./queries')
const bodyparser = require('body-parser')
const cors = require('cors')


express()
  .use(cors())
  .use(bodyparser.json())
  .use(bodyparser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', db.getCharacters)
  .get('/characters/:id', db.getCharacterById)
  .post('/characters/:id', db.updateCharacter)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
