const express = require("express");
const router = express.Router();

const usersRoute = require("./users");
const authRoute = require("./auth");
const vehiclesRoute = require("./vehicles");
const occurrenceRoute = require("./occurrence");
const occurrenceAll = require("./occurrence");
const typeRoute = require("./type_occurrence");
const photosRoute = require("./photos");
const checklistPhotos = require("./checklist_photos");
const victimsRoute = require("./victims");
const witnessRoute = require("./witness");
const checklistRoute = require("./checklist");
const { route } = require("./checklist");

router.use("/users", usersRoute);
router.use("/auth", authRoute);
router.use("/vehicles", vehiclesRoute);
router.use("/occurrence", occurrenceRoute);
router.use("/occurrence/all", occurrenceAll);
router.use("/photos", photosRoute);
router.use("/victims", victimsRoute);
router.use("/witness", witnessRoute);
router.use("/checklist", checklistRoute);
router.use("/type_occurrence", typeRoute);
router.use("/checklist-photos", checklistPhotos);

module.exports = router;
