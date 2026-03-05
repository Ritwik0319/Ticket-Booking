import Bus from "../models/Bus.js";

// @desc    Get all available buses
// @route   GET /api/bookings/buses
// @access  Private
const getAvailableBuses = async (req, res) => {
  const buses = await Bus.find({});
  res.json(buses);
};

// @desc    Book seats
// @route   POST /api/bookings
// @access  Private
const bookSeats = async (req, res) => {
  const { busId, seats } = req.body;

  const bus = await Bus.findById(busId);

  if (!bus) {
    return res.status(404).json({ message: "Bus not found" });
  }

  const seatNumbersToBook = seats.map((s) => s.seatNumber);

  // Check if all seats are available
  const unavailableSeats = [];
  bus.seats.forEach((seat) => {
    if (seatNumbersToBook.includes(seat.seatNumber)) {
      if (seat.isBooked) {
        unavailableSeats.push(seat.seatNumber);
      } else if (
        seat.holdUntil &&
        seat.holdUntil > new Date() &&
        seat.bookedBy.toString() !== req.user._id.toString()
      ) {
        unavailableSeats.push(`${seat.seatNumber} (On hold)`);
      }
    }
  });

  if (unavailableSeats.length > 0) {
    return res.status(400).json({
      message: `Seats ${unavailableSeats.join(", ")} are already booked`,
    });
  }

  // Mark seats as booked
  bus.seats.forEach((seat) => {
    const bookingInfo = seats.find((s) => s.seatNumber === seat.seatNumber);
    if (bookingInfo) {
      seat.isBooked = true;
      seat.passengerName = bookingInfo.passengerName;
      seat.passengerAge = bookingInfo.passengerAge;
      seat.bookedBy = req.user._id;
    }
  });

  await bus.save();

  res.status(201).json({ message: "Booking successful", bus });
};

// @desc    Get user's booking history
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  const buses = await Bus.find({ "seats.bookedBy": req.user._id });

  const myBookings = [];
  buses.forEach((bus) => {
    bus.seats.forEach((seat) => {
      if (
        seat.bookedBy &&
        seat.bookedBy.toString() === req.user._id.toString()
      ) {
        myBookings.push({
          busName: bus.busName,
          busNumber: bus.busNumber,
          seatNumber: seat.seatNumber,
          passengerName: seat.passengerName,
          passengerAge: seat.passengerAge,
          bookedAt: bus.updatedAt,
        });
      }
    });
  });

  res.json(myBookings);
};

// @desc    Hold seats
// @route   POST /api/bookings/hold
// @access  Private
const holdSeats = async (req, res) => {
  const { busId, seatNumbers } = req.body;
  const bus = await Bus.findById(busId);

  if (!bus) return res.status(404).json({ message: "Bus not found" });

  const holdDuration = 2 * 60 * 1000; // 2 minutes
  const holdUntil = new Date(Date.now() + holdDuration);

  bus.seats.forEach((seat) => {
    if (seatNumbers.includes(seat.seatNumber)) {
      if (!seat.isBooked) {
        seat.holdUntil = holdUntil;
        seat.bookedBy = req.user._id;
      }
    }
  });

  await bus.save();
  res.json({ message: "Seats held", holdUntil });
};

// @desc    Get bus by ID for booking
// @route   GET /api/bookings/bus/:id
// @access  Private
const getBusById = async (req, res) => {
  const bus = await Bus.findById(req.params.id);

  if (bus) {
    // We could filter out details of other passengers here if needed
    res.json(bus);
  } else {
    res.status(404).json({ message: "Bus not found" });
  }
};

export { getAvailableBuses, bookSeats, getMyBookings, holdSeats, getBusById };
