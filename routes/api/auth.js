const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authService = require("../../service/authService");

const PRIVATE_KEY = "your-key";
// var token = jwt.sign({ foo: "bar" }, "shhhhh");

router.post("/register", (req, res) => {
  let user = req.body;
  authService
    .register(user)
    .then((result) => {
      res.json({ message: "Usuário registrado com sucesso" });
    })
    .catch((e) => {
      let message = "Algo de errado ocorreu.";
      if ((e.code = "ER_DUP_ENTRY")) {
        message = "Email já registrado.";
      }
      res.status(400).json({ message });
    });
});

router.post("/login", (req, res) => {
  let credential = req.body;
  //console.log(credential);
  authService
    .login(credential)
    .then((results) => {
      if (results.length === 1) {
        let result = results[0];
        
        let tokenData = {
          users_id: result.users_id,
          registration: result.registration,
          email: result.email,
          name: result.name,
          level: result.level
        };

        let token = jwt.sign(tokenData, PRIVATE_KEY, { expiresIn: "1h" });

        res.json({
          message: "Logado com sucesso",
          users_id: result.users_id,
          email: result.email,
          name: result.name,
          level: result.level,
          token
        });
      } else {
        res.status(400).json({ message: "Email ou senha inválido!" });
      }
    })
    .catch((e) => {
      res.status(400).json({ message: "Email ou senha inválido!" });
    });
});

router.get("/login", (req, res) => {
  let credential = req.body;
  //console.log(credential);
  authService
    .dologin(req.params.email, req.params.password)
    .then((results) => {
      if (results.length === 1) {
        let result = results[0];
        let tokenData = {
          users_id: result.users_id,
          registration: result.registration,
          email: result.email,
          name: result.name,
          level: result.level
        };

        let token = jwt.sign(tokenData, PRIVATE_KEY, { expiresIn: "1h" });

        res.json({
          message: "Logado com sucesso",
          users_id: result.users_id,
          email: result.email,
          name: result.name,
          level: result.level,
          token
        });
      } else {
        res.status(400).json({ message: "Email ou senha inválido!" });
      }
    })
    .catch((e) => {
      res.status(400).json({ message: "Email ou senha inválido!" });
    });
});

router.get("/refreshtoken", (req, res) => {
  //   userService
  //     .getUserById(req.params.id)
  //     .then((result) => {
  //       res.json(result[0]);
  //     })
  //     .catch((e) => {
  //       res.status(400).json({ message: "Something went wrong!" });
  //     });
});

module.exports = router;
