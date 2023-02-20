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
    //Desestructuro el nuevo objeeto
    const { title, description, code, price, stock, category, thumbnail } =
      newProduct;

    //Valido que estén completos todos los datos
    if (!title || !description || !code || !price || !stock || !category) {
      console.error(
        `No se puede agregar el producto ${title} porque faltan datos `
      );
      return undefined;
    }
    //Valido que el código no se repita entre productos
    if (allProducts.find((elem) => elem.code === newProduct.code)) {
      console.error(
        `No pudo agregarse el producto: "${title}" con el código "${code}" porque ya exite otro producto con el mismo código`
      );
      return undefined;
    }

    //Le asigno a status un true (no modificables) y genero el ID incremental
    const status = true;
    const newId =
      allProducts.length == 0 ? 1 : allProducts[allProducts.length - 1].id + 1;

    //Le agrego el id y el status al producto
    newProduct = { id: newId, status: status, ...newProduct };

    //.push al array
    allProducts.push(newProduct);

    //Escribir/guardar el nuevo [] con el producto agregado/modificado
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(allProducts, null, 2)
    );
    return newProduct;
  };

  updateProductById = async (id, updateProduct) => {
    //Obtengo los productos que existen con .getProducts
    const allProducts = await this.getProducts();

    const filteredProduct = allProducts.filter((elem) => elem.id == id);
    if (filteredProduct.length == 0) {
      console.error(`Not found`);
      return undefined;
    }
    //Desestructuro el objeto a modificar
    const { title, description, code, price, stock, category, thumbnail } =
      updateProduct;

    //Valido que estén completos todos los datos
    if (!title || !description || !code || !price || !stock || !category) {
      console.error(
        `No se puede agregar el producto ${title} porque faltan datos `
      );
      return undefined;
    }
    //Valido que el código no se repita entre productos
    if (allProducts.find((elem) => elem.code == updateProduct.code)) {
      console.error(
        `No pudo agregarse el producto: "${title}" con el código "${code}" porque ya exite otro producto con el mismo código`
      );
      return undefined;
    }
    //Piso los valores del producto filtrado por los que estoy ingresando
    filteredProduct[0].title = updateProduct.title;
    filteredProduct[0].description = updateProduct.description;
    filteredProduct[0].code = updateProduct.code;
    filteredProduct[0].price = updateProduct.price;
    filteredProduct[0].stock = updateProduct.stock;
    filteredProduct[0].category = updateProduct.category;
    filteredProduct[0].thumbnail = updateProduct.thumbnail;

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(allProducts, null, 2)
    );

    return filteredProduct[0];
  };

  deleteProduct = async (id) => {
    //Obtengo los productos que existen con .getProducts
    const allProducts = await this.getProducts();

    const restOfProducts = allProducts.filter((elemento) => elemento.id != id);
    
    if (restOfProducts.length == allProducts.length) {
      console.error(`Not found`);
      return;
    }

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(restOfProducts, null, 2)
    );
  };
}

module.exports = ProductManager;
