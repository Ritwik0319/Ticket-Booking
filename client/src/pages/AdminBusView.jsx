import { useParams, Link } from "react-router-dom";
import { useAdminBus } from "../hooks/useAdmin";
import { ArrowLeft, User, Info, Calendar } from "lucide-react";

const AdminBusView = () => {
  const { id } = useParams();

  const { data: bus, isLoading } = useAdminBus(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-container px-4 py-8">
      <Link
        to="/admin/dashboard"
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors font-semibold"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900">
              {bus.busName}
            </h1>
            <p className="text-blue-600 font-bold text-lg">{bus.busNumber}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-50 px-4 py-2 rounded-xl text-center border border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400">
                Total Seats
              </p>
              <p className="text-xl font-black text-slate-800">
                {bus.totalSeats}
              </p>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-xl text-center border border-green-100">
              <p className="text-[10px] font-black uppercase text-green-400">
                Booked
              </p>
              <p className="text-xl font-black text-green-700">
                {bus.seats.filter((s) => s.isBooked).length}
              </p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-xl text-center border border-blue-100">
              <p className="text-[10px] font-black uppercase text-blue-400">
                Available
              </p>
              <p className="text-xl font-black text-blue-700">
                {bus.totalSeats - bus.seats.filter((s) => s.isBooked).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Seat Map */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-8">
            Seat Occupation Map
          </h3>
          <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 shadow-inner">
            {bus.seats.map((seat) => (
              <div
                key={seat.seatNumber}
                className={`
                  flex items-center justify-center h-12 rounded-lg font-bold text-sm
                  ${seat.isBooked ? "bg-red-500 text-white shadow-md" : "bg-green-500 text-white opacity-40"}
                `}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Details List */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <Calendar className="text-blue-600" />
            Passenger List
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {bus.seats.filter((s) => s.isBooked).length === 0 ? (
              <p className="text-center text-slate-400 py-10 font-bold italic">
                No bookings yet for this route.
              </p>
            ) : (
              bus.seats
                .filter((s) => s.isBooked)
                .map((seat) => (
                  <div
                    key={seat.seatNumber}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="bg-slate-900 text-white w-10 h-10 rounded-lg flex items-center justify-center font-black">
                      {seat.seatNumber}
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-slate-800">
                        {seat.passengerName}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <User size={10} /> Age: {seat.passengerAge}
                      </p>
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-slate-400 border border-slate-100">
                      BOOKED
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBusView;
