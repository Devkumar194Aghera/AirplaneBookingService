const express = require("express");
const bookingController = require("../../controllers/booking-contoller");

const BookingController = new bookingController();

const router = express.Router();

router.post("/booking", BookingController.create);
router.post("/publish", BookingController.sendMessageToQueue);

module.exports = router;
