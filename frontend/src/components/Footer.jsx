function Footer() {
return ( <footer className="bg-slate-900 text-white">

  <div className="max-w-6xl mx-auto px-8 py-16">

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Brand */}

      <div className="lg:col-span-2">

        <h2 className="text-2xl font-bold text-teal-400">
          PennyPilot
        </h2>

        <p className="mt-4 text-slate-400 max-w-md leading-relaxed">
          A simple and smarter way to track your money,
          manage your budget, and work toward your financial goals.
        </p>

        <p className="mt-5 text-teal-400 font-medium">
          Because every penny matters.
        </p>

      </div>

      {/* Product */}

      <div>

        <h3 className="font-semibold text-white mb-5">
          Product
        </h3>

        <ul className="space-y-3 text-slate-400">

          <li>
            <a
              href="#features"
              className="hover:text-teal-400 transition"
            >
              Features
            </a>
          </li>

          <li>
            <a
              href="#how-it-works"
              className="hover:text-teal-400 transition"
            >
              How It Works
            </a>
          </li>

          <li>
            <a
              href="/dashboard"
              className="hover:text-teal-400 transition"
            >
              Dashboard
            </a>
          </li>

          <li>
            <a
              href="/analytics"
              className="hover:text-teal-400 transition"
            >
              Analytics
            </a>
          </li>

        </ul>

      </div>

      {/* Company */}

      <div>

        <h3 className="font-semibold text-white mb-5">
          Company
        </h3>

        <ul className="space-y-3 text-slate-400">

          <li>
            <a
              href="#about"
              className="hover:text-teal-400 transition"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-teal-400 transition"
            >
              Contact
            </a>
          </li>

          <li>
            <a
              href="#privacy"
              className="hover:text-teal-400 transition"
            >
              Privacy
            </a>
          </li>

        </ul>

      </div>

    </div>

    {/* Divider */}

    <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

      <p className="text-sm text-slate-500">
        © 2026 PennyPilot-NS. All rights reserved.
      </p>

      <p className="text-sm text-slate-500">
        Built with React & Spring Boot
      </p>

    </div>

  </div>

</footer>


);
}

export default Footer;
