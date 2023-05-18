const conn = require("../mysql");
const fs = require("fs");
const validUrl = require('valid-url');

module.exports = {
  saveCheckListPhotos: (photos, mainPath)  => {
    let values;
    if (Array.isArray(photos)) {
      values = photos.map(p => {
        var uri = p.name
        if (!validUrl.isUri(p.name)) {
          uri = mainPath + "" + p.name
        }
        return [p.name, p.photo_id, uri, p.checklist_id];
      })

    } else {
      var uri = photos.name
      if (!validUrl.isUri(photos.name)) {
        uri = mainPath + "" + photos.name
      }
      values = [[photos.name, photos.photo_id, uri, photos.checklist_id]];
    }

    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO checklist_photos (name, photo_id, photo, checklist_id) VALUES ?",
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

  getPhotos: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM checklist_photos", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getPhotoById: async  id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM checklist_photos WHERE checklist_id = ?",
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

  updatePhoto: async  (id, newPhoto) => {
    let toBeUpdated = {};
    let allowedCollumns = ["photo_id", "photo", "checklist_id"];
    allowedCollumns.forEach(columnName => {
      if (newPhoto[columnName]) {
        toBeUpdated[columnName] = newPhoto[columnName];
      }
    });

    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE checklist_photos SET ? WHERE id = ?",
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

  deletePhoto: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from checklist_photos WHERE id = ?",
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

  deletePhotoByChecklistId: async id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE from checklist_photos WHERE checklist_id = ?",
        [id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  deleteItem: oldData => {
    if(oldData !== null) {
      oldData.forEach((item) => {
        var filePath = "./upload/" + item.photo_id + "_" + item.checklist_id + "_" + item.photo; 
        try {
          fs.unlinkSync(filePath);
        } catch(err) {
          console.error(err);
        }
      });
    }
  },

  convertToBase64: oldData => {
    oldData.forEach((item) => {

      oldData[item] = "name";
      item.name = item.photo;
      
      var filePath = "./upload/" + item.photo_id + "_" + item.checklist_id + "_" + item.photo;
      var base64Data = fs.readFileSync(filePath, { encoding: "base64" });
      item.photo = base64Data;
    });

    return oldData;
  } 
};
