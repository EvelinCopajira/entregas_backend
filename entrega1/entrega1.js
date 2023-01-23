//Declaro la clase
class ProductManager {
  //Constructor con elmento "products"
  constructor() {
    this.products = [];
  }

  //Métodos
  idGenerator = () => {
    const count = this.products.length;
    if (count === 0) {
      return 1;
    } else {
      return this.products[count - 1].id + 1;
    }
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const id = this.idGenerator();
    //Valido que estén completos todos los datos
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error(`No se puede agregar el producto: "${title}", porque faltan datos`);
      return;
    }
    //Valido que el código no se repita entre productos
    if (this.products.find((elem) => elem.code === code)) {
      console.error(
        `No pudo agregarse el producto: "${title}" con el código "${code}" porque ya exite otro producto con el mismo código`
      );
      return;
    }
    this.products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
  };

  getProducts = () => {
    return this.products;
  };

  getProductById = (id) => {
    const filteredProduct = this.products.filter((elem) => elem.id === id);
    if (filteredProduct.length === 0) {
      console.error(`Not found`);
      return;
    }
    return filteredProduct[0];
  };
}

//Creo productos e invoco los métodos
//Add products
const productManager = new ProductManager();
productManager.addProduct(
  "Remera",
  "Remera escote en v",
  500,
  "url",
  "rem01",
  3
);

productManager.addProduct(
  "Remera manga larga",
  "Remera escote en v manga larga",
  500,
  "url",
  "rem02",
  3
);
console.log(productManager.getProducts());

//Producto con el mismo código
productManager.addProduct(
  "Pantalon largo",
  "Pantalon largo tiro alto",
  1500,
  "url",
  "rem01",
  3
);
//Producto que le falta precio
productManager.addProduct(
  "Pantalon corto",
  "Pantalon corto tiro alto",
  "url",
  "rem01",
  3
);

//Get product by id
//id que si existe
let productById = productManager.getProductById(2);
if ((productById != undefined)) {
    console.log(`El producto con el id ${productById.id} es:`, productById);
}

//id que no existe
productById = productManager.getProductById(3);
if ((productById != undefined)) {
    console.log(`El producto con el id ${productById.id} es:`, productById);
}

