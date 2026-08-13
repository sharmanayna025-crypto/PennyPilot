import {
UserPlus,
Receipt,
BarChart3,
Target,
ArrowRight,
} from "lucide-react";

function HowItWorks() {
const steps = [
{
number: "01",
icon: UserPlus,
title: "Create Account",
description:
"Set up your PennyPilot account and start your financial journey.",
},
{
number: "02",
icon: Receipt,
title: "Track Expenses",
description:
"Record your income and expenses in one organized place.",
},
{
number: "03",
icon: BarChart3,
title: "Analyze Spending",
description:
"Get insights into your spending habits and financial patterns.",
},
{
number: "04",
icon: Target,
title: "Achieve Goals",
description:
"Reach your savings goals with better financial decisions.",
},
];

return ( <section
   id="how-it-works"
   className="py-24 px-8 bg-slate-50"
 > <div className="max-w-6xl mx-auto">

    {/* Heading */}

    <div className="text-center max-w-2xl mx-auto mb-16">

      <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
        Simple & organized
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-3">
        How PennyPilot Works
      </h2>

      <p className="text-slate-500 text-lg mt-5">
        Managing your money doesn't have to be complicated.
        PennyPilot keeps everything simple.
      </p>

    </div>

    {/* Steps */}

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {steps.map((step, index) => {

        const Icon = step.icon;

        return (
          <div
            key={step.number}
            className="relative"
          >

            {/* Connector */}

            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-60px)] border-t-2 border-dashed border-slate-200" />
            )}

            <div className="relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">

              {/* Number */}

              <div className="flex items-center justify-between">

                <span className="text-4xl font-bold text-slate-100">
                  {step.number}
                </span>

                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">

                  <Icon
                    size={24}
                    className="text-teal-600"
                  />

                </div>

              </div>

              <h3 className="text-xl font-bold text-slate-800 mt-6">
                {step.title}
              </h3>

              <p className="text-slate-500 leading-relaxed mt-3">
                {step.description}
              </p>

            </div>

          </div>
        );

      })}

    </div>

    {/* Bottom Message */}

    <div className="flex items-center justify-center gap-2 mt-12 text-teal-600 font-semibold">

      <span>
        Start small. Track consistently. Grow financially.
      </span>

      <ArrowRight size={18} />

    </div>

  </div>
</section>

);
}

export default HowItWorks;
