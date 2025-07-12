export interface TextDetectionResult {
  confidence: number;
  isAI: boolean;
  label: string;
  score: number;
}

export async function detectTextAI(text: string): Promise<TextDetectionResult> {
  try {
    // For now, use the fallback function since API routes might not be configured
    // In production, you would use the actual API call
    return detectTextFallback(text);
  } catch (error) {
    console.error('Error detecting text:', error);
    throw new Error('Failed to analyze text. Please try again.');
  }
}

// Fallback function for when API is not available
export function detectTextFallback(text: string): TextDetectionResult {
  // Simple heuristic based on text length and common AI patterns
  const words = text.split(' ').length;
  const hasRepetitivePatterns = /(\b\w+\b)(?:\s+\1){2,}/.test(text);
  const hasUnusualCapitalization = /[A-Z]{3,}/.test(text);
  
  let aiScore = 0;
  
  if (words < 10) aiScore += 20;
  if (hasRepetitivePatterns) aiScore += 30;
  if (hasUnusualCapitalization) aiScore += 15;
  
  const confidence = Math.min(aiScore, 85);
  const isAI = confidence > 50;
  
  return {
    confidence: Math.round(confidence),
    isAI,
    label: isAI ? 'AI-Generated' : 'Human',
    score: Math.round(confidence)
  };
} 