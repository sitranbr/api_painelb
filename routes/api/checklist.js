const express = require("express");
const fs = require("fs");
const router = express.Router();
const checklistService = require("../../service/checklistService");
const photoChecklistService = require("../../service/photoChecklistService");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let id = req.body.checklistId;
    let dir = "./uploads/checklist/" + id;
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (err) {
      console.error(err);
    }
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const filterImageFile = (req, file, cb) => {
  const fileExt = [".png", ".jpg", ".jpeg"];
  var ext = path.extname(file.originalname);

  if (fileExt.includes(ext)) cb(null, true);
  else cb("Only .png .jpg and .jpeg format allowed!", false);
};

const upload = multer({ storage: storage, fileFilter: filterImageFile });

const uploadImage = upload.array("photos");

router.post("/", async (req, res) => {

  uploadImage(req, res, async function (err) {
    let id = req.body.checklistId;
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: err.message });
    } else if (err) {
      res.status(400).json({ message: err.message });
    } else {
      try {
        let jsonData = req.body.checklist;
        let data = JSON.parse(jsonData);
        let checklist = data.checklist;
        let photoData = data.checklist_photos;

        let checkResult = await checklistService.saveChecklist(checklist);

        if (Array.isArray(photoData) && photoData.length) {
          var mainPath =
            req.protocol +
            "://" +
            req.get("host") +
            "/uploads/checklist/" +
            id +
            "/";
          let photoResult = await photoChecklistService.saveCheckListPhotos(
            photoData,
            mainPath
          );
        }

        res.json({
          //message: "Checklist inserted successfully in multiple tables"
          message: "Checklist criado com sucesso",
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  });
  
});

router.post("/list", (req, res) => {
  let checklist = req.body;
  checklistService
    .saveChecklist(checklist)
    .then((result) => {
      res.json({
        //message: "Checklist inserted successfully"
        message: "Checklist criado com sucesso",
      });
    })
    .catch((e) => {
      res.status(400).json({ message: e });
    });
});

router.get("/", (req, res) => {
  checklistService
    .getChecklist()
    .then((result) => {
      try {
        if (result.length) {
          res.json(result);
        } else {
          res.status(400).json({
            //message: "There are no checklist"
            message: "Não existe nenhum checklist",
          });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

router.get("/:id", async (req, res) => {
  try {
    checklistService.getChecklistById(req.params.id).then((result) => {
      if (result.length) {
        res.json(result[0]);
      } else {
        res.status(400).json({
          //message: "Could not find checklist"
          message: "Checklist não encontrado",
        });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    checklistService.getChecklistByUserId(req.params.id).then((result) => {
      if (result.length) {
        res.json(result);
      } else {
        res.status(400).json({
          //message: "Could not find checklist"
          message: "Checklist não encontrado",
        });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  uploadImage(req, res, async function (err) {
    let id = req.body.checklistId;
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: err });
    } else if (err) {
      res.status(400).json({ message: err });
    } else {
      try {
        let jsonData = req.body.checklist;
        let data = JSON.parse(jsonData);
        let checklist = data.checklist;
        let checklistId = checklist.checklist_id;
        let photoData = data.checklist_photos;

        let checkResult = await checklistService.updateChecklist(
          checklistId,
          checklist
        );
        let photoDeleteResult =
          await photoChecklistService.deletePhotoByChecklistId(checklistId);
        if (Array.isArray(photoData) && photoData.length) {
          var mainPath =
            req.protocol +
            "://" +
            req.get("host") +
            "/uploads/checklist/" +
            id +
            "/";
          let photoResult = await photoChecklistService.saveCheckListPhotos(
            photoData,
            mainPath
          );
        }
        res.json({
          //message: "Checklist update successfully"
          message: "Checklist atualizado com sucesso",
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  });
});

router.delete("/:id", async (req, res) => {
  let checklistId = req.params.id;
  let photoDeleteResult = await photoChecklistService.deletePhotoByChecklistId(
    checklistId
  );
  checklistService
    .deleteChecklist(checklistId)
    .then((result) => {
      res.json({
        //message: "Checklist deleted successfully"
        message: "Checklist deletado com sucesso",
      });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
