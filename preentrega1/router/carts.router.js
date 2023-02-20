//ROUTER DESDE EXPRESS
const { Router } = require("express");
const router = Router();

//Importo la clase ProductManager
const cartsManager = require("../service/cartsManager");
//Trabajo con los elementos dentro del contenedor y asociado al .json
const carts = new cartsManager("./dataBase/carts.json");

//ENDPOINT - post
router.post("/", async (req, res) => {
  const newCart = await carts.addCart()
  if (newCart == undefined) {
    res.status(400).json({message: `No se puede agregar el carrito`})
  } else {
    res.status(200).json(newCart);
  }
  //id - products
});

//ENDPOINT - get by id
router.get("/:cid", async (req, res) => {
  //traer el carrito por el id
  const { cid } = req.params;
  const cartProducts = await carts.getCartProducts(cid);
  if (cartProducts) {
    res.status(200).json(cartProducts);
  } else {
    res.status(404).json({message: `No existe carrito con el id dado`})
  }
});

//ENDPOINT - post
router.post("/:cid/product/:pid", async (req, res) => {
  //agregar un producto al array products del carrito seleccionado
  //formato del producto: id - qty (si ya existe incrementar el campo qty)
  const { cid, pid } = req.params;
  const cartProduct = await carts.addProductToCart(cid, pid);
  if (cartProduct) {
    res.status(200).json(cartProduct);
  } else {
    res.status(400).json({message: `No se puede agregar producto al carrito`})
  }

});

module.exports = router;
