const express = require("express");
const router = express.Router();
const vehicleType = require("../../service/vehicleTypeService");

// witness

router.post("/", (req, res) => {
  let type = req.body;
  vehicleType
    .saveType(type)
    .then(result => {
      res.json({ message: "Vehicle type inserted successfully" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {
    vehicleType
    .getType()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id", (req, res) => {
    vehicleType
    .getTypeById(req.params.id)
    .then(result => {
      res.json(result[0]);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  let newType = req.body;

  vehicleType
    .updateType(req.params.id, newType)
    .then(result => {
      res.json({ message: "Vehicle type updated successfully!" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", (req, res) => {
    vehicleType
    .deleteType(req.params.id)
    .then(result => {
      res.json({ message: "Vehicle type deleted successfully!" });
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

module.exports = router;
