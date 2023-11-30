const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "2003",
  host: "localhost",
  port: 5000,
  database: "perntodo"
});

module.exports = pool;
