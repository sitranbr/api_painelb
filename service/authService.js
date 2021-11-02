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
        u.registration,
        md5(u.password),
        u.name,
        u.cpf,
        u.fixed_team,
        u.variable_team,
        u.sector
      ]);
    } else {
      values = [
        [
          user.users_id,
          user.registration,
          md5(user.password),
          user.name,
          user.cpf,
          user.fixed_team,
          user.variable_team,
          user.sector
        ]
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO users (users_id, email, password, name, cpf, my_team, service_team, sector) VALUES ?",
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
