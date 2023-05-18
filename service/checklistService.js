const conn = require("./../mysql");

module.exports = {
  saveChecklist: (check) => {
    let values;
    if (Array.isArray(check)) {
      values = check.map((c) => [
        c.checklist_id,
        c.driver,
        c.team_service,
        c.plate,
        c.prisma,
        c.check_date,
        c.departure_time,
        c.return_time,
        c.km_departure,
        c.km_return,
        c.output_fuel_quantity,
        c.return_fuel_quantity,
        c.carpet,
        c.tire_iron,
        c.triangue,
        c.monkey,
        c.front_lighting_system,
        c.back_lighting_system,
        c.sirene,
        c.flashing,
        c.supply_card,
        c.crlv,
        c.glacier,
        c.etilometer,
        c.pneus,
        c.stereo,
        c.cones,
        c.cones_quantities,
        c.super_cones,
        c.super_cones_quantities,
        c.new_jersey,
        c.new_jersey_quantities,
        c.handle,
        c.handle_quantities,
        c.observations,
        c.users_id,
      ]);
    } else {
      values = [
        [
          check.checklist_id,
          check.driver,
          check.team_service,
          check.plate,
          check.prisma,
          check.check_date,
          check.departure_time,
          check.return_time,
          check.km_departure,
          check.km_return,
          check.output_fuel_quantity,
          check.return_fuel_quantity,
          check.carpet,
          check.tire_iron,
          check.triangue,
          check.monkey,
          check.front_lighting_system,
          check.back_lighting_system,
          check.sirene,
          check.flashing,
          check.supply_card,
          check.crlv,
          check.glacier,
          check.etilometer,
          check.pneus,
          check.stereo,
          check.cones,
          check.cones_quantities,
          check.super_cones,
          check.super_cones_quantities,
          check.new_jersey,
          check.new_jersey_quantities,
          check.handle,
          check.handle_quantities,
          check.observations,
          check.users_id,
        ],
      ];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO checklist (checklist_id, driver, team_service, plate, prisma, check_date, departure_time, return_time, km_departure, km_return, output_fuel_quantity, return_fuel_quantity, carpet, tire_iron, triangue, monkey, front_lighting_system, back_lighting_system, sirene, flashing, supply_card, crlv, glacier, etilometer, pneus, stereo, cones, cones_quantities, super_cones, super_cones_quantities, new_jersey, new_jersey_quantities, handle, handle_quantities, observations, users_id) VALUES ?",
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

  getChecklist: () => {
    return new Promise((resolve, reject) => {
      var options = `SELECT 
      CASE 
      WHEN COUNT(cl.id) = 0 
      THEN JSON_OBJECT()
      ELSE JSON_OBJECT(
          'id', cl.id,
          'checklist_id', cl.checklist_id,
          'driver',  cl.driver ,
          'team_service',  cl.team_service ,
          'plate', cl.plate ,
          'prisma',  cl.prisma ,
          'check_date',  cl.check_date ,
          'departure_time',  cl.departure_time ,
          'return_time',  cl.return_time ,
          'km_departure',  cl.km_departure ,
          'km_return', cl.km_return ,
          'output_fuel_quantity', cl.output_fuel_quantity ,
          'return_fuel_quantity',  cl.return_fuel_quantity ,
          'carpet', cl.carpet ,
          'tire_iron',  cl.tire_iron ,
          'triangue',   cl.triangue ,
          'monkey',  cl.monkey ,
          'front_lighting_system',  cl.front_lighting_system ,
          'back_lighting_system',  cl.back_lighting_system ,
          'sirene',  cl.sirene ,
          'flashing',  cl.flashing ,
          'supply_card', cl.supply_card,
          'crlv',  cl.crlv ,
          'glacier',  cl.glacier ,
          'etilometer',  cl.etilometer ,
          'pneus',  cl.pneus ,
          'stereo',  cl.stereo ,
          'cones',  cl.cones ,
          'cones_quantities',  cl.cones_quantities ,
          'super_cones',  cl.super_cones ,
          'super_cones_quantities',  cl.super_cones_quantities ,
          'new_jersey',  cl.new_jersey ,
          'new_jersey_quantities',  cl.new_jersey_quantities ,
          'handle',  cl.handle ,
          'handle_quantities',  cl.handle_quantities,
          'observations',  cl.observations,
          'users_id', cl.users_id
      )
      END AS checklist,
    
      CASE 
      WHEN COUNT(cp.id) = 0 
      THEN JSON_ARRAY()
      ELSE CAST(CONCAT('[',
                       GROUP_CONCAT(DISTINCT 
                                    JSON_OBJECT(
                                        'id', cp.id, 
                                        'name', cp.name, 
                                        'photo_id', cp.photo_id, 
                                        'photo', cp.photo, 
                                        'checklist_id',cp.checklist_id
                                    )
                                   ),
                       ']'
                      ) AS JSON)
      END AS checklist_photos
      
      FROM checklist AS cl 
      LEFT JOIN checklist_photos cp ON (cp.checklist_id = cl.checklist_id)
      GROUP BY cl.id 
      ORDER BY cl.id DESC`;

      conn.query(options, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getChecklistById: (id) => {
    return new Promise((resolve, reject) => {
      var options = `SELECT 
      CASE 
      WHEN COUNT(cl.id) = 0 
      THEN JSON_OBJECT()
      ELSE JSON_OBJECT(
          'id', cl.id,
          'checklist_id', cl.checklist_id,
          'driver',  cl.driver ,
          'team_service',  cl.team_service ,
          'plate', cl.plate ,
          'prisma',  cl.prisma ,
          'check_date',  cl.check_date ,
          'departure_time',  cl.departure_time ,
          'return_time',  cl.return_time ,
          'km_departure',  cl.km_departure ,
          'km_return', cl.km_return ,
          'output_fuel_quantity', cl.output_fuel_quantity ,
          'return_fuel_quantity',  cl.return_fuel_quantity ,
          'carpet', cl.carpet ,
          'tire_iron',  cl.tire_iron ,
          'triangue',   cl.triangue ,
          'monkey',  cl.monkey ,
          'front_lighting_system',  cl.front_lighting_system ,
          'back_lighting_system',  cl.back_lighting_system ,
          'sirene',  cl.sirene ,
          'flashing',  cl.flashing ,
          'supply_card', cl.supply_card,
          'crlv',  cl.crlv ,
          'glacier',  cl.glacier ,
          'etilometer',  cl.etilometer ,
          'pneus',  cl.pneus ,
          'stereo',  cl.stereo ,
          'cones',  cl.cones ,
          'cones_quantities',  cl.cones_quantities ,
          'super_cones',  cl.super_cones ,
          'super_cones_quantities',  cl.super_cones_quantities ,
          'new_jersey',  cl.new_jersey ,
          'new_jersey_quantities',  cl.new_jersey_quantities ,
          'handle',  cl.handle ,
          'handle_quantities',  cl.handle_quantities,
          'observations',  cl.observations,
          'users_id', cl.users_id
      )
      END AS checklist,
    
      CASE 
      WHEN COUNT(cp.id) = 0 
      THEN JSON_ARRAY()
      ELSE CAST(CONCAT('[',
                       GROUP_CONCAT(DISTINCT 
                                    JSON_OBJECT(
                                        'id', cp.id, 
                                        'name', cp.name, 
                                        'photo_id', cp.photo_id, 
                                        'photo', cp.photo, 
                                        'checklist_id',cp.checklist_id
                                    )
                                   ),
                       ']'
                      ) AS JSON)
      END AS checklist_photos
      
      FROM checklist AS cl 
      LEFT JOIN checklist_photos cp ON (cp.checklist_id = cl.checklist_id)
      WHERE cl.checklist_id = ? 
      GROUP BY cl.id 
      ORDER BY cl.id DESC`;

      conn.query(options, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getChecklistByUserId: (users_id) => {
    return new Promise((resolve, reject) => {
      var options = `SELECT 
      CASE 
      WHEN COUNT(cl.id) = 0 
      THEN JSON_OBJECT()
      ELSE JSON_OBJECT(
          'id', cl.id,
          'checklist_id', cl.checklist_id,
          'driver',  cl.driver ,
          'team_service',  cl.team_service ,
          'plate', cl.plate ,
          'prisma',  cl.prisma ,
          'check_date',  cl.check_date ,
          'departure_time',  cl.departure_time ,
          'return_time',  cl.return_time ,
          'km_departure',  cl.km_departure ,
          'km_return', cl.km_return ,
          'output_fuel_quantity', cl.output_fuel_quantity ,
          'return_fuel_quantity',  cl.return_fuel_quantity ,
          'carpet', cl.carpet ,
          'tire_iron',  cl.tire_iron ,
          'triangue',   cl.triangue ,
          'monkey',  cl.monkey ,
          'front_lighting_system',  cl.front_lighting_system ,
          'back_lighting_system',  cl.back_lighting_system ,
          'sirene',  cl.sirene ,
          'flashing',  cl.flashing ,
          'supply_card', cl.supply_card,
          'crlv',  cl.crlv ,
          'glacier',  cl.glacier ,
          'etilometer',  cl.etilometer ,
          'pneus',  cl.pneus ,
          'stereo',  cl.stereo ,
          'cones',  cl.cones ,
          'cones_quantities',  cl.cones_quantities ,
          'super_cones',  cl.super_cones ,
          'super_cones_quantities',  cl.super_cones_quantities ,
          'new_jersey',  cl.new_jersey ,
          'new_jersey_quantities',  cl.new_jersey_quantities ,
          'handle',  cl.handle ,
          'handle_quantities',  cl.handle_quantities,
          'observations',  cl.observations,
          'users_id', cl.users_id
      )
      END AS checklist,
    
      CASE 
      WHEN COUNT(cp.id) = 0 
      THEN JSON_ARRAY()
      ELSE CAST(CONCAT('[',
                       GROUP_CONCAT(DISTINCT 
                                    JSON_OBJECT(
                                        'id', cp.id, 
                                        'name', cp.name, 
                                        'photo_id', cp.photo_id, 
                                        'photo', cp.photo, 
                                        'checklist_id',cp.checklist_id
                                    )
                                   ),
                       ']'
                      ) AS JSON)
      END AS checklist_photos
      
      FROM checklist AS cl 
      LEFT JOIN checklist_photos cp ON (cp.checklist_id = cl.checklist_id)
      WHERE cl.users_id = ? 
      GROUP BY cl.id 
      ORDER BY cl.id DESC`;

      conn.query(options, [users_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  updateChecklist: async (id, newChecklist) => {
    let toBeUpdated = {};
    let allowedCollumns = [
      `checklist_id`,
      `driver`,
      `team_service`,
      `plate`,
      `prisma`,
      `check_date`,
      `departure_time`,
      `return_time`,
      `km_departure`,
      `km_return`,
      `output_fuel_quantity`,
      `return_fuel_quantity`,
      `carpet`,
      `tire_iron`,
      `triangue`,
      `monkey`,
      `front_lighting_system`,
      `back_lighting_system`,
      `sirene`,
      `flashing`,
      `supply_card`,
      `crlv`,
      `glacier`,
      `etilometer`,
      `pneus`,
      `stereo`,
      `cones`,
      `cones_quantities`,
      `super_cones`,
      `super_cones_quantities`,
      `new_jersey`,
      `new_jersey_quantities`,
      `handle`,
      `handle_quantities`,
      `observations`,
      `users_id`,
    ];
    allowedCollumns.forEach((columnName) => {
      if (columnName in newChecklist) {
        toBeUpdated[columnName] = newChecklist[columnName];
      }
    });
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE checklist SET ? WHERE checklist_id = ?",
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

  deleteChecklist: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from checklist WHERE checklist_id = ?",
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
};
