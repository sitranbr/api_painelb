const conn = require("./../mysql");
const fs = require("fs");
const { options } = require("../app");

module.exports = {
  saveOccurrence: occurrence => {
    let values;
    if (Array.isArray(occurrence)) {
      values = occurrence.map(o => [
        o.occurrence_id,
        o.has_victim,
        o.has_witness,
        o.occurrence_type,
        o.address,
        o.perimeter,
        o.date,
        o.time,
        o.description,
        o.users_id
      ]);
    } else {
      values = [
        [
          occurrence.occurrence_id,
          occurrence.has_victim,
          occurrence.has_witness,
          occurrence.occurrence_type,
          occurrence.address,
          occurrence.perimeter,
          occurrence.date,
          occurrence.time,
          occurrence.description,
          occurrence.users_id
        ]
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO occurrence (occurrence_id, has_victim, has_witness, occurrence_type, address, perimeter, date, time, description, users_id) VALUES ?",
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

  getOccurrences: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM occurrence", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getOccurrencesListData: () => {
    return new Promise((resolve, reject) => {
      var options = `SELECT 
      CASE 
      WHEN COUNT(oc.id) = 0 
      THEN JSON_OBJECT()
      ELSE JSON_OBJECT(
          'id', oc.id,
          'occurrence_id', oc.occurrence_id, 
          'has_victim', oc.has_victim,
          'has_witness',  oc.has_witness, 
          'occurrence_type', oc.occurrence_type, 
          'address', oc.address, 
          'perimeter', oc.perimeter, 
          'date', oc.date, 
          'time', oc.time, 
          'description', oc.description, 
          'users_id', oc.users_id
      )
      END AS occurrence,
      
      CASE 
      WHEN COUNT(op.id) = 0 
      THEN JSON_ARRAY()
      ELSE CAST(CONCAT('[',
                       GROUP_CONCAT(DISTINCT 
                                    JSON_OBJECT(
                                        'id', op.id, 
                                        'name', op.name, 
                                        'photo_id', 
                                        op.photo_id, 
                                        'photo', op.photo, 
                                        'occurrence_id',op.occurrence_id
                                    )
                                   ),
                       ']'
                      ) AS JSON)
      END AS occurrence_photos,
       
      CASE 
      WHEN COUNT(ov.id) = 0 
      THEN JSON_ARRAY()
      ELSE  CAST( CONCAT('[',
                         GROUP_CONCAT(DISTINCT 
                                      JSON_OBJECT( 
                                          'id', ov.id, 
                                          'victim_id', ov.victim_id, 
                                          'name', ov.name, 
                                          'genre', ov.genre, 
                                          'document_type', ov.document_type, 
                                          'document_number', ov.document_number, 
                                          'address', ov.address, 
                                          'status_victim', ov.status_victim, 
                                          'occurrence_id', ov.occurrence_id
                                      )
                                     ),
                         ']'
                        )   AS JSON)
      END AS occurrence_victim,
      CASE 
      WHEN COUNT(ow.id) = 0
      THEN JSON_ARRAY()
      ELSE  CAST( CONCAT('[',GROUP_CONCAT(DISTINCT 
                                          JSON_OBJECT( 
                                              'id', ow.id, 
                                              'witness_id', ow.witness_id, 
                                              'name', ow.name, 
                                              'document_type', ow.document_type, 
                                              'document_number', ow.document_number, 
                                              'address', ow.address, 
                                              'occurrence_id', ow.occurrence_id
                                          )
                                         ),
                         ']'
                        ) AS JSON)
      END AS occurrence_witness, 
        
      CASE WHEN  COUNT(vc.id) = 0
      THEN JSON_ARRAY()
      ELSE CAST( CONCAT('[',GROUP_CONCAT(DISTINCT 
                                         JSON_OBJECT(
                                             'id', vc.id, 
                                             'vehicle_id', vc.vehicle_id, 
                                             'plate_vehicle', vc.plate_vehicle, 
                                             'doc_vehicle_type', vc.doc_vehicle_type, 
                                             'doc_vehicle_number', vc.doc_vehicle_number, 
                                             'vehicle_type', vc.vehicle_type, 
                                             'damage_category', vc.damage_category,
                                             'vehicle_procedure', vc.vehicle_procedure,
                                             'driver_name', vc.driver_name,
                                             'driver_document_type',  vc.driver_document_type,
                                             'driver_document_number', vc.driver_document_number,
                                             'driver_procedure',  vc.driver_procedure,
                                             'occurrence_id', vc.occurrence_id
                                         )
                                        ),
                        ']'
                       ) AS JSON)
      END AS vehicle_conductor
      
      FROM occurrence AS oc 
      LEFT JOIN occurrence_photos op ON (op.occurrence_id = oc.occurrence_id) 
      LEFT JOIN occurrence_victim ov ON (ov.occurrence_id = oc.occurrence_id) 
      LEFT JOIN occurrence_witness ow ON (ow.occurrence_id = oc.occurrence_id) 
      LEFT JOIN vehicle_conductor vc ON (vc.occurrence_id = oc.occurrence_id)
      GROUP BY oc.id ORDER BY oc.id DESC`;

      conn.query(options, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getOccurrenceById: id => {
    return new Promise((resolve, reject) => {
      var options = `SELECT 
      CASE 
      WHEN COUNT(oc.id) = 0 
      THEN JSON_OBJECT()
      ELSE JSON_OBJECT(
          'id', oc.id,
          'occurrence_id', oc.occurrence_id, 
          'has_victim', oc.has_victim,
          'has_witness',  oc.has_witness, 
          'occurrence_type', oc.occurrence_type, 
          'address', oc.address, 
          'perimeter', oc.perimeter, 
          'date', oc.date, 
          'time', oc.time, 
          'description', oc.description, 
          'users_id', oc.users_id
      )
      END AS occurrence,
      
      CASE 
      WHEN COUNT(op.id) = 0 
      THEN JSON_ARRAY()
      ELSE CAST(CONCAT('[',
                       GROUP_CONCAT(DISTINCT 
                                    JSON_OBJECT(
                                        'id', 
                                         op.id, 
                                        'name', 
                                         op.name, 
                                        'photo_id', 
                                         op.photo_id, 
                                        'photo', 
                                         op.photo, 
                                        'occurrence_id', 
                                         op.occurrence_id
                                    )
                                   ),
                       ']'
                      ) AS JSON)
      END AS occurrence_photos,
       
      CASE 
      WHEN COUNT(ov.id) = 0 
      THEN JSON_ARRAY()
      ELSE  CAST( CONCAT('[',
                         GROUP_CONCAT(DISTINCT 
                                      JSON_OBJECT( 
                                          'id', ov.id, 
                                          'victim_id', ov.victim_id, 
                                          'name', ov.name, 
                                          'genre', ov.genre, 
                                          'document_type', ov.document_type, 
                                          'document_number', ov.document_number, 
                                          'address', ov.address, 
                                          'status_victim', ov.status_victim, 
                                          'occurrence_id', ov.occurrence_id
                                      )
                                     ),
                         ']'
                        )   AS JSON)
      END AS occurrence_victim,
      CASE 
      WHEN COUNT(ow.id) = 0
      THEN JSON_ARRAY()
      ELSE  CAST( CONCAT('[',GROUP_CONCAT(DISTINCT 
                                          JSON_OBJECT( 
                                              'id', ow.id, 
                                              'witness_id', ow.witness_id, 
                                              'name', ow.name, 
                                              'document_type', ow.document_type, 
                                              'document_number', ow.document_number, 
                                              'address', ow.address, 
                                              'occurrence_id', ow.occurrence_id
                                          )
                                         ),
                         ']'
                        ) AS JSON)
      END AS occurrence_witness, 
        
      CASE WHEN  COUNT(vc.id) = 0
      THEN JSON_ARRAY()
      ELSE CAST( CONCAT('[',GROUP_CONCAT(DISTINCT 
                                         JSON_OBJECT(
                                             'id', vc.id, 
                                             'vehicle_id', vc.vehicle_id, 
                                             'plate_vehicle', vc.plate_vehicle, 
                                             'doc_vehicle_type', vc.doc_vehicle_type, 
                                             'doc_vehicle_number', vc.doc_vehicle_number, 
                                             'vehicle_type', vc.vehicle_type, 
                                             'damage_category', vc.damage_category,
                                             'vehicle_procedure', vc.vehicle_procedure,
                                             'driver_name', vc.driver_name,
                                             'driver_document_type',  vc.driver_document_type,
                                             'driver_document_number', vc.driver_document_number,
                                             'driver_procedure',  vc.driver_procedure,
                                             'occurrence_id', vc.occurrence_id
                                         )
                                        ),
                        ']'
                       ) AS JSON)
      END AS vehicle_conductor
      
      FROM occurrence AS oc 
      LEFT JOIN occurrence_photos op ON (op.occurrence_id = oc.occurrence_id) 
      LEFT JOIN occurrence_victim ov ON (ov.occurrence_id = oc.occurrence_id) 
      LEFT JOIN occurrence_witness ow ON (ow.occurrence_id = oc.occurrence_id) 
      LEFT JOIN vehicle_conductor vc ON (vc.occurrence_id = oc.occurrence_id)
      WHERE oc.occurrence_id = ? GROUP BY oc.id` ;
      

      conn.query(
        options,
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

  updateOccurrence: (occurrenceId, newOccurrence) => {
    let toBeUpdated = {};
    let allowedCollumns = [`occurrence_id`, `has_victim`, `has_witness`, `occurrence_type`, `address`, `perimeter`, `date`, `time`, `description`, `users_id`];

    allowedCollumns.forEach(columnName => {
      if (columnName in newOccurrence) {
        toBeUpdated[columnName] = newOccurrence[columnName];
      }
    });
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE occurrence SET ? WHERE occurrence_id = ?",
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

  deleteOccurrence: id => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE from occurrence WHERE occurrence_id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};

