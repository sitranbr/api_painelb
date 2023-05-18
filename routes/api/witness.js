const express = require("express");
const router = express.Router();
const witnessService = require("../../service/wintessService");

// witness

router.post("/", (req, res) => {
  let witness = req.body;
  witnessService
    .saveWitness(witness)
    .then(result => {
      res.json({ message: "Witness inserted successfully" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {
  witnessService
    .getWitness()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id", (req, res) => {
  witnessService
    .getWitnessById(req.params.id)
    .then(result => {
      res.json(result[0]);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  let newWitness = req.body;

  witnessService
    .updateWitness(req.params.id, newWitness)
    .then(result => {
      res.json({ message: "Witness updated successfully!" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", (req, res) => {
  witnessService
    .deleteWitness(req.params.id)
    .then(result => {
      res.json({ message: "Witness deleted successfully!" });
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

module.exports = router;
