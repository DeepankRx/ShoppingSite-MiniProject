const Product = require("../Model/product");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../frontend/src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
}).single("image");

exports.postAddProduct = async (req, res, next) => {
  //upload image
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(req.file);
    const title = req.body.title;
    const imageUrl = req.file.filename;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const product = new Product({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
      category: category,
    });
    product
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Product added successfully!",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Product adding failed!",
        });
      });
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
