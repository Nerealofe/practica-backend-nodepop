const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/products", productsController.listProducts);

module.exports = router;
