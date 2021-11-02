const conn = require("./../mysql");
var md5 = require("md5");

module.exports = {
  saveUsers: (user) => {
    let values;
    if (Array.isArray(user)) {
      values = user.map((u) => [
        u.users_id,
        u.email,
        md5(u.password),
        u.registration,
        u.name,
        u.my_team, 
        u.service_team,
        u.sector,
      ]);
    } else {
      values = [
        [
          user.users_id,
          user.email,
          md5(user.password),
          user.registration,
          user.name,
          user.my_team, 
          user.service_team,
          user.sector,
        ],
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO users (users_id, email, password, registration, name, my_team, service_team, sector, service_id) VALUES ?",
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

  getUsers: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM users", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM users WHERE users_id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  updateUser: (id, newUser) => {
    let toBeUpdated = {};
    let allowedCollumns = ["users_id", "email", "password", "registration", "name", "my_team", "service_team", "sector", "service_id"];
    allowedCollumns.forEach((columnName) => {
      if (newUser[columnName]) {
        toBeUpdated[columnName] = newUser[columnName];
      }
    });

    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE users SET ? WHERE users_id = ?",
        [toBeUpdated, id],
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

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE from users WHERE users_id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};
