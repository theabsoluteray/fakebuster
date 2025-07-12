import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text input is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Hugging Face API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/roberta-base-openai-detector',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    
    // The model returns an array with two scores: [fake_score, real_score]
    const [fakeScore, realScore] = data[0];
    const confidence = Math.max(fakeScore, realScore) * 100;
    const isAI = fakeScore > realScore;
    const label = isAI ? 'AI-Generated' : 'Human';
    const score = isAI ? fakeScore : realScore;

    return NextResponse.json({
      confidence: Math.round(confidence),
      isAI,
      label,
      score: Math.round(score * 100)
    });

  } catch (error) {
    console.error('Text detection error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze text' },
      { status: 500 }
    );
  }
} 