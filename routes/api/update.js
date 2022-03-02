const express = require("express");
const router = express.Router();
const update = require("../../service/updateService");

// witness

router.post("/", (req, res) => {
  let type = req.body;
  update
    .saveType(type)
    .then(result => {
      res.json({ message: "Status update inserted successfully" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {
    update
    .getType()
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: e });
    });
});

router.get("/:id", (req, res) => {
    update
    .getTypeById(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  let newType = req.body;

  update
    .updateApp(req.params.id, newType)
    .then(result => {
      res.json({ message: "Status updated successfully!" });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});


module.exports = router;
