const Cart = require("../Model/cart");
const Product = require("../Model/product");
const OrderHistory = require("../Model/orders");
exports.getCart = (req, res) => {
  const userId = req.session.userId; //TODO: the logged in user id
  Cart.findOne({ userId: userId }).then((cart) => {
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(400).json({
        message: "Cart not found!",
      });
    }
  });
};

exports.postCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const productDetails = await Product.findById(productId);
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
        message: "Error occurred!",
      });
    });
};
exports.placeOrder = async (req, res) => {
  const { products } = req.body;
  const userId = req.session.userId;
  const order = await OrderHistory.findOne({ userId: userId });
  if (order) {
    const newOrder = order.products.concat(products);
    order.products = newOrder;
    Cart.findOneAndDelete({ userId: userId })
      .then((result) => {
        result.products = [];
        result.save();
        order.save();
        res.status(200).json({
          message: "Order placed successfully!",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error occurred!",
        });
      });
  } else {
    const order = new OrderHistory({
      userId: userId,
      products: products,
      isOrdered: true,
    });
    Cart.findOneAndDelete({
      userId: userId,
    })
      .then((response) => {
        order.save();
        res.status(200).json({
          message: "Order placed successfully!",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error occurred here!",
        });
      });
  }
};

exports.getOrderHistory = async (req, res) => {
  const userId = req.session.userId;
  const order = await OrderHistory.findOne({ userId: userId });
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400).json({
      message: "Order not found!",
    });
  }
};
