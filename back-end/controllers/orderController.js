const Order = require("../models/Order");
const Product = require("../models/Product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// @ Route      http://localhost:5000/api/v1/order/new
// @ Desc       Create a new order
// @ Access     Private
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// @ Route      http://localhost:5000/api/v1/order/:id
// @ Desc       Get a single order
// @ Access     Private
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order Found With This ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// @ Route      http://localhost:5000/api/v1/orders/me
// @ Desc       Get logged in user orders
// @ Access     Private
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// @ Route      http://localhost:5000/api/v1/admin/orders
// @ Desc       Get all orders
// @ Access     Private
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// @ Route      http://localhost:5000/api/v1/admin/order/:id
// @ Desc       Update / Process order - ADMIN
// @ Access     Private
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  (order.orderStatus = req.body.status), (order.delieveredAt = Date.now());

  order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// @ Route      http://localhost:5000/api/v1/admin/order/:id
// @ Desc       Delete order
// @ Access     Private
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order Found With This ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    order,
  });
});
