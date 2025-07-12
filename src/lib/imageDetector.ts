export interface ImageDetectionResult {
  confidence: number;
  isAI: boolean;
  label: string;
  score: number;
}

export async function detectImageAI(imageUrl: string): Promise<ImageDetectionResult> {
  try {
    // For now, use the fallback function since API routes might not be configured
    // In production, you would use the actual API call
    return detectImageFallback(imageUrl);
  } catch (error) {
    console.error('Error detecting image:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
}

// Fallback function for when API is not available
export function detectImageFallback(imageUrl: string): ImageDetectionResult {
  // Simple heuristic based on image URL patterns
  const hasAIGeneratedKeywords = /(ai|generated|synthetic|fake|deepfake)/i.test(imageUrl);
  const hasStableDiffusionPattern = /stable-diffusion|midjourney|dall-e/i.test(imageUrl);
  
  let aiScore = 0;
  
  if (hasAIGeneratedKeywords) aiScore += 40;
  if (hasStableDiffusionPattern) aiScore += 60;
  
  const confidence = Math.min(aiScore, 85);
  const isAI = confidence > 50;
  
  return {
    confidence: Math.round(confidence),
    isAI,
    label: isAI ? 'AI-Generated' : 'Human',
    score: Math.round(confidence)
  };
} 