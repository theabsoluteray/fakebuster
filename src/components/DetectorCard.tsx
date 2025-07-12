'use client';

import { confidenceToColor, getConfidenceLabel } from '@/utils/confidenceToColor';

interface DetectorCardProps {
  confidence: number;
  isAI: boolean;
  label: string;
  isLoading?: boolean;
}

export default function DetectorCard({ confidence, isAI, label, isLoading = false }: DetectorCardProps) {
  const result = confidenceToColor(confidence);
  const confidenceLabel = getConfidenceLabel(confidence);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 ${result.borderColor} ${result.bgColor}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-black mb-2">Detection Result</h3>
        
        <div className={`text-3xl font-bold mb-2 ${result.color}`}>
          {label}
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Confidence Level</div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${result.color.replace('text-', 'bg-')}`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>{confidence}%</span>
            <span>100%</span>
          </div>
        </div>
        
                  <div className="text-sm text-black">
            <span className="font-medium">Confidence: </span>
            {confidenceLabel} ({confidence}%)
          </div>
        
        <div className={`mt-4 p-3 rounded-lg ${result.bgColor} border ${result.borderColor}`}>
          <div className={`text-sm font-medium ${result.color}`}>
            {result.message}
          </div>
        </div>
      </div>
    </div>
  );
} 