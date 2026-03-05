import mongoose from "mongoose";

const seatSchema = mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  passengerName: {
    type: String,
    default: "",
  },
  passengerAge: {
    type: Number,
    default: null,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  holdUntil: {
    type: Date,
    default: null,
  },
});

const busSchema = mongoose.Schema(
  {
    busName: {
      type: String,
      required: true,
    },
    busNumber: {
      type: String,
      required: true,
      unique: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    seats: [seatSchema],
  },
  {
    timestamps: true,
  },
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
