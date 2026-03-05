import Bus from "../models/Bus.js";

// @desc    Create a new bus
// @route   POST /api/admin/bus
// @access  Private/Admin
const createBus = async (req, res) => {
  const { busName, busNumber, totalSeats } = req.body;

  const busExists = await Bus.findOne({ busNumber });

  if (busExists) {
    return res.status(400).json({ message: "Bus already exists" });
  }

  // Create seats dynamically
  const seats = [];
  
  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      seatNumber: i.toString(),
      isBooked: false,
    });
  }

  const bus = await Bus.create({
    busName,
    busNumber,
    totalSeats,
    seats,
  });

  if (bus) {
    res.status(201).json(bus);
  } else {
    res.status(400).json({ message: "Invalid bus data" });
  }
};

// @desc    Get all buses
// @route   GET /api/admin/bus
// @access  Private/Admin
const getBuses = async (req, res) => {
  const buses = await Bus.find({});
  res.json(buses);
};

// @desc    Get bus by ID
// @route   GET /api/admin/bus/:id
// @access  Private/Admin
const getBusById = async (req, res) => {
  const bus = await Bus.findById(req.params.id);

  if (bus) {
    res.json(bus);
  } else {
    res.status(404).json({ message: "Bus not found" });
  }
};

export { createBus, getBuses, getBusById };
