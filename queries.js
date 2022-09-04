const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Lemontree1@localhost:5432/local_characters',
  ssl: process.env.DATABASE_URL ? true : false
})

const getCharacterById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM characters WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }