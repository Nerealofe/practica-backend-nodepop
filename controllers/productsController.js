import Product from "../models/product.js";

export async function listProducts(req, res) {
  // compruebo si esta logueado
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  // leemos los parametros que vienen en la URL
  const name = req.query.name;
  const tag = req.query.tag;
  const min = req.query.min;
  const max = req.query.max;
  const skip = req.query.skip;
  const limit = req.query.limit;

  // creamos objeto vacio para el filtro
  const filter = {};

  // solo productos del usuario
  const userId = req.session.userId;
  filter.owner = userId;

  if (name) {
    filter.name = new RegExp("^" + name, "i");
  }

  if (tag) {
    filter.tags = tag;
  }

  if (min || max) {
    filter.price = {
      $gte: min ? Number(min) : 0,
      $lte: max ? Number(max) : Infinity,
    };
  }
  // hacemos la consulta a MongoDB con el filtro y aplicamos paginacion
  const products = await Product.find(filter)
    .populate("owner")
    .skip(Number(skip) || 0)
    .limit(Number(limit) || 0);

  // enviamos los datos a la vista
  res.render("products", {
    products,
    name,
    tag,
    min,
    max,
    skip,
    limit,
  });
}

// muestra formulario para crear producto
export function newProductPage(req, res) {
  res.render("product-form", {
    title: "Crear producto",
    values: req.body,
    errorMessage: "null",
  });
}

// recibe datos formulario y crea el producto en MongoDB
export async function createProduct(req, res) {
  // compruebo si esta logueado
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  const { name, price, tags } = req.body;
  //sacamos los datos y validamos
  if (!name || !price) {
    return res.render("product-form", {
      title: "Crear producto",
      values: req.body,
      errorMessage: "Nombre y precio obligatorios",
    });
  }
  // creamos en la base de datos el producto
  await Product.create({
    name,
    price: Number(price),
    tags: Array.isArray(tags) ? tags : [tags],
    owner: req.session.userId,
  });
  // redirigimos a lista de productos
  res.redirect("/products");
}

// borrar un producto por su id
export async function deleteProduct(req, res) {
  const id = req.params.id;
  //buscar producto
  const product = await product.findById(id);
  //si no existe
  if (!product) {
    return res.redirect("/products");
  }
  //compruebo dueño
  if (product.owner.toString() !== req.session.userId.toString()) {
    return res.status(403).send("No puedes borrar este producto");
  }
  // borro producto
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
}

// editar el producto
export async function editProductPage(req, res) {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.redirect("/products");
  }
  if (product.owner.toString() !== req.session.userId.toString()) {
    return res.status(403).send("No puedes editar este producto");
  }
  res.render("product-form", {
    title: "Editar producto",
    values: product,
    errorMessage: null,
  });
}

// guarda los cambios del producto
export async function updateProduct(req, res) {
  const id = req.params.id;
  const { name, price, tags } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    return res.redirect("/products");
  }
  if (product.owner.toString() !== req.session.userId.toString()) {
    return res.status(403).send("No puedes editar este producto");
  }
  await Product.findByIdAndUpdate(id, {
    name,
    price: Number(price),
    tags: Array.isArray(tags) ? tags : [tags],
  });

  res.redirect("/products");
}
