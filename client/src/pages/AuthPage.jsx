import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "react-hot-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
        toast.success("Welcome back!");
      } else {
        await signup(form.name, form.email, form.password);
        toast.success("Account created! Please log in.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
        return;
      }
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {isLogin ? "Log in to your account" : "Sign up to get started"}
        </p>

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-900"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-900"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Log in" : "Sign up"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({ name: "", email: "", password: "" });
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;