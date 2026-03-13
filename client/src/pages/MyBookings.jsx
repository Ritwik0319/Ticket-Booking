import { useMyBookings } from "../hooks/useBookings";
import { Calendar, Ticket, User } from "lucide-react";

const MyBookings = () => {
  const { data: bookings, isLoading } = useMyBookings();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">
        My Booking History
      </h1>
      {bookings?.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-md text-center border border-slate-100">
          <p className="text-slate-500 text-lg">
            You haven't booked any tickets yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings?.map((booking, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex"
            >
              <div className="bg-blue-600 w-2 flex-shrink-0"></div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {booking.busName}
                    </h3>
                    <p className="text-blue-600 font-bold">
                      {booking.busNumber}
                    </p>
                  </div>
                  <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(booking.bookedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Ticket className="text-slate-600" size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        Seat Number
                      </p>
                      <p className="font-bold text-slate-800">
                        {booking.seatNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <User className="text-slate-600" size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        Passenger
                      </p>
                      <p className="font-bold text-slate-800">
                        {booking.passengerName} ({booking.passengerAge})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
