const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
} = require("../controllers/productControllers");

const { isAuthenticatedUser } = require("../middlewares/authMiddleware");

router.route("/products").get(getProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser, deleteProduct);
router
  .route("/review")
  .put(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getProductReviews)
  .delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
