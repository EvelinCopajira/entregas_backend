//ROUTER DESDE EXPRESS
const { Router } = require("express");
const router = Router();

//Importo la clase ProductManager
const productManager = require("../service/productsManager");
//Trabajo con los elementos dentro del contenedor y asociado al .json
const products = new productManager("./dataBase/products.json");

//ENDPOINT - get
router.get("/", async (req, res) => {
  const allProducts = await products.getProducts();
  const limit = req.query.limit;
  if (limit == undefined) {
    res.status(200).json({ allProducts });
  } else {
    const limitedProducts = allProducts.slice(0, limit);
    res.status(200).json({ limitedProducts });
  }
});

//ENDPOINT - get by id
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productPid = await products.getProductById(pid);
  if (productPid) {
    res.status(200).json({ productPid });
  } else {
    res.status(404).json({ error: "No se encuentra el producto" });
  }
});

//ENDPOINT - post
router.post("/", async (req, res) => {
  const newProduct = await products.addProduct(req.body);
  if (newProduct == undefined) {
    res.status(400).json({ message: `No se puede agregar el producto` });
  } else {
    res.status(200).json({ newProduct });
  }
});

//ENDPOINT - put
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updateProduct = await products.updateProductById(pid, req.body);
  if (updateProduct) {
    res.status(200).json({ updateProduct });
  } else {
    res.status(404).json({ error: "No se encuentra el producto" });
  }
});

//ENDPOINT - delete
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productPid = await products.deleteProduct(pid);
  if (productPid) {
    res.status(200).json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "No se existe el producto" });
  }
});

module.exports = router;
