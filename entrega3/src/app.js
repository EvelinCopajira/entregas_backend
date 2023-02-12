//Instalo el módulo express y lo traigo con un require
const express = require("express");
//Creo la app
const app = express();
//Importo la clase ProductManager
const productManager = require("./productManager.js");
//Trabajo con los elementos dentro del contenedor y asociado al .txt
const products = new productManager("./products.txt");

app.get("/products", async (req, res) => {
  const allProducts = await products.getProducts();
  const limit = req.query.limit;
  if (limit === undefined) {
    res.send({ producrt_list: allProducts });
  } else {
    const limitedProducts = allProducts.slice(0, limit);
    res.send({ product_list: limitedProducts });
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const productPid = await products.getProductById(pid);
  if(!productPid) {
    res.send({error: 'No se encuentra el producto'})
  }
  res.send({ product_id: productPid });
});

app.listen(8080, () => console.log("Server on"));
