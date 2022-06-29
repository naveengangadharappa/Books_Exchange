//const mysql = require('mysql');
// let mysqlconnection = mysql.createConnection({
//     host: process.env.MYSQL_HOST || 'localhost',
//     port:3306,
//     user: process.env.MYSQL_USERNAME || 'root',
//     password: process.env.MYSQL_PASSWORD || '',
//     database: process.env.MYSQL_DBNAME || 'naveenbooks'
// });

// mysqlconnection.connect((err) => {
//     if (!err) console.log(`MysqlDb ${process.env.MYSQL_DBNAME} connection successfull`);
//     else console.log(" sorry Db connection un-successfull" + JSON.stringify(err));
// });

const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// const mysqlconnection = mysql.createConnection({
//     host: process.env.MYSQL_HOST || 'localhost',
//     port:3306,
//     user: process.env.MYSQL_USERNAME || 'root',
//     password: process.env.MYSQL_PASSWORD || '1BI16cs413',
//     database: process.env.MYSQL_DBNAME || 'naveenbooks'
//   });

const mysqlpool = mysql.createPool({
    host:process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USERNAME,
    database: process.env.MYSQL_DBNAME,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

module.exports = mysqlpool;//mysqlconnection;
