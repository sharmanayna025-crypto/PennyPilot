import {
ShieldCheck,
TrendingUp,
Target,
WalletCards,
} from "lucide-react";

function About() {
const points = [
{
icon: WalletCards,
title: "One Place for Your Money",
description:
"Keep track of your income, expenses, budgets, and savings goals from one simple dashboard.",
},
{
icon: TrendingUp,
title: "Understand Your Spending",
description:
"Use analytics and visual insights to identify spending patterns and make better financial decisions.",
},
{
icon: Target,
title: "Work Toward Your Goals",
description:
"Set meaningful savings goals and monitor your progress as you move closer to achieving them.",
},
{
icon: ShieldCheck,
title: "Simple & Secure",
description:
"PennyPilot is designed to keep financial management straightforward while protecting your account.",
},
];

return ( <section
   id="about"
   className="py-24 px-8 bg-white"
 > <div className="max-w-6xl mx-auto">

    {/* Heading */}

    <div className="max-w-3xl mx-auto text-center mb-16">

      <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
        About PennyPilot
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-3">
        Your money deserves a better direction.
      </h2>

      <p className="text-lg text-slate-500 leading-relaxed mt-5">
        PennyPilot is a personal finance platform designed to make
        managing money simpler, clearer, and more intentional.
        Instead of keeping track of everything across different
        places, PennyPilot brings your financial journey together
        in one organized space.
      </p>

    </div>

    {/* Feature Grid */}

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

      {points.map((point) => {

        const Icon = point.icon;

        return (
          <div
            key={point.title}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >

            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">

              <Icon
                size={24}
                className="text-teal-600"
              />

            </div>

            <h3 className="text-lg font-bold text-slate-800 mt-6">
              {point.title}
            </h3>

            <p className="text-slate-500 leading-relaxed mt-3">
              {point.description}
            </p>

          </div>
        );

      })}

    </div>

  </div>
</section>

);
}

export default About;
