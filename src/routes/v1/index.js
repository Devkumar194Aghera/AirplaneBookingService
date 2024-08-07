const express = require("express");
const bookingController = require("../../controllers/booking-contoller");
const router = express.Router();

router.post("/booking", bookingController.create);

module.exports = router;
