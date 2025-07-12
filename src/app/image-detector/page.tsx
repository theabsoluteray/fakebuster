'use client';

import { useState } from 'react';
import Link from 'next/link';
import UploadForm from '@/components/UploadForm';
import DetectorCard from '@/components/DetectorCard';
import { ImageDetectionResult } from '@/lib/imageDetector';

export default function ImageDetectorPage() {
  const [result, setResult] = useState<ImageDetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResult = (detectionResult: ImageDetectionResult) => {
    setResult(detectionResult);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-black mb-4">Image Detector</h1>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Analyze images to detect AI-generated content using computer vision analysis.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Form Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Analyze Your Image</h2>
              <UploadForm onResult={handleResult} onLoading={handleLoading} />
            </div>

            {/* Results Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Detection Results</h2>
              
              {isLoading ? (
                <DetectorCard 
                  confidence={0}
                  isAI={false}
                  label="Analyzing..."
                  isLoading={true}
                />
              ) : result ? (
                <DetectorCard 
                  confidence={result.confidence}
                  isAI={result.isAI}
                  label={result.label}
                  isLoading={false}
                />
              ) : (
                <div className="text-center text-black py-12">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-medium">No analysis yet</p>
                  <p className="text-sm text-black">Enter an image URL and click "Analyze Image" to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-black mb-6">How Image Detection Works</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-black mb-3">AI Detection Methods</h4>
                <ul className="space-y-2 text-black">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Statistical image analysis and pattern recognition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Frequency domain analysis for artifacts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Texture and noise pattern analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Consistency and realism evaluation</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-black mb-3">Confidence Levels</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm text-black">80-100%: Likely AI-Generated</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-sm text-black">60-79%: Possibly AI-Generated</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-black">40-59%: Uncertain</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-black">0-39%: Likely Human</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 