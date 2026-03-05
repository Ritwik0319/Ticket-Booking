import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import BusList from "./pages/BusList";
import BusSeatSelection from "./pages/BusSeatSelection";
import MyBookings from "./pages/MyBookings";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AddBus from "./pages/AddBus";
import AdminBusView from "./pages/AdminBusView";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<BusList />} />
            <Route path="/bus/:id" element={<BusSeatSelection />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-bus" element={<AddBus />} />
            <Route path="/admin/bus/:id" element={<AdminBusView />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
