import { useBuses } from "../hooks/useBookings";
import { Link } from "react-router-dom";
import { Bus, Clock, MapPin } from "lucide-react";

const BusList = () => {
  const { data: buses, isLoading, isError } = useBuses();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500 p-10">Error fetching buses</div>
    );

  return (
    <div className="max-container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">
        Available Buses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses?.map((bus) => (
          <div
            key={bus._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-slate-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Bus className="text-blue-600" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 px-2 py-1 rounded">
                  Express
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {bus.busName}
              </h3>
              <p className="text-slate-500 mb-4 flex items-center gap-1 text-sm">
                <span className="font-semibold">{bus.busNumber}</span> •{" "}
                {bus.totalSeats} Seats
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin size={16} />
                  <span className="text-sm">Main Terminal → City Center</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock size={16} />
                  <span className="text-sm">Daily Service</span>
                </div>
              </div>

              <Link
                to={`/bus/${bus._id}`}
                className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                Select Seats
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
