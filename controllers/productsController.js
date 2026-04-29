function listProducts(req, res) {
  const name = req.query.name;
  const tag = req.query.tag;
  const min = req.query.min;
  const max = req.query.max;
  const skip = req.query.skip;
  const limit = req.query.limit;

  const products = [
    { name: "iPhone", price: 500, tags: ["mobile"] },
    { name: "Bici", price: 200, tags: ["lifestyle"] },
    { name: "Coche", price: 3000, tags: ["motor"] },
    { name: "Mesa", price: 80, tags: ["work"] },
  ];

  let filteredProducts = products.filter((product) => {
    const matchesName = name ? product.name.startsWith(name) : true;

    const matchesTag = tag ? product.tags.includes(tag) : true;

    const matchesPrice =
      (min ? product.price >= Number(min) : true) &&
      (max ? product.price <= Number(max) : true);

    return matchesName && matchesTag && matchesPrice;
  });

  const skipNum = Number(skip) || 0;
  const limitNum = Number(limit) || filteredProducts.length;

  filteredProducts = filteredProducts.slice(skipNum).slice(0, limitNum);

  res.render("products", {
    products: filteredProducts,
    name,
    tag,
    min,
    max,
    skip,
    limit,
  });
}

module.exports = {
  listProducts,
};
