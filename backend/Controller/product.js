const Product = require("../Model/product");

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log(req.body);
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    category: req.body.category,
  });
  product
    .save()
    .then(() => {
      res.json({
        message: "Product added successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getASingleProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({
          message: "Product not found!",
        });
      }
      console.log("Prod", product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  console.log("IsLoggedIn:", req.session.isLoggedIn);
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByIdAndDelete(prodId)
    .then((product) => {
      res.json("Product Deleted Successfully!");
    })
    .catch((err) => console.log(err));
};

exports.updateProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const updateOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  Product.updateOne({ _id: prodId }, { $set: updateOps })
    .then((product) => {
      res.json("Product Updated Successfully!");
    })
    .catch((err) => console.log(err));
};

exports.getProductByCategory = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  Product.find({ category: product.category })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};
