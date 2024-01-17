const express = require("express");
const app = express();

const { products } = require("./data");

app.get("/", (req, res) => {
  res.send(
    "<h1> Home page </h1> <br> <a href = '/api/products'> products </a>"
  );
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { name, price } = product;
    return { name, price };
  });
  res.json(newProducts);
});

app.get("/api/products/:productId", (req, res) => {
  console.log(req.params);
  const item = products.find(
    (product) => product.product_id === Number(req.params.productId)
  );

  if (!item) {
    return res.status(404).send("Product doesn't exists");
  }
  res.json(item);
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      userSearch = search.toLowerCase();
      product_name = product.name.toLowerCase();
      return product_name.startsWith(userSearch);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    return res.json({ success: true, data: sortedProducts }).status(200);
  }

  res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log("Server is listening on Port 5000");
});
