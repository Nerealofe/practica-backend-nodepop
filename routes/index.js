import express from "express";
const router = express.Router();

import * as productsController from "../controllers/productsController.js";
import * as authController from "../controllers/authController.js";

router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// formulario crear producto / formulario editar / guardar edicion / borrar producto / lista productos / recibe formulario y crea producto
router.get("/products/new", productsController.newProductPage);
router.get("/products/:id/edit", productsController.editProductPage);
router.post("/products/:id/edit", productsController.updateProduct);
router.post("/products/:id/delete", productsController.deleteProduct);
router.get("/products", productsController.listProducts);
router.post("/products", productsController.createProduct);

// login
router.get("/login", authController.loginPage);
router.post("/login", authController.loginAction);
router.get("/logout", authController.logout);

export default router;
