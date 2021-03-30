const { middleware } = require("yargs");
const Product = require("../models/Product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// @ Route    http://localhost:5000/api/v1/admin/product/new
// @ Desc     Create a new product
// @ Access   Private
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// @ Route     http://localhost:5000/api/v1/products
// @ Desc      Get all products
// @ Access    Public
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productsCount,
    products,
  });
});

// @ Route     http://localhost:5000/api/v1/product/:id
// @ Desc      Get a single product details
// @ Access    Public
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// @ Route     http://localhost:5000/api/v1/admin/product/:id
// @ Desc      Update a product
// @ Access    Private
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  // if (!product) {
  //   res.status(404).json({
  //     success: false,
  //     message: "Product not found",
  //   });
  // }

  if (!product) {
    next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// @ Route     http://localhost:5000/api/v1/admin/product/:id
// @ Desc      Delete product by id
// @ Access    Private
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // if (!product) {
  //   res.status(404).json({
  //     success: false,
  //     message: "Product not found",
  //   });
  // }

  if (!product) {
    next(new ErrorHandler("Product not found", 404));
  }

  product.remove();
  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});

// @ Route     http://localhost:5000/api/v1/review
// @ Desc      Creat new review
// @ Access    Private
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numofreviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// @ Route     http://localhost:5000/api/v1/review
// @ Desc      Get product reviews
// @ Access    Public
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// @ Route     http://localhost:5000/api/v1/review
// @ Desc      Delete product reviews
// @ Access    Public
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numofreviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numofreviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
