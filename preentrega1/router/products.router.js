//ROUTER DESDE EXPRESS
const { Router } = require("express");
const router = Router();

//Importo la clase ProductManager
const productManager = require("../service/productsManager");
//Trabajo con los elementos dentro del contenedor y asociado al .json
const products = new productManager("./dataBase/products.json");

//ENPOINT - get
router.get("/", async (req, res) => {
  const allProducts = await products.getProducts();
  const limit = req.query.limit;
  if (limit === undefined) {
    res.status(200).json({ producrt_list: allProducts });
  } else {
    const limitedProducts = allProducts.slice(0, limit);
    res.status(200).json({ product_list: limitedProducts });
  }
});

//ENPOINT - get by id
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productPid = await products.getProductById(pid);
  if (!productPid) {
    res.status(404).json({ error: "No se encuentra el producto" });
  }
  res.status(200).json({ product_id: productPid });
});

//ENPOINT - post
router.post("/", async (req, res) => {
  const newProduct = await products.addProduct(req.body);
  if (newProduct != undefined) {
    res.status(200).json(newProduct);
    console.log("enrouter:", newProduct);
  } else {
    res.status(400).json({message: `No se puede agregar el producto`})
  }

  //id-title-description-code-price-status(true)-stock-category-thumbnail(no obligatorio) - todos los demás obligatorios
});

//ENPOINT - put
router.put("/:pid", (req, res) => {
  //actualizar todos los campos, menos el id y el status
});

//ENPOINT - delete
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productPid = await products.deleteProduct(pid);
  if (!productPid) {
    res.status(404).json({ error: "No se existe el producto" });
  }
  res.status(200).json({ rest_products: products });
});

module.exports = router;
