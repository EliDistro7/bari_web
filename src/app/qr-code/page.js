'use client';
import React, { useState } from 'react';
import { Download, Link2, QrCode, Briefcase, FileText, ArrowRight } from 'lucide-react';

export default function QRCodeGenerator() {
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const validateUrl = (input) => {
    if (!input.trim()) return null;
    try {
      let urlToValidate = input;
      if (!input.match(/^https?:\/\//i)) {
        urlToValidate = 'https://' + input;
      }
      new URL(urlToValidate);
      return urlToValidate;
    } catch {
      return null;
    }
  };

  const generateQRCode = async () => {
    setError('');
    
    if (!businessName.trim()) {
      setError('Please enter a business name');
      return;
    }

    if (!businessDescription.trim()) {
      setError('Please enter a business description');
      return;
    }

    if (!websiteUrl.trim()) {
      setError('Please enter a website URL');
      return;
    }

    const validatedUrl = validateUrl(websiteUrl);
    if (!validatedUrl) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }

    setIsGenerating(true);

    try {
      // Create the data object
      const data = {
        name: businessName.trim(),
        description: businessDescription.trim(),
        url: validatedUrl
      };

      // Encode the data as a URL parameter
      const encodedData = encodeURIComponent(JSON.stringify(data));
      
      // Create a link to your landing page (you'll host this)
      // For now, we'll use a data URL that could be replaced with your actual landing page
      const landingPageUrl = `https://bari-kaneno.pro/card?data=${encodedData}`;
      
      // Generate QR code for the landing page
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(landingPageUrl)}`;
      
      setQrCode(qrApiUrl);
      setPreviewData(data);
      setShowPreview(true);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `${businessName.replace(/\s+/g, '-').toLowerCase()}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setShowPreview(false);
    setQrCode('');
    setPreviewData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-4 rounded-2xl">
              <QrCode className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Smart Business Card QR Generator
          </h1>
          <p className="text-gray-600">
            Create a QR code with business intro before website redirect
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
            
            {/* Business Name */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Afya Consultancy Services"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Business Description */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  placeholder="e.g., Professional health consulting and wellness solutions for businesses across Tanzania"
                  rows="3"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Keep it brief and compelling (1-2 sentences)</p>
            </div>

            {/* Website URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="example.com or https://example.com"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateQRCode}
              disabled={isGenerating}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </button>
          </div>

          {/* Preview/Result Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!showPreview ? (
              <div className="h-full flex items-center justify-center text-center">
                <div className="text-gray-400">
                  <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Fill in the form to generate your QR code</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Your QR Code</h2>
                  <button
                    onClick={resetForm}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Create New
                  </button>
                </div>

                {/* QR Code */}
                <div className="text-center">
                  <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-xl">
                    <img
                      src={qrCode}
                      alt="Generated QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadQRCode}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download QR Code
                </button>

                {/* Preview of Landing Page */}
                <div className="border-t pt-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Preview of scan experience:</p>
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">{previewData.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{previewData.description}</p>
                    <div className="pt-2">
                      <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm">
                        Visit Website
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 pt-2">Redirects to: {previewData.url}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Enter your business name, description, and website URL</li>
            <li>Generate the QR code</li>
            <li>When someone scans the QR code, they first see your business introduction</li>
            <li>They can then click to visit your full website</li>
            <li>Perfect for business cards - provides context before the redirect!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}