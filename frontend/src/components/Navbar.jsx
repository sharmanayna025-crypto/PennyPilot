import { Link } from "react-router-dom";

function Navbar() {
return ( <nav className="w-full px-8 py-5 flex items-center justify-between bg-white border-b border-slate-100 sticky top-0 z-50">

  {/* Logo */}

  <Link
    to="/"
    className="text-2xl font-bold text-teal-700"
  >
    PennyPilot
  </Link>

  {/* Navigation Links */}

  <div className="hidden md:flex items-center gap-8 text-slate-600">

    <a
      href="#features"
      className="hover:text-teal-600 transition"
    >
      Features
    </a>

    <a
      href="#how-it-works"
      className="hover:text-teal-600 transition"
    >
      How It Works
    </a>

    <a
      href="#about"
      className="hover:text-teal-600 transition"
    >
      About
    </a>

  </div>

  {/* CTA */}

  <Link
    to="/login"
    className="px-5 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
  >
    Start Your Journey
  </Link>

</nav>

);
}

export default Navbar;
