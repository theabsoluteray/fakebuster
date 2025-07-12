export interface ConfidenceResult {
  color: string;
  message: string;
  bgColor: string;
  borderColor: string;
}

export function confidenceToColor(confidence: number): ConfidenceResult {
  if (confidence >= 80) {
    return {
      color: 'text-red-500',
      message: 'Likely AI-Generated',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    };
  } else if (confidence >= 60) {
    return {
      color: 'text-orange-500',
      message: 'Possibly AI-Generated',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    };
  } else if (confidence >= 40) {
    return {
      color: 'text-yellow-500',
      message: 'Uncertain',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    };
  } else {
    return {
      color: 'text-green-500',
      message: 'Likely Human',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    };
  }
}

export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 90) return 'Very High';
  if (confidence >= 80) return 'High';
  if (confidence >= 60) return 'Medium';
  if (confidence >= 40) return 'Low';
  return 'Very Low';
} 