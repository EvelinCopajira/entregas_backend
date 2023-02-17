//ROUTER DESDE EXPRESS
const { Router } = require("express");
const router = Router();

//ENPOINT - post
router.post("/", (req, res) => {
  //id - products
});

//ENPOINT - get by id
router.get("/:cid", (req, res) => {
  //traer el carrito por el id
});

//ENPOINT - post
router.post("/:cid/product/:pid", (req, res) => {
  //agregar un producto al array products del carrito seleccionado
  //formato del producto: id - qty (si ya existe incrementar el campo qty)
});

module.exports = router;
