const express = require("express");
const router = express.Router();
const victimService = require("../../service/victimService");

router.post("/", (req, res) => {
  let victims = req.body;
  victimService
    .saveVictims(victims)
    .then(result => {
      res.json({ message: "Victim inserted successfully" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {
  victimService
    .getVictims()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id", (req, res) => {
  victimService
    .getVictimById(req.params.id)
    .then(result => {
      res.json(result[0]);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  let newVictim = req.body;

  victimService
    .updateVictim(req.params.id, newVictim)
    .then(result => {
      res.json({ message: "Victim updated successfully!" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", (req, res) => {
  victimService
    .deleteVictim(req.params.id)
    .then(result => {
      res.json({ message: "Victim deleted successfully!" });
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

module.exports = router;
