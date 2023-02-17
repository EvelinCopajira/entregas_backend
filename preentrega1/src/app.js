const express = require("express");
const productsRouter = require('../router/products.router')
const cartsRouter = require("../router/carts.router");


const app = express();

app.listen(8080, () => console.log("Server on"));

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.get("/", (req, res) => {
  res.send("Hola mundo!");
}); 

//ROUTES
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

