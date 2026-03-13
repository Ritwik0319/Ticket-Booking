import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBus, useBookTicket, useHoldSeats } from "../hooks/useBookings";
import toast from "react-hot-toast";
import { Check, Info } from "lucide-react";

const BusSeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({});

  const { data: bus, isLoading } = useBus(id);

  const mutation = useBookTicket();

  const holdMutation = useHoldSeats();

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;

    if (selectedSeats.find((s) => s.seatNumber === seat.seatNumber)) {
      setSelectedSeats(
        selectedSeats.filter((s) => s.seatNumber !== seat.seatNumber),
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      holdMutation.mutate(
        {
          busId: id,
          seatNumbers: [seat.seatNumber],
        },
        {
          onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to hold seat");
          },
        },
      );
    }
  };

  const handlePassengerChange = (seatNumber, field, value) => {
    setPassengerDetails({
      ...passengerDetails,
      [seatNumber]: {
        ...passengerDetails[seatNumber],
        [field]: value,
      },
    });
  };

  const handleBooking = () => {
    const seatsToBook = selectedSeats.map((seat) => ({
      seatNumber: seat.seatNumber,
      passengerName: passengerDetails[seat.seatNumber]?.name || "",
      passengerAge: parseInt(passengerDetails[seat.seatNumber]?.age || 0),
    }));

    if (seatsToBook.some((s) => !s.passengerName || !s.passengerAge)) {
      toast.error("Please enter details for all selected seats");
      return;
    }

    mutation.mutate(
      {
        busId: id,
        seats: seatsToBook,
      },
      {
        onSuccess: () => {
          toast.success("Tickets booked successfully!");
          navigate("/my-bookings");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Booking failed");
        },
      },
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-container px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Seat Grid */}
        <div className="lg:w-2/3 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {bus.busName} - Seat Selection
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-xs text-slate-600">Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-xs text-slate-600">Booked</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span className="text-xs text-slate-600">Selected</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 shadow-inner">
            {bus.seats.map((seat) => {
              const isSelected = selectedSeats.find(
                (s) => s.seatNumber === seat.seatNumber,
              );
              return (
                <button
                  key={seat.seatNumber}
                  onClick={() => toggleSeat(seat)}
                  disabled={seat.isBooked}
                  className={`
                    flex items-center justify-center h-12 rounded-lg font-bold transition-all
                    ${
                      seat.isBooked
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : isSelected
                          ? "bg-yellow-400 text-slate-900 scale-110 shadow-md ring-2 ring-yellow-500"
                          : "bg-green-500 text-white hover:bg-green-600 active:scale-90 shadow"
                    }
                  `}
                >
                  {seat.seatNumber}
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <Info className="text-blue-600 shrink-0" size={20} />
            <p className="text-sm text-blue-800 leading-relaxed">
              Standard 2x2 layout. Seats are numbered sequentially. Yellow
              highlights indicate your current selection.
            </p>
          </div>
        </div>

        {/* Right: Passenger Details */}
        <div className="lg:w-1/3 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-4">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Check className="text-blue-600" />
              Booking Details
            </h3>

            {selectedSeats.length === 0 ? (
              <p className="text-slate-500 italic text-center py-8">
                No seats selected yet.
              </p>
            ) : (
              <div className="space-y-6">
                {selectedSeats.map((seat) => (
                  <div
                    key={seat.seatNumber}
                    className="p-4 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <h4 className="font-bold text-slate-800 mb-3">
                      Seat {seat.seatNumber}
                    </h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Passenger Name"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500 outline-none"
                        value={passengerDetails[seat.seatNumber]?.name || ""}
                        onChange={(e) =>
                          handlePassengerChange(
                            seat.seatNumber,
                            "name",
                            e.target.value,
                          )
                        }
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500 outline-none"
                        value={passengerDetails[seat.seatNumber]?.age || ""}
                        onChange={(e) =>
                          handlePassengerChange(
                            seat.seatNumber,
                            "age",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-600">Total Price</span>
                    <span className="text-2xl font-black text-slate-900">
                      ₹{selectedSeats.length * 500}
                    </span>
                  </div>
                  <button
                    onClick={handleBooking}
                    disabled={mutation.isPending}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all disabled:opacity-70"
                  >
                    {mutation.isPending ? "Processing..." : "Confirm Order"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSeatSelection;
