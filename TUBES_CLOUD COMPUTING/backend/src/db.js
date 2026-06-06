const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '192.168.56.10',
  user: 'admin',
  password: 'admin123',
  database: 'grades_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
