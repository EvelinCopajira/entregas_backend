const fs = require("fs");
//Guardo el array en una variable
let products = [];

//Declaro la clase
class ProductManager {
  constructor(filename) {
    this.filename = filename;
  }

  //Métodos
  idGenerator = () => {
    const count = products.length;
    if (count === 0) {
      return 1;
    } else {
      return products[count - 1].id + 1;
    }
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const id = this.idGenerator();
    //Valido que estén completos todos los datos
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error(
        `No se puede agregar el producto: "${title}", porque faltan datos`
      );
      return;
    }
    //Valido que el código no se repita entre productos
    if (products.find((elem) => elem.code === code)) {
      console.error(
        `No pudo agregarse el producto: "${title}" con el código "${code}" porque ya exite otro producto con el mismo código`
      );
      return;
    }
    products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    fs.writeFileSync(this.filename, JSON.stringify(products, null, 2));
  };

  getProducts = () => {
    let allProducts = fs.readFileSync("./products.json", "utf-8");
    return JSON.parse(allProducts);
  };

  getProductById = (id) => {
    let allProducts = fs.readFileSync("./products.json", "utf-8");
    products = JSON.parse(allProducts);

    let filteredProduct = products.filter((elem) => elem.id === id);
    if (filteredProduct.length === 0) {
      console.error(`Not found`);
    }
    return filteredProduct[0];
  };

  updateProductById = (id) => {
    let allProducts = fs.readFileSync("./products.json", "utf-8");
    let products = JSON.parse(allProducts);

    let filteredProduct = products.filter((elem) => elem.id === id);
    if (filteredProduct.length === 0) {
      console.error(`Not found`);
    }
    products[1].title = "Pantalón largo"
    console.log(products);
    fs.writeFileSync(this.filename, JSON.stringify(products, null, 2));

  };

  deleteProduct = (id) => {
    let allProducts = fs.readFileSync("./products.json", "utf-8");
    products = JSON.parse(allProducts);

    let restOfProducts = products.filter((elemento) => elemento.id !== id);
    if (restOfProducts.length === allProducts.length) {
        console.error(`Not found`);
    }

    fs.writeFileSync(this.filename, JSON.stringify(restOfProducts, null, 2));
  };
}

//Add products
async function main() {
  //CREATE
  const productManager = new ProductManager("products.json");
  await productManager.addProduct(
    "Remera",
    "Remera escote en v",
    500,
    "url",
    "rem01",
    3
  );

  await productManager.addProduct(
    "Remera manga larga",
    "Remera escote en v manga larga",
    500,
    "url",
    "rem02",
    3
  );

  //READ
  //ALL
  let allProducts = await productManager.getProducts();
  //console.log(allProducts);

  //BY ID
    let productById = await productManager.getProductById();
  if (productById != undefined) {
    console.log(`El producto con el id ${productById.id} es:`, productById);
  }

  //UPDATE
  allProducts = await productManager.updateProductById(1)

  //DELETE BY ID
  //allProducts = await productManager.deleteProduct(1);
}

main();


