const { StatusCodes } = require("http-status-codes");
const { ValidationError, AppError } = require("../utils/errors/index");
const { Booking } = require("../models/index");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      console.log("Error in repository layer");
      if (error.name == "SequelizeValidationError")
        return new ValidationError(error);
      else
        return new AppError(
          "RepositoryError",
          "Cannot create booking",
          "There is some issue while creating booking",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
  }
  async update(bookingId, data) {
    try {
      const booking = await Booking.update(data, {
        where: {
          id: bookingId,
        },
      });
      return await Booking.findByPk(bookingId);
    } catch (error) {
      console.log("Error in repository layer");
      if (error.name == "SequelizeValidationError")
        return new ValidationError(error);
      else
        return new AppError(
          "RepositoryError",
          "Cannot create booking",
          "There is some issue while creating booking",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
  }
}

module.exports = BookingRepository;
