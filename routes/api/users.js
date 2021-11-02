const express = require("express");
const router = express.Router();
const userService = require("../../service/userService");

router.post("/", (req, res) => {
  let user = req.body;
  console.log(user);
  userService
    .saveUsers(user)
    .then((result) => {
      res.json({ message: "User inserted successfully" });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/", (req, res) => {
  userService
    .getUsers()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.get("/:id", (req, res) => {
  userService
    .getUserById(req.params.id)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((e) => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  let newUser = req.body;

  userService
    .updateUser(req.params.id, newUser)
    .then((result) => {
      res.json({ message: "User updated successfully!" });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    });
});

router.delete("/:id", (req, res) => {
  userService
    .deleteUser(req.params.id)
    .then((result) => {
      res.json({ message: "User deleted successfully!" });
    })
    .catch((e) => {
      res.status(400).json({ message: "Something went wrong!" });
    });
});

module.exports = router;
