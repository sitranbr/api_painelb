const conn = require("../mysql");

// witness

module.exports = {
  saveWitness: witness => {
    let values;
    if (Array.isArray(witness)) {
      values = witness.map(w => [
        w.witness_id,
        w.name,
        w.document_type,
        w.document_number,
        w.address,
        w.occurrence_id
      ]);
    } else {
      values = [
        [
          witness.witness_id,
          witness.name,
          witness.document_type,
          witness.document_number,
          witness.address,
          witness.occurrence_id
        ]
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO occurrence_witness ( witness_id, name, document_type, document_number, address, occurrence_id) VALUES ?",
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

  getWitness: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM occurrence_witness", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getWitnessById: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM occurrence_witness WHERE id = ?",
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

  getWitnessByOccurrenceId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM occurrence_witness WHERE occurrence_id = ?",
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

  updateWitness: (id, newWitness) => {
    let toBeUpdated = {};
    let allowedCollumns = [
      "witness_id",
      "name",
      "document_type",
      "document_number",
      "address",
      "occurrence_id"
    ];
    allowedCollumns.forEach(columnName => {
      if (newWitness[columnName]) {
        toBeUpdated[columnName] = newWitness[columnName];
      }
    });

    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE occurrence_witness SET ? WHERE id = ?",
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
        "DELETE from occurrence_witness WHERE id = ?",
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

  
  deleteWitnessByOccurenceId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from occurrence_witness WHERE occurrence_id = ?",
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
