const { BookingSerivce } = require("../services/index");

const bookingService = new BookingSerivce();

const create = async (req, res) => {
  try {
    const data = req.body;
    const booking = await bookingService.create(data);
    return res.status(201).json({
      data: booking,
      success: true,
      message: "Successfully book the flight",
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      data: {},
      success: false,
      message: error.message,
      error: error.explanation,
    });
  }
};

module.exports = {
  create,
};
