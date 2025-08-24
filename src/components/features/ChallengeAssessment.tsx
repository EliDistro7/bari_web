// components/sections/ChallengeAssessment.jsx
'use client';

import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const ChallengeAssessment = () => {
  const [assessment, setAssessment] = useState<{ [key: string]: boolean }>({});

  const challenges = [
    { id: 'manual', label: 'Manual processes taking too much time', solutions: ['automation', 'custom-software'] },
    { id: 'communication', label: 'Poor customer/member communication', solutions: ['web-portal', 'mobile-app'] },
    { id: 'data', label: 'Inefficient data management', solutions: ['database-optimization', 'dashboard'] },
    { id: 'online', label: 'Lack of online presence', solutions: ['website', 'e-commerce'] }
  ];

  const handleAssessmentChange = (challengeId:string, checked:boolean) => {
    if (checked) {
      setAssessment({...assessment, [challengeId]: true});
    } else {
      const newAssessment = {...assessment};
      delete newAssessment[challengeId];
      setAssessment(newAssessment);
    }
  };

  return (
    <section id="assessment" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            What's Your Biggest Business Challenge?
          </h2>
          <p className="text-xl text-gray-600">
            Get personalized solution recommendations based on your specific needs
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl border border-gray-200">
          <div className="space-y-4 mb-8">
            {challenges.map((challenge) => (
              <label key={challenge.id} className="flex items-center p-4 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors border border-gray-200 hover:border-blue-300">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded mr-4"
                  onChange={(e) => handleAssessmentChange(challenge.id, e.target.checked)}
                />
                <span className="text-gray-700 font-medium">{challenge.label}</span>
              </label>
            ))}
          </div>

          {Object.keys(assessment).length > 0 && (
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Recommended Solutions:</h3>
              <div className="space-y-3">
                {Object.keys(assessment).map((challengeId) => {
                  const challenge = challenges.find(c => c.id === challengeId);
                  if (!challenge) return null;
                  return (
                    <div key={challengeId} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">
                        <strong>{challenge.label}:</strong> Custom automation and digital workflows
                      </span>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                Get Detailed Solution Plan
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChallengeAssessment;