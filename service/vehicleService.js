const conn = require("./../mysql");

module.exports = {
  saveVehicles: vehicle => {
    let values;
    if (Array.isArray(vehicle)) {
      values = vehicle.map(v => [
        v.vehicle_id,
        v.plate_vehicle,
        v.doc_vehicle_type,
        v.doc_vehicle_number,
        v.vehicle_type,
        v.damage_category,
        v.vehicle_procedure,
        v.driver_name,
        v.driver_document_type,
        v.driver_document_number,
        v.driver_procedure,
        v.occurrence_id
      ]);
    } else {
      values = [
        [
          vehicle.vehicle_id,
          vehicle.plate_vehicle,
          vehicle.doc_vehicle_type,
          vehicle.doc_vehicle_number,
          vehicle.vehicle_type,
          vehicle.damage_category,
          vehicle.vehicle_procedure,
          vehicle.driver_name,
          vehicle.driver_document_type,
          vehicle.driver_document_number,
          vehicle.driver_procedure,
          vehicle.occurrence_id
        ]
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO vehicle_conductor (vehicle_id, plate_vehicle, doc_vehicle_type, doc_vehicle_number, vehicle_type, damage_category, vehicle_procedure, driver_name, driver_document_type, driver_document_number, driver_procedure, occurrence_id) VALUES ?",
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

  getVehicles: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM vehicle_conductor", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getVehicleById: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM vehicle_conductor WHERE id = ?",
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

  getVehicleByOccurrenceId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM vehicle_conductor WHERE occurrence_id = ?",
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

  updateVehicle: (id, newVehicle) => {
    let toBeUpdated = {};
    let allowedCollumns = [
      "vehicle_id",
      "plate_vehicle",
      "doc_vehicle_type",
      "doc_vehicle_number",
      "vehicle_type",
      "damage_category",
      "vehicle_procedure",
      "driver_name",
      "driver_document_type",
      "driver_document_number",
      "driver_procedure",
      "occurrence_id"
    ];

    allowedCollumns.forEach(columnName => {
      if (newVehicle[columnName]) {
        toBeUpdated[columnName] = newVehicle[columnName];
      }
    });

    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE vehicle_conductor SET ? WHERE id = ?",
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

  deleteVehicle: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from vehicle_conductor WHERE id = ?",
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

  deleteVehicleByOccurenceId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from vehicle_conductor WHERE occurrence_id = ?",
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
