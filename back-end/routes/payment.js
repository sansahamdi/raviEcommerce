const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middlewares/authMiddleware");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;
