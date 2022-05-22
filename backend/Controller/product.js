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

// exports.postAddProduct = (req, res, next) => {
//   const product = new Product(req.body.title);
//   product.save();
//   res.redirect("/");
// };

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.json(err);
    });
};
