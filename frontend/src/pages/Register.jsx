import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import { ArrowLeft, UserPlus } from "lucide-react";

function Register() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
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
  await register(formData);

  navigate("/login");
} catch (err) {
  console.error(err);
  setError("Unable to create account. Please try again.");
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

    {/* Register Card */}

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8"
    >

      {/* Icon */}

      <div className="flex justify-center mb-6">

        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
          <UserPlus
            size={24}
            className="text-teal-600"
          />
        </div>

      </div>

      <h1 className="text-3xl font-bold text-center text-slate-800">
        Create Your Account
      </h1>

      <p className="text-center text-slate-500 mt-2">
        Start managing your money with PennyPilot
      </p>

      {/* Error */}

      {error && (
        <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-100">
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        </div>
      )}

      {/* Name */}

      <div className="mt-7">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
          required
        />

      </div>

      {/* Email */}

      <div className="mt-5">

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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
          required
        />

      </div>

      {/* Register Button */}

      <button
        type="submit"
        className="mt-7 w-full py-3.5 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
      >
        Create Account
      </button>

      {/* Login */}

      <p className="mt-6 text-center text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-teal-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>

    </form>

  </div>

</div>

);
}

export default Register;
