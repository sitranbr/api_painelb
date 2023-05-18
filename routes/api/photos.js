const express = require("express");
const router = express.Router();
const photoService = require("../../service/photoService");

//photo
router.post("/", (req, res) => {
  let photo = req.body;
  photoService
    .savePhotos(photo)
    .then(result => {
      res.json({ message: "Photo inserted successfully" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {
  photoService
    .getPhotos()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id", (req, res) => {
  photoService
    .getPhotoById(req.params.id)
    .then(result => {
      res.json(result[0]);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  let newPhoto = req.body;

  photoService
    .updatePhoto(req.params.id, newPhoto)
    .then(result => {
      res.json({ message: "Photo updated successfully!" });
    })
    .catch(e => {
      //   console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", (req, res) => {
  photoService
    .deletePhoto(req.params.id)
    .then(result => {
      res.json({ message: "Photo deleted successfully!" });
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

module.exports = router;
