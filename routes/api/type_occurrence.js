const express = require("express");
const router = express.Router();
const typeOccurrence = require("../../service/typeOccurrenceService");

// witness

router.post("/", (req, res) => {
  let type = req.body;
  typeOccurrence
    .saveType(type)
    .then(result => {
      res.json({ message: "Witness inserted successfully" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {
    typeOccurrence
    .getType()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id", (req, res) => {
    typeOccurrence
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

  typeOccurrence
    .updateType(req.params.id, newType)
    .then(result => {
      res.json({ message: "Witness updated successfully!" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", (req, res) => {
    typeOccurrence
    .deleteType(req.params.id)
    .then(result => {
      res.json({ message: "Witness deleted successfully!" });
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

module.exports = router;
