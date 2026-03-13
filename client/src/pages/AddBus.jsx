import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateBus } from "../hooks/useAdmin";
import toast from "react-hot-toast";
import { Bus, Hash, Grid3X3, ArrowLeft } from "lucide-react";

const AddBus = () => {
  const [busName, setBusName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [totalSeats, setTotalSeats] = useState(40);
  const navigate = useNavigate();

  const mutation = useCreateBus();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(
      { busName, busNumber, totalSeats },
      {
        onSuccess: () => {
          toast.success("Bus created successfully");
          navigate("/admin/dashboard");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to create bus");
        },
      },
    );
  };
  

  return (
    <div className="max-container px-4 py-8 max-w-2xl">
      <Link
        to="/admin/dashboard"
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors font-semibold"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-8">
          Add New Bus Route
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
              <Bus size={16} /> Bus Name
            </label>
            <input
              type="text"
              placeholder="e.g. Blue Line Express"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
              <Hash size={16} /> Bus Number
            </label>
            <input
              type="text"
              placeholder="e.g. MH-12-AB-1234"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
              <Grid3X3 size={16} /> Total Seats
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all"
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              min="10"
              max="60"
              required
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-70 mt-4"
          >
            {mutation.isPending ? "Saving Route..." : "Create Bus Route"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBus;
