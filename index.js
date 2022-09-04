const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const db = require('./queries')



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', db.getCharacters)
  .get('/characters/:id', db.getCharacterById)
  .post('/characters/:id', db.updateCharacter)
  .post('/characters', db.createCharacter)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
