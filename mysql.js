const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "apibasebr",
  password: '',

  typeCast: function (field, next) {
    if (field.type === 'TINY' && field.length === 1) {
      return (field.string() === '1'); // 1 = true, 0 = false
    } else if (field.type == 'JSON') {
      return (JSON.parse(field.string())); 
    }
    else {
      return next();
    }
  },
  multipleStatements:true
}); 

/*
 const connection = mysql.createConnection({
   host: "localhost",
   user: "sac50",
   database: "apibasebr",
   password: '@#Stasera10',
   typeCast: function (field, next) {
     if (field.type === 'TINY' && field.length === 1) {
       return (field.string() === '1'); // 1 = true, 0 = false
    } else {
       return next();
     }
  },
  multipleStatements:true
 });
 */

module.exports = connection;
