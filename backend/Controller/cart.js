const Cart = require("../Model/cart");
const Product = require("../Model/product");
exports.getCart = (req, res) => {
  const userId = req.session.userId //TODO: the logged in user id
  Cart.findOne({ userId: userId }).then((cart) => {
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({
        message: "Cart not found!",
      });
    }
  });
};

exports.postCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const productDetails = await Product.findById(productId);
  console.log("product", productDetails);
  const userId = req.session.userId;

  const cart = await Cart.findOne({ userId: userId });
  if (cart) {
    const product = cart.products.find(
      (product) => product.productId === productId
    );
    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({
        productId: productId,
        quantity: quantity,
        title: productDetails.title,
        price: productDetails.price,
        imageUrl: productDetails.imageUrl,
        description: productDetails.description,
      });
    }
    await cart.save();
  } else {
    const cart = new Cart({
      userId: userId,
      products: [
        {
          productId: productId,
          quantity: quantity,
          title: productDetails.title,
          description: productDetails.description,
          price: productDetails.price,
          imageUrl: productDetails.imageUrl,
        },
      ],
    });
    await cart.save();
  }
  res.status(200).json({
    message: "Product added to cart successfully!",
  });
};

exports.deleteFromCart = (req, res) => {
  //delete a field from cart
  const productId = req.body.productId;
  const userId = req.session.userId; //TODO: the logged in user id
  Cart.findOne({ userId: userId })
    .then((cart) => {
      const product = cart.products.find(
        (product) => product.productId === productId
      );
      if (product) {
        cart.products.pull(product);
        cart.save();
      }
    })
    .then((result) => {
      res.status(200).json({
        message: "Product deleted from cart successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error occured!",
      });
    });
};

exports.getCartProducts = (req, res) => {
  //get cart items by populating userId
  Cart.findOne({ userId: "5de7ffa74fff640a0491bc4f" })
    .populate("userId", "name")
    .then((cart) => {
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({
          message: "Cart not found!",
        });
      }
    });
};
