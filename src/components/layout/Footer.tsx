import React from 'react';
import { MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              DevSolutions
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Custom software solutions that eliminate inefficiencies and accelerate business growth.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Web Applications</li>
              <li>Mobile Development</li>
              <li>System Integration</li>
              <li>Business Intelligence</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Free Consultation</li>
              <li>Project Assessment</li>
              <li>ROI Calculator</li>
              <li>Live Chat Support</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
          <p>&copy; 2025 DevSolutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;