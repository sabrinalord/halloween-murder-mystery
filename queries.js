const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Lemontree1@localhost:5432/local_characters',
  ssl: process.env.DATABASE_URL ? true : false
})

const getCharacters = async ( request, response ) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM characters');
      const results = { 'results': (result) ? result.rows : null};
      response.render('pages/index', results );
      client.release();
    } catch (err) {
      console.error(err);
      response.send("Error " + err);
    }
}

const getCharacterById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM characters WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const updateCharacter = (request, response) => {
    const id = parseInt(request.params.id)
    const { character, player } = request.body
    console.log(character)
    console.log(player)
    console.log(id)
  
    pool.query(
      'UPDATE characters SET player = $2 WHERE character = $1',
      [character, player],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`character ${id} modified with player: ${player}`)
      }
    )
  }

  const createCharacter = (request, response) => {
    const { character, player } = request.body
  
    pool.query('INSERT INTO characters (character, player) VALUES ($1, $2)', [character, player], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`character added with ID: ${results.insertId}`)
    })
  }

  module.exports = {
    getCharacters,
    getCharacterById,
    updateCharacter,
    createCharacter
  }