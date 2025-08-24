// components/sections/ROICalculator.jsx
'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Target } from 'lucide-react';

const ROICalculator = () => {
  const [roiInputs, setRoiInputs] = useState({ 
    hoursPerWeek: '', 
    hourlyRate: '', 
    teamSize: '' 
  });

  const calculateROI = () => {
    const hours = parseFloat(roiInputs.hoursPerWeek) || 0;
    const rate = parseFloat(roiInputs.hourlyRate) || 0;
    const team = parseFloat(roiInputs.teamSize) || 1;
    
    const annualCost = hours * 52 * rate * team;
    const potentialSavings = annualCost * 0.7;
    const projectCost = 25000; // Example project cost
    
    return {
      annualCost: annualCost.toLocaleString(),
      savings: potentialSavings.toLocaleString(),
      breakEven: projectCost > 0 ? Math.ceil(projectCost / (potentialSavings / 12)) : 0
    };
  };

  const roi = calculateROI();

  const handleInputChange = (field:string, value:string) => {
    setRoiInputs({...roiInputs, [field]: value});
  };

  return (
    <section id="calculator" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Calculate Your Potential ROI
          </h2>
          <p className="text-xl text-gray-600">
            See how much time and money custom software could save your business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Current Situation</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours spent on manual tasks per week
                </label>
                <input
                  type="number"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 10"
                  value={roiInputs.hoursPerWeek}
                  onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average hourly rate ($)
                </label>
                <input
                  type="number"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 25"
                  value={roiInputs.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team size affected
                </label>
                <input
                  type="number"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 3"
                  value={roiInputs.teamSize}
                  onChange={(e) => handleInputChange('teamSize', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl shadow-xl border-2 border-green-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Potential Savings</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 text-red-500" />
                  <span className="text-lg font-semibold text-gray-700">Current Annual Cost</span>
                </div>
                <p className="text-3xl font-bold text-red-600">${roi.annualCost}</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <span className="text-lg font-semibold text-gray-700">Potential Annual Savings</span>
                </div>
                <p className="text-3xl font-bold text-green-600">${roi.savings}</p>
                <p className="text-sm text-gray-600 mt-1">Based on 70% efficiency improvement</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-6 h-6 text-blue-500" />
                  <span className="text-lg font-semibold text-gray-700">Break-even Timeline</span>
                </div>
                <p className="text-3xl font-bold text-blue-600">{roi.breakEven} months</p>
              </div>

              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
                Get Custom ROI Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
