const express = require("express");
const router = express.Router();
const vehicleService = require("../../service/vehicleService");

router.post("/", (req, res) => {
  let vehicle = req.body;
  vehicleService
    .saveVehicles(vehicle)
    .then(result => {
      res.json({ message: "Vehicle inserted successfully" });
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {
  vehicleService
    .getVehicles()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id", (req, res) => {
  vehicleService
    .getVehicleById(req.params.id)
    .then(result => {
      res.json(result[0]);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  let newVehicle = req.body;

  vehicleService
    .updateVehicle(req.params.id, newVehicle)
    .then(result => {
      res.json({ message: "Vehicle updated successfully!" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", (req, res) => {
  vehicleService
    .deleteVehicle(req.params.id)
    .then(result => {
      res.json({ message: "Vehicle deleted successfully!" });
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

module.exports = router;
