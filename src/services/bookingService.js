const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_URL } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors/index");
const axios = require("axios");
class BookingSerivce {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async create(data) {
    try {
      const getFlightRequest = `http://${FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}`;
      const response = await axios.get(getFlightRequest);
      const flight = response.data.data;
      if (data.noOfSeats > flight.NumberOfSeats) {
        throw new ServiceError(
          "Something went wrong while booking Process",
          "Insufficient Seats in airplane"
        );
      }

      const totalCost = flight.price * data.noOfSeats;
      const newData = { ...data, totalCost };

      const booking = await this.bookingRepository.create(newData);
      const updateFlightRequest = `http://${FLIGHT_SERVICE_URL}/api/v1/flights/${booking.flightId}`;
      const response1 = await axios.patch(updateFlightRequest, {
        NumberOfSeats: flight.NumberOfSeats - booking.noOfSeats,
      });
      const updateResult = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return updateResult;
    } catch (error) {
      if (error.name == "ValidationError" || error.name == "ServiceError")
        throw error;
      else throw new ServiceError();
    }
  }
}
module.exports = BookingSerivce;
