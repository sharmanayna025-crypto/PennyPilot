import { Link } from "react-router-dom";
import {
ArrowRight,
ShieldCheck,
TrendingUp,
Wallet,
} from "lucide-react";

function Hero() {
return ( <section className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center px-8 py-20">

  <div className="max-w-6xl mx-auto w-full">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Content */}

      <div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6">
          <ShieldCheck size={16} />
          Smarter money management
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
          Because Every{" "}
          <span className="text-teal-600">
            Penny
          </span>{" "}
          Matters.
        </h1>

        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
          Take control of your finances with smarter
          tracking, budgeting, spending insights, and
          financial goals — all in one place.
        </p>

        <div className="mt-8">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-teal-600 text-white text-lg font-semibold hover:bg-teal-700 transition shadow-sm"
          >
            Start Your Journey
            <ArrowRight size={20} />
          </Link>

        </div>

        <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <Wallet
              size={18}
              className="text-teal-600"
            />
            Track expenses
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp
              size={18}
              className="text-teal-600"
            />
            Build better habits
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck
              size={18}
              className="text-teal-600"
            />
            Stay organized
          </div>

        </div>

      </div>

      {/* Right Visual */}

      <div className="relative">

        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-60" />

        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60" />

        <div className="relative bg-slate-900 rounded-3xl p-6 shadow-2xl">

          {/* Mock Dashboard */}

          <div className="flex items-center justify-between mb-6">

            <div>
              <p className="text-slate-400 text-sm">
                Total Balance
              </p>

              <p className="text-white text-3xl font-bold mt-1">
                ₹84,250
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center">
              <Wallet
                size={22}
                className="text-white"
              />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">

            <div className="bg-slate-800 rounded-xl p-4">

              <p className="text-slate-400 text-xs">
                Income
              </p>

              <p className="text-green-400 font-bold text-xl mt-1">
                ₹1,20,000
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-4">

              <p className="text-slate-400 text-xs">
                Expenses
              </p>

              <p className="text-red-400 font-bold text-xl mt-1">
                ₹35,750
              </p>

            </div>

          </div>

          {/* Progress */}

          <div className="bg-slate-800 rounded-xl p-5">

            <div className="flex justify-between mb-3">

              <p className="text-white text-sm font-medium">
                Monthly Budget
              </p>

              <p className="text-teal-400 text-sm font-semibold">
                72%
              </p>

            </div>

            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

              <div
                className="h-full bg-teal-500 rounded-full"
                style={{ width: "72%" }}
              />

            </div>

            <p className="text-slate-400 text-xs mt-3">
              ₹14,000 remaining this month
            </p>

          </div>

          {/* Mini Transactions */}

          <div className="mt-5 space-y-3">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Wallet
                    size={17}
                    className="text-red-400"
                  />
                </div>

                <div>
                  <p className="text-white text-sm">
                    Groceries
                  </p>

                  <p className="text-slate-500 text-xs">
                    Food
                  </p>
                </div>

              </div>

              <p className="text-red-400 text-sm font-semibold">
                - ₹2,450
              </p>

            </div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp
                    size={17}
                    className="text-green-400"
                  />
                </div>

                <div>
                  <p className="text-white text-sm">
                    Salary
                  </p>

                  <p className="text-slate-500 text-xs">
                    Income
                  </p>
                </div>

              </div>

              <p className="text-green-400 text-sm font-semibold">
                + ₹60,000
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

);
}

export default Hero;
