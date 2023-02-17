const fs = require("fs");

//Guardo el array en una variable
const allProducts = [];

//Declaro la clase
class ProductManager {
  constructor(filename) {
    this.filename = filename;
  }

  //Métodos
  //GET ALL
  getProducts = async () => {
    //Leo el .json en la ruta indicada y lo parseo
    const allProducts = await fs.promises.readFile(this.filename, "utf-8");
    if (allProducts == "") {
      return [];
    }
    return JSON.parse(allProducts);
  };
  //GET BY ID
  getProductById = async (id) => {
    //Obtengo los productos que existen con .getProducts
    const allProducts = await this.getProducts();
    //.filter para identificar el id que recibo
    const filteredProduct = allProducts.filter((elem) => elem.id == id);
    return filteredProduct[0];
  };

  //ADD PRODUCT
  addProduct = async (newProduct) => {
    //Verifico si existe
    //Obtengo los productos que existen con .getProducts
    const allProducts = await this.getProducts();
    //.filter para identificar el id del producto que recibo
    const filteredProduct = allProducts.filter(
      (elem) => elem.id == newProduct.id
    );

    //Si no existe lo pusheo - sino piso los datos anteriores con la modificación
    if (filteredProduct.length == 0) {
      //Desestructuro el nuevo objeeto
      const { title, description, code, price, stock, category, thumbnail } =
        newProduct;

      //Valido que estén completos todos los datos
      if (!title || !description || !code || !price || !stock || !category) {
        console.error(
          `No se puede agregar el producto ${title} porque faltan datos `
        );
        return;
      }
      //Valido que el código no se repita entre productos
      if (allProducts.find((elem) => elem.code === newProduct.code)) {
        console.error(
          `No pudo agregarse el producto: "${title}" con el código "${code}" porque ya exite otro producto con el mismo código`
        );
        return;
      }
      //Le asigno a status un true (no modificables) y genero el ID incremental
      const status = true;
      const newId =
        allProducts.length == 0
          ? 1
          : allProducts[allProducts.length - 1].id + 1;

      //Le agrego el id y el status al producto
      newProduct = { id: newId, status: status, ...newProduct };

      //.push al array
      allProducts.push(newProduct);
    } else {
      filteredProduct[0].title = newProduct.title;
      filteredProduct[0].description = newProduct.description;
      filteredProduct[0].code = newProduct.code;
      filteredProduct[0].price = newProduct.price;
      filteredProduct[0].stock = newProduct.stock;
      filteredProduct[0].category = newProduct.category;
      filteredProduct[0].thumbnail = newProduct.thumbnail;
    }
    //Escribir/guardar el nuevo [] con el producto agregado/modificado
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(allProducts, null, 2)
    );
    return newProduct;
  };

  /* updateProductById = async (id) => {
    let allProducts = await fs.promises.readFile("./dataBase/products.json", "utf-8");
    let products = JSON.parse(allProducts);

    let filteredProduct = products.filter((elem) => elem.id === id);
    if (filteredProduct.length === 0) {
      console.error(`Not found`);
    }
    products[1].title = "Pantalón largo";
    console.log(products);
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(products, null, 2)
    );
  }; */

  /*   deleteProduct = async (id) => {
    let allProducts = fs.readFileSync("./dataBase/products.json", "utf-8");
    products = JSON.parse(allProducts);

    let restOfProducts = products.filter((elemento) => elemento.id !== id);
    if (restOfProducts.length === allProducts.length) {
      console.error(`Not found`);
    }

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(restOfProducts, null, 2)
    );
  }; */
}

module.exports = ProductManager;
