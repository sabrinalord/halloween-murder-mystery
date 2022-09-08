const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


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
    const player = request.body.player

   
    pool.query(
      'UPDATE characters SET player = $2 WHERE id = $1',
      [id, player],
      (error, results) => {

        if (error) {
          return response.status(500).send({error: "Problem with updating the record"})
        };
        getCharacters(request, response)
      }
    )
  }

  const createCharacter = (request, response) => {
    const body = request.body
    const character = body.character
    const player = body.player
    const imageurl = body.imageurl
    const description = body.description
    console.log(character, player, imageurl, description)
  
    pool.query('INSERT INTO characters (character, player, imageurl, description) VALUES ($1, $2, $3, $4)', [character, player, imageurl, description], (error, results) => {
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