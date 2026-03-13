import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useLogout } from "../hooks/useAuth";
import { Bus, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/login");
      },
      onError: () => {
        toast.error("Logout failed");
      },
    });
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-container flex justify-between items-center h-16 px-4">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <Bus className="text-blue-400" />
          <span>TicketBook</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              {user.role === "admin" ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/add-bus"
                    className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                  >
                    <Bus size={18} />
                    <span>Add Bus</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                  >
                    <Bus size={18} />
                    <span>Buses</span>
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                  >
                    <UserIcon size={18} />
                    <span>My Bookings</span>
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
