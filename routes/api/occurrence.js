const express = require("express");
const fs = require("fs");
const router = express.Router();
const occurrenceService = require("../../service/occurrenceService");
const vehicleService = require("../../service/vehicleService");
const photoService = require("../../service/photoService");
const victimService = require("../../service/victimService");
const wintessService = require("../../service/wintessService");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let id = req.body.occurrenceId;
    let dir = './uploads/occurrence/' + id;
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (err) {
      console.error(err)
    }
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const filterImageFile = (req, file, cb) => {
  const fileExt = ['.png', '.jpg', '.jpeg']
  var ext = path.extname(file.originalname);

  if (fileExt.includes(ext)) cb(null, true)
  else cb('Only .png .jpg and .jpeg format allowed!', false)
}

const upload = multer({ storage: storage, fileFilter: filterImageFile })

const uploadImage = upload.array('photos')

router.post("/multiple-table", async (req, res) => {
  uploadImage(req, res, async function (err) {
    let id = req.body.occurrenceId
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: err.message });
    } else if (err) {
      res.status(400).json({ message: err.message });
    } else {
      try {
        let jsonData = req.body.occurrence;
        let data = JSON.parse(jsonData);
        let occurrence = data.occurrence;
        let vehicleData = data.vehicle_conductor;
        let photoData = data.occurrence_photos;
        let victimData = data.occurrence_victim;
        let witnessData = data.occurrence_witness;

        let occResult = await occurrenceService.saveOccurrence(occurrence);
        if (Array.isArray(photoData) && photoData.length) {
          var mainPath = req.protocol + '://' + req.get('host') + "/uploads/occurrence/" + id + "/";
          let photoResult = await photoService.savePhotos(photoData, mainPath);
        }
        if (Array.isArray(victimData) && victimData.length) {
          let victimResult = await victimService.saveVictims(victimData);
        }
        if (Array.isArray(witnessData) && witnessData.length) {
          let witnessResult = await wintessService.saveWitness(witnessData);
        }
        if (Array.isArray(vehicleData) && vehicleData.length) {
          let vehicleResult = await vehicleService.saveVehicles(vehicleData);
        }
        //res.json({ message: "Occurrence inserted successfully in multiple tables" });
        res.json({ message: "Occorr??ncia criada com sucesso" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  })
});

router.post("/", (req, res) => {
  let occurrence = req.body;
  occurrenceService
    .saveOccurrence(occurrence)
    .then(result => {
      //res.json({ message: "Occurrence inserted successfully" });
      res.json({ message: " Occorr??ncia criada com sucesso" });
    })
    .catch(e => {
      res.status(400).json({ message: e.message });
    });
});

router.get("/", (req, res) => {
  occurrenceService
    .getOccurrences()
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: e.message });
    });
});

router.get("/occurrences", (req, res) => {
  occurrenceService
    .getOccurrencesListData()
    .then(result => {
      try {
        if (result.length ) {
          res.json(result);
        } else {
          res.status(400).json({ message: "There are no occurrence" });
        }

      } catch (e) {
        res.status(400).json({ message: "There are no occurrence" });
      }
    })
    .catch(e => {
      res.status(400).json({ message: e.message });
    });
});


router.get("/:id", async (req, res) => {
  try {
    occurrenceService.getOccurrenceById(req.params.id)
      .then(result => {
        if (result.length) {
          res.json(result[0]);
        } else {
          res.status(400).json({ message: "Could not find occurrence" });
        }
      })

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  uploadImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: err });
    } else if (err) {
      res.status(400).json({ message: err });
    } else {
      try {
        let jsonData = req.body.occurrence;
        let data = JSON.parse(jsonData);
        let occurrence = data.occurrence;
        let occurrenceId=occurrence.occurrence_id
        let vehicleData = data.vehicle_conductor;
        let photoData = data.occurrence_photos;
        let victimData = data.occurrence_victim;
        let witnessData = data.occurrence_witness;

        let occResult = await occurrenceService.updateOccurrence(occurrenceId, occurrence)

        let photoDeleteResult = await photoService.deletePhotoByOccurrenceId(occurrenceId);
        if (Array.isArray(photoData) && photoData.length) {
          var mainPath = req.protocol + '://' + req.get('host') + "/uploads/occurrence/" + occurrenceId + "/";
          let photoResult = await photoService.savePhotos(photoData, mainPath);
        }
        let victimDelteResult = await victimService.deleteVictimByOccurrenceId(occurrenceId);
        if (Array.isArray(victimData) && victimData.length) {
          let victimResult = await victimService.saveVictims(victimData);
        }

        let witnessDeleteResult = await wintessService.deleteWitnessByOccurenceId(occurrenceId);
        if (Array.isArray(witnessData) && witnessData.length) {
          let witnessResult = await wintessService.saveWitness(witnessData);
        }

        let vehicleDelteResult = await vehicleService.deleteVehicleByOccurenceId(occurrenceId);
        if (Array.isArray(vehicleData) && vehicleData.length) {
          let vehicleResult = await vehicleService.saveVehicles(vehicleData);
        }

        res.json({
          //message: "Occurrence update successfully."
          message: "Ocorr??ncia atualizada com sucesso."
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  })
});

router.delete("/:id", async (req, res) => {
  let occurrenceId = req.params.id
  let photoDeleteResult = await photoService.deletePhotoByOccurrenceId(occurrenceId);
  let victimDelteResult = await victimService.deleteVictimByOccurrenceId(occurrenceId);
  let witnessDeleteResult = await wintessService.deleteWitnessByOccurenceId(occurrenceId);
  let vehicleDelteResult = await vehicleService.deleteVehicleByOccurenceId(occurrenceId);

  occurrenceService
    .deleteOccurrence(occurrenceId)
    .then(result => {
      res.json({ 
        message: "Ocorr??ncia deletada com sucesso." 
      });
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
