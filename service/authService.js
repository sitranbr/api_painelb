const conn = require("./../mysql");
var md5 = require("md5");

// {
//   users_id: 1618929787682,
//   registration: 'rimon.rsa@gmail.com',
//   password: '123456',
//   name: 'Salauddin Gazi',
//   cpf: 'ok',
//   fixed_team: 'ok',
//   variable_team: 'ok',
//   sector: 'ok'
// }

module.exports = {
  register: (user) => {
    let values;
    if (Array.isArray(user)) {
      values = user.map((u) => [
        u.users_id,
        u.email,
        md5(u.password),
        u.registration,
        u.name,
        u.fixed_team,
        u.variable_team,
        u.level,
        u.sector
      ]);
    } else {
      values = [
        [
          user.users_id,
          user.email,
          md5(user.password),
          user.registration,
          user.name,
          user.fixed_team,
          user.variable_team,
          user.level,
          user.sector
        ]
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO users (users_id, email, password, registration, name, fixed_team, variable_team, level, sector) VALUES ?",
        [values],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  login: (credential) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [credential.email, md5(credential.password)],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  dologin: (email, password) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, md5(password)],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

};
