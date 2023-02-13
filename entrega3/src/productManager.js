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

  addProduct = async (title, description, price, thumbnail, code, stock) => {
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
    await fs.promises.writeFile(this.filename, JSON.stringify(products, null, 2));
  };

  getProducts = async () => {
    let allProducts = await fs.promises.readFile("src/products.txt", "utf-8");
    return JSON.parse(allProducts);
  };

  getProductById = async (id) => {
    let allProducts = await fs.promises.readFile("src/products.txt", "utf-8");
    products = JSON.parse(allProducts);
    let filteredProduct = products.filter((elem) => elem.id == id);
    return filteredProduct[0];
  };

  updateProductById = async (id) => {
    let allProducts = await fs.promises.readFile("src/products.txt", "utf-8");
    let products = JSON.parse(allProducts);

    let filteredProduct = products.filter((elem) => elem.id === id);
    if (filteredProduct.length === 0) {
      console.error(`Not found`);
    }
    products[1].title = "Pantalón largo";
    console.log(products);
    await fs.promises.writeFile(this.filename, JSON.stringify(products, null, 2));
  };

  deleteProduct = async (id) => {
    let allProducts = fs.readFileSync("src/products.txt", "utf-8");
    products = JSON.parse(allProducts);

    let restOfProducts = products.filter((elemento) => elemento.id !== id);
    if (restOfProducts.length === allProducts.length) {
      console.error(`Not found`);
    }

    await fs.promises.writeFile(this.filename, JSON.stringify(restOfProducts, null, 2));
  };
}

//Add products
async function main() {
  //CREATE
  const productManager = new ProductManager("src/products.txt");
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
  await productManager.addProduct(
    "Pantalón corto",
    "Short de jean tiro corto",
    500,
    "url",
    "pan01",
    3
  );
  await productManager.addProduct(
    "Pantalón largo",
    "Pantalón largo negro",
    500,
    "url",
    "pan02",
    3
  );
  await productManager.addProduct(
    "Camisa manga corta",
    "Camisa manga corta color negra",
    500,
    "url",
    "cam01",
    3
  );
  await productManager.addProduct(
    "Camisa manga larga",
    "Camisa manga larga color blanco",
    500,
    "url",
    "cam02",
    3
  );
  await productManager.addProduct(
    "Pollera larga",
    "Pollera tableada larga",
    500,
    "url",
    "pol01",
    3
  );
  await productManager.addProduct(
    "Pollera corderoy",
    "Pollera larga corderoy",
    500,
    "url",
    "pol02",
    3
  );
  await productManager.addProduct(
    "Buzo deportivo",
    "Buzo con capucha y cierre",
    500,
    "url",
    "buz01",
    3
  );
  await productManager.addProduct(
    "Buzo lana",
    "Buzo de lana de alpaca",
    500,
    "url",
    "buz02",
    3
  );

}

main();

module.exports = ProductManager;
