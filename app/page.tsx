import Link from 'next/link';
import { BarChart3, Sword, ArrowRight } from 'lucide-react';

export default function Home() {
  const apps = [
    {
      name: 'Charts',
      description: 'Create beautiful data visualizations',
      href: '/charts',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-600',
      hoverGradient: 'from-orange-600 to-red-700',
    },
    {
      name: 'DPS Comparator',
      description: 'Compare the damage output of different Blox Fruits builds',
      href: '/dps-comparator',
      icon: Sword,
      gradient: 'from-blue-600 to-indigo-700',
      hoverGradient: 'from-blue-700 to-indigo-800',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6">
            Choose Your App
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover our powerful suite of applications designed to enhance your
            productivity and creativity
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {apps.map(app => {
            const Icon = app.icon;
            return (
              <Link
                key={app.name}
                href={app.href}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Card Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${app.gradient} group-hover:bg-gradient-to-br group-hover:${app.hoverGradient} transition-all duration-300 mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {app.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    <span className="font-medium mr-2">Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
                />
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 dark:text-slate-400">
            Need help getting started?
            <a
              href="mailto:shovon2228@gmail.com"
              className="text-blue-600 dark:text-blue-400 font-medium ml-1 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
