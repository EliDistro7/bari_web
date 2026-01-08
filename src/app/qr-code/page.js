'use client';
import React, { useState } from 'react';
import { Download, Link2, QrCode, Briefcase, FileText, ArrowRight, Copy, Check, Instagram, MessageCircle } from 'lucide-react';

export default function QRCodeGenerator() {
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const formatWhatsApp = (number) => {
    // Remove all non-digits
    const cleaned = number.replace(/\D/g, '');
    // If it starts with 0, replace with 255 (Tanzania country code)
    if (cleaned.startsWith('0')) {
      return '255' + cleaned.substring(1);
    }
    // If it doesn't start with 255, add it
    if (!cleaned.startsWith('255')) {
      return '255' + cleaned;
    }
    return cleaned;
  };

  // Generate a short unique ID
  const generateShortId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
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

    // Validate optional URLs
    let validatedWebsiteUrl = null;
    if (websiteUrl.trim()) {
      validatedWebsiteUrl = validateUrl(websiteUrl);
      if (!validatedWebsiteUrl) {
        setError('Please enter a valid website URL');
        return;
      }
    }

    let validatedInstagramUrl = null;
    if (instagramUrl.trim()) {
      // Allow both full URLs and just usernames
      if (instagramUrl.includes('instagram.com')) {
        validatedInstagramUrl = validateUrl(instagramUrl);
      } else {
        // Just a username, create the full URL
        const username = instagramUrl.replace('@', '');
        validatedInstagramUrl = `https://instagram.com/${username}`;
      }
    }

    let formattedWhatsApp = null;
    if (whatsappNumber.trim()) {
      formattedWhatsApp = formatWhatsApp(whatsappNumber);
      if (formattedWhatsApp.length < 12) {
        setError('Please enter a valid WhatsApp number');
        return;
      }
    }

    setIsGenerating(true);

    try {
      // Create the data object
      const data = {
        name: businessName.trim(),
        description: businessDescription.trim(),
        clientUrl: validatedWebsiteUrl,
        instagram: validatedInstagramUrl,
        whatsapp: formattedWhatsApp
      };

      // Generate a short unique ID
      const shortId = generateShortId();
      
      // Save to Vercel KV via API route
      try {
        const response = await fetch('/api/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: shortId,
            data: data
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save card data');
        }
      } catch (storageError) {
        console.error('Storage error:', storageError);
        setError('Failed to save card data. Please try again.');
        setIsGenerating(false);
        return;
      }
      
      // Create clean short URL
      const currentDomain = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'http://localhost:3000';
      const cleanUrl = `${currentDomain}/c/${shortId}`;
      
      // Generate QR code for the clean URL
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(cleanUrl)}`;
      
      setQrCode(qrApiUrl);
      setShortUrl(cleanUrl);
      setPreviewData(data);
      setShowPreview(true);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

// Replace your downloadQRCode function with this:

const downloadQRCode = async () => {
  try {
    // Fetch the QR code image
    const response = await fetch(qrCode);
    const blob = await response.blob();
    
    // Create a blob URL
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${businessName.replace(/\s+/g, '-').toLowerCase()}-qr-code.png`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading QR code:', error);
    alert('Failed to download QR code. Please try again.');
  }
};

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setShowPreview(false);
    setQrCode('');
    setShortUrl('');
    setPreviewData(null);
    setCopied(false);
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
            Create a QR code with clean, professional URL
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="example.com"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Instagram */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Instagram className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="@username or full Instagram URL"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="0712345678 or 255712345678"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Format: 0712345678 (we'll auto-format it)</p>
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

                {/* Clean URL Display */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-green-800 mb-2">✓ Clean Short URL Generated</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm text-green-900 font-mono bg-white px-3 py-2 rounded border border-green-300 truncate">
                      {shortUrl}
                    </code>
                    <button
                      onClick={copyShortUrl}
                      className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      title="Copy URL"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
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
                    
                    {/* Contact Links Preview */}
                    <div className="flex flex-wrap gap-2">
                      {previewData.clientUrl && (
                        <span className="inline-flex items-center text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          <Link2 className="w-3 h-3 mr-1" /> Website
                        </span>
                      )}
                      {previewData.instagram && (
                        <span className="inline-flex items-center text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                          <Instagram className="w-3 h-3 mr-1" /> Instagram
                        </span>
                      )}
                      {previewData.whatsapp && (
                        <span className="inline-flex items-center text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          <MessageCircle className="w-3 h-3 mr-1" /> WhatsApp
                        </span>
                      )}
                    </div>

                    <div className="pt-2">
                      <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm">
                        Get Your Smart Business Card
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 pt-2">Redirects to: yourdomain.com (your sales page)</p>
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
            <li>Enter business details and optional social links</li>
            <li>Generate a QR code with a clean, short URL</li>
            <li>Data is saved securely in the cloud (Vercel KV)</li>
            <li>When scanned, shows business intro with clickable links</li>
            <li>Auto-redirects to your sales page in 5 seconds</li>
          </ol>
        </div>
      </div>
    </div>
  );
}