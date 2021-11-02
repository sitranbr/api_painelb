const conn = require("../mysql");

// witness

module.exports = {
  saveType: type => {
    let values;
    if (Array.isArray(type)) {
      values = type.map(w => [
        w.id,
        w.name
      ]);
    } else {
      values = [
        [
          type.id,
          type.name
        ]
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO occurrence_type ( id, name) VALUES ?",
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
      conn.query("SELECT * FROM occurrence_type", (err, result) => {
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
        "SELECT * FROM occurrence_type WHERE id = ?",
        [id],
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

  updateWitness: (id, newType) => {
    let toBeUpdated = {};
    let allowedCollumns = [
      "id",
      "name"
    ];
    allowedCollumns.forEach(columnName => {
      if (newType[columnName]) {
        toBeUpdated[columnName] = newType[columnName];
      }
    });

    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE occurrence_type SET ? WHERE id = ?",
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

  deleteWitness: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from occurrence_type WHERE id = ?",
        [id],
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
