import express from "express";
const router = express.Router();

import * as productsController from "../controllers/productsController.js";

router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// ver producto / ver formulario / crear producto
router.get("/products", productsController.listProducts);
router.get("/products/new", productsController.newProductPage);
router.post("/products", productsController.createProduct);
router.post("/products/:id/delete", productsController.deleteProduct);

export default router;
