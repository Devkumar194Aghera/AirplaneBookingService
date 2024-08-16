const { BookingSerivce } = require("../services/index");

const bookingService = new BookingSerivce();

const {
  createChannel,
  subscribeMessage,
  publishMessage,
} = require("../utils/messageQueue");

const { REMINDER_BINDNIG_KEY } = require("../config/serverConfig");

class bookingController {
  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const data = { message: "SUCCESS" };
    publishMessage(channel, REMINDER_BINDNIG_KEY, JSON.stringify(data));
    return res.status(201).json({
      success: true,
      message: "Successfully publish the event",
      error: {},
    });
  }

  async create(req, res) {
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
  }
}
module.exports = bookingController;
