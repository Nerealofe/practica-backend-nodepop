import Product from "../models/product.js";

export async function listProducts(req, res) {
  // leemos los parametros que vienen en la URL
  const name = req.query.name;
  const tag = req.query.tag;
  const min = req.query.min;
  const max = req.query.max;
  const skip = req.query.skip;
  const limit = req.query.limit;

  // creamos objeto vacio para el filtro
  const filter = {};

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
  });
  // redirigimos a lista de productos
  res.redirect("/products");
}

// borrar un producto por su id
export async function deleteProduct(req, res) {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
}
