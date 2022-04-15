require('dotenv').config();
const { Pool } = require('pg');

const PG_URI = `postgres://${process.env.POSTGRESQL_USER}:${process.env.POSTGRESQL_PASSWORD}@heffalump.db.elephantsql.com/${process.env.POSTGRESQL_USER}`;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
