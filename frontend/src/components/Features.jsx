import {
Wallet,
BarChart3,
PiggyBank,
Target,
} from "lucide-react";

function Features() {
const features = [
{
icon: Wallet,
title: "Track Your Money",
description:
"Monitor your income and expenses in one organized place, so you always know where your money goes.",
},
{
icon: BarChart3,
title: "Smart Insights",
description:
"Understand your spending habits with clear analytics and visual reports that make your finances easier to understand.",
},
{
icon: PiggyBank,
title: "Set Budgets",
description:
"Create spending limits for different categories and keep your expenses under control.",
},
{
icon: Target,
title: "Financial Goals",
description:
"Set savings targets, track your progress, and stay motivated as you work toward your financial goals.",
},
];

return ( <section
   id="features"
   className="py-24 px-8 bg-white"
 > <div className="max-w-6xl mx-auto">

    <div className="text-center max-w-2xl mx-auto mb-14">

      <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
        Everything in one place
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-3">
        Everything You Need To Manage Money
      </h2>

      <p className="text-slate-500 mt-5 text-lg">
        PennyPilot gives you the tools you need to understand,
        organize, and improve your financial habits.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

      {features.map((feature) => {

        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="group bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >

            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-600 transition">

              <Icon
                size={24}
                className="text-teal-600 group-hover:text-white transition"
              />

            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-6">
              {feature.title}
            </h3>

            <p className="text-slate-500 leading-relaxed mt-3">
              {feature.description}
            </p>

          </div>
        );

      })}

    </div>

  </div>
</section>

);
}

export default Features;
