const conn = require("../mysql");

// victim

module.exports = {
  saveVictims: victims => {
    let values;
    if (Array.isArray(victims)) {
      values = victims.map(v => [
        v.victim_id,
        v.name,
        v.genre,
        v.document_type,
        v.document_number,
        v.address,
        v.status_victim,
        v.occurrence_id
      ]);
    } else {
      values = [
        [
          victims.victim_id,
          victims.name,
          victims.genre,
          victims.document_type,
          victims.document_number,
          victims.address,
          victims.status_victim,
          victims.occurrence_id
        ]
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO occurrence_victim ( victim_id, name, genre, document_type, document_number, address, status_victim, occurrence_id) VALUES ?",
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

  getVictims: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM occurrence_victim", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getVictimById: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM occurrence_victim WHERE id = ?",
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

  getVictimByOccurrenceId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM occurrence_victim WHERE occurrence_id = ?",
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

  updateVictim: (occurrenceId, newVictim) => {
    let toBeUpdated = {};
    let allowedCollumns = [
      "victim_id",
      "name",
      "genre",
      "document_type",
      "document_number",
      "address",
      "victim_status",
      "occurrence_id"
    ];
    allowedCollumns.forEach(columnName => {
      if (newVictim[columnName]) {
        toBeUpdated[columnName] = newVictim[columnName];
      }
    });

    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE occurrence_victim SET ? WHERE occurrence_id = ?",
        [toBeUpdated, occurrenceId],
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

  deleteVictim: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from occurrence_victim WHERE id = ?",
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

  deleteVictimByOccurrenceId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from occurrence_victim WHERE occurrence_id = ?",
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
