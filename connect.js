var express = require('express');

const sql = require('mssql');
const conn = require('connect');
// Cấu hình kết nối đến SQL Server
const config = {
  user: 'sa',
  password: '123',
  server: 'localhost',
  database: 'testConflict',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
  driver: 'SQL Server'
};

const connn = new sql.ConnectionPool(config).connect().then(pool => {
  return pool;
});


module.exports = {
  conn: connn,
  sql: sql
}