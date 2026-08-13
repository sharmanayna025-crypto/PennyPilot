import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { ArrowLeft, LockKeyhole } from "lucide-react";

function Login() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [error, setError] = useState("");

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();
setError("");

try {
  const response = await login(formData);

  localStorage.setItem("token", response.data.token);

  navigate("/dashboard");
} catch (err) {
  console.error(err);
  setError("Invalid email or password");
}

};

return ( <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">

  <div className="w-full max-w-md">

    {/* Back to Home */}

    <Link
      to="/"
      className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition mb-6"
    >
      <ArrowLeft size={18} />
      Back to PennyPilot
    </Link>

    {/* Login Card */}

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8"
    >

      {/* Logo */}

      <div className="flex justify-center mb-6">

        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
          <LockKeyhole
            size={24}
            className="text-teal-600"
          />
        </div>

      </div>

      <h1 className="text-3xl font-bold text-center text-slate-800">
        Welcome Back
      </h1>

      <p className="text-center text-slate-500 mt-2">
        Login to your PennyPilot account
      </p>

      {/* Error */}

      {error && (
        <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-100">
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        </div>
      )}

      {/* Email */}

      <div className="mt-7">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>

        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
          required
        />

      </div>

      {/* Password */}

      <div className="mt-5">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
          required
        />

      </div>

      {/* Login Button */}

      <button
        type="submit"
        className="mt-7 w-full py-3.5 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
      >
        Login
      </button>

      {/* Register */}

      <p className="mt-6 text-center text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-teal-600 font-semibold hover:underline"
        >
          Create one
        </Link>
      </p>

    </form>

  </div>

</div>

);
}

export default Login;
