import React from 'react';
import { CreditCard, UserX, Globe } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: CreditCard,
      title: 'Kadi zinapotea',
      description: 'Business cards get lost or thrown away before clients contact you'
    },
    {
      icon: UserX,
      title: 'Mawasiliano yanasahaulika',
      description: 'Clients forget to save your contact details and lose touch'
    },
    {
      icon: Globe,
      title: 'Hakuna online presence',
      description: 'No professional website to showcase your business credibility'
    }
  ];

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#ECF0F1]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C3E50] mb-4">
            Je, Unakutana na Matatizo Haya?
          </h2>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div 
                key={index}
                className="bg-[#F8F9FA] rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#ECF0F1] to-[#D5DBDB] rounded-2xl mb-6">
                  <Icon className="w-10 h-10 text-[#7F8C8D]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                  {problem.title}
                </h3>
                <p className="text-[#7F8C8D] leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;