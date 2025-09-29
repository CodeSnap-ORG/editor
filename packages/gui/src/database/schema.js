const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://root:mysecretpassword@localhost:5432/local";

const pool = new Pool({
  connectionString,
});

  // Helper for running queries
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = {
  pool,
  query,
};
