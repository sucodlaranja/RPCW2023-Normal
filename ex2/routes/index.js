var express = require("express");
var router = express.Router();
const contract = require("../controllers/contract");

/* GET home page. */
router.get("/", function (req, res, next) {
  const d = new Date().toISOString().slice(0, 16);
  contract
    .list()
    .then((data) => {
      res.render("index", { slist: data, date: d });
    })
    .catch((err) => res.render("error", { error: err }));
});

router.get("/:id", function (req, res, next) {
  const d = new Date().toISOString().slice(0, 16);
  contract
    .getById(req.params.id)
    .then((data) => {
      res.render("contract", { contract: data[0]._doc, date: d });
    })
    .catch((err) => {
      res.render("error", { error: err });
    });
});

router.get("/inst/:nipc", function (req, res, next) {
  const d = new Date().toISOString().slice(0, 16);
  contract
    .getByNIPC(req.params.nipc)
    .then((data) => {
      res.render("institution", { slist: data, date: d });
    })
    .catch((err) => res.render("error", { error: err }));
});

// API de Dados
router.get("/contracts", function (req, res, next) {
  if (req.query.year) {
    contract
      .getByYear(req.query.year)
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  } else if (req.query.inst) {
    contract
      .getByInst(req.query.inst)
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  } else {
    contract
      .list()
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  }
});

router.get("/contracts/courses", function (req, res, next) {
  contract
    .getCoursesDistinct()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get("/contracts/institutions", function (req, res, next) {
  contract
    .getinstitutionsDistinct()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get("/contracts/:id", function (req, res, next) {
  contract
    .getById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.delete("/contracts/:id", function (req, res, next) {
  contract
    .delete(req.params.id)
    .then(() => res.send(""))
    .catch((err) => res.render("error", { error: err }));
});

router.post("/contracts", function (req, res, next) {
  contract
    .add(req.body)
    .then(() => res.send(""))
    .catch((err) => res.render("error", { error: err }));
});

module.exports = router;
