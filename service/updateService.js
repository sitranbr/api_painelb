const conn = require("../mysql");

// witness

module.exports = {
  saveType: type => {
    let values;
    if (Array.isArray(type)) {
      values = type.map(w => [
        w.id,
        w.status
      ]);
    } else {
      values = [
        [
          type.id,
          type.status
        ]
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO tb_update (id, status) VALUES ?",
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

  getType: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM tb_update", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getTypeById: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT currentversion FROM tb_update WHERE currentversion = ?",
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.length === 1) {
              //result[0] = { ...result[0], update: false}; 
              resolve({update: false});
            }else{
              resolve({update: true});
            }
          }
        }
      );
    });
  },

  updateApp: (id, newType) => {
    let toBeUpdated = {};
    let allowedCollumns = [
      "id",
      "currentversion"
    ];
    allowedCollumns.forEach(columnName => {
      if (newType[columnName]) {
        toBeUpdated[columnName] = newType[columnName];
      }
    });

    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE tb_update SET ? WHERE id = ?",
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

};
