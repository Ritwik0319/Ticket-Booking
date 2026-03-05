import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/authService";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data);
      toast.success("Login successful");
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-900">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg active:scale-95 disabled:opacity-70"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
