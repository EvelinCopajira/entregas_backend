const fs = require("fs");

//Importo la clase ProductManager
const productManager = require("../service/productsManager");
//Trabajo con los elementos dentro del contenedor y asociado al .json
const products = new productManager("./dataBase/products.json");

//Guardo el array en una variable
const allCarts = [];

//Declaro la clase

class CartManager {
  constructor(filename) {
    this.filename = filename;
  }

  //Métodos
  //GET ALL
  getCarts = async () => {
    //Leo el .json y lo parse
    const allCarts = await fs.promises.readFile(this.filename, "utf-8");
    if (allCarts == "") {
      return [];
    }
    return JSON.parse(allCarts);
  };

  //ADD CART
  addCart = async () => {
    //Obtengo todos los carritos
    const allCarts = await this.getCarts();
    const newId =
      allCarts.length == 0 ? 1 : allCarts[allCarts.length - 1].id + 1;
    //Le agrego el id al carrito
    const newCart = { id: newId, products: [] };
    //.push al array
    allCarts.push(newCart);

    //Escribir/guardar el nuevo [] con el carrito
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(allCarts, null, 2)
    );
    return newCart;
  };

  getCartById = async (cart_id) => {
    const allCarts = await this.getCarts();
    const filteredCarts = allCarts.filter(
      (elemt) => (elemt.id = cart_id)
    );
    if (filteredCarts.length == 0) {
      return undefined;
    }
    return filteredCarts[0];
  };

  getCartProducts = async (cart_id) => {
    const cart = await this.getCartById(cart_id);
    if (!cart) {
      console.error(`There is no cart with id ${cart_id}`);
      return undefined;
    }
    return cart.products;
  };

  addProductToCart = async (cart_id, product_id) => {
    const allCarts = await this.getCarts();
    const filteredCart = allCarts.filter((elem) => elem.id == cart_id);
    if (filteredCart.length == 0) {
      console.error(`No cart with id ${cart_id}`);
      return undefined;
    }
    const cart = filteredCart[0];
    const product = await products.getProductById(product_id);
    if (!product) {
      console.error(`There is no product with id ${product_id}`);
      return undefined;
    }
    const cart_products = cart.products;
    const intProductId = parseInt(product_id);
    const filteredCartProducts = cart_products.filter(
      (elem) => elem.product_id == intProductId
    );
    let cartProduct;
    if (filteredCartProducts.length > 0) {
      //El producto ya estaba en el carrito
      filteredCartProducts[0].quantity++;
      cartProduct = filteredCartProducts[0];
    } else {
      //El producto no estaba en el carrito
      cartProduct = { product_id: intProductId, quantity: 1 };
      cart_products.push(cartProduct);
    }

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(allCarts, null, 2)
    );

    return cartProduct;
  };
}

module.exports = CartManager;
