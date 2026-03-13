import { useAdminBuses } from "../hooks/useAdmin";
import { Link } from "react-router-dom";
import { Plus, Users, Bus, Eye } from "lucide-react";

const AdminDashboard = () => {
  const { data: buses, isLoading } = useAdminBuses();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  const totalBookings = buses?.reduce(
    (acc, bus) => acc + bus.seats.filter((s) => s.isBooked).length,
    0,
  );

  return (
    <div className="max-container px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-slate-900">
          Admin Command Center
        </h1>
        <Link
          to="/admin/add-bus"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>Add New Bus</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
          <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Bus className="text-blue-600" />
          </div>
          <p className="text-slate-500 font-bold text-sm uppercase">
            Total Buses
          </p>
          <p className="text-4xl font-black text-slate-900">
            {buses?.length || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
          <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Users className="text-green-600" />
          </div>
          <p className="text-slate-500 font-bold text-sm uppercase">
            Total Bookings
          </p>
          <p className="text-4xl font-black text-slate-900">
            {totalBookings || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
          <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Eye className="text-purple-600" />
          </div>
          <p className="text-slate-500 font-bold text-sm uppercase">
            Quick Access
          </p>
          <p className="text-lg font-bold text-slate-900 mt-2">
            Manage all routes
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">Bus Management</h2>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase">
                Bus Name
              </th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase">
                Number
              </th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase">
                Total Seats
              </th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase">
                Booked
              </th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {buses?.map((bus) => (
              <tr
                key={bus._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-800">
                  {bus.busName}
                </td>
                <td className="px-6 py-4 text-slate-600">{bus.busNumber}</td>
                <td className="px-6 py-4 text-slate-600">{bus.totalSeats}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    {bus.seats.filter((s) => s.isBooked).length} Booked
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/admin/bus/${bus._id}`}
                    className="inline-flex items-center gap-1 text-blue-600 font-bold hover:text-blue-800"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
