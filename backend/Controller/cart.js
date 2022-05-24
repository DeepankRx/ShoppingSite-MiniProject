const Cart = require("../Model/cart");
exports.getCart = (req, res) => {
  const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
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

  const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id

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
        },
      ],
    });
    await cart.save();
  }
  res.status(200).json({
    message: "Product added to cart successfully!",
  });
};
