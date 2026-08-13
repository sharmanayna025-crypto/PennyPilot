import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

function CTA() {
return ( <section className="py-24 px-8 bg-teal-600">


  <div className="max-w-4xl mx-auto text-center">

    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-teal-50 text-sm font-medium mb-6">
      <Sparkles size={16} />
      Your financial journey starts here
    </div>

    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
      Ready to take control of your money?
    </h2>

    <p className="mt-5 text-lg text-teal-50 max-w-2xl mx-auto leading-relaxed">
      Start your financial journey today with PennyPilot.
      Track your spending, build better habits, and work
      toward your financial goals.
    </p>

    <div className="mt-8">

      <Link
        to="/login"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-teal-700 font-semibold text-lg hover:bg-slate-100 transition shadow-sm"
      >
        Start Your Journey
        <ArrowRight size={20} />
      </Link>

    </div>

    <p className="text-teal-100 text-sm mt-5">
      Because every penny matters.
    </p>

  </div>

</section>

);
}

export default CTA;
