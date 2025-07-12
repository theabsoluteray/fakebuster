import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Hugging Face API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/nateraw/image-is-ai',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid response from model' }, { status: 500 });
    }

    const best = data.reduce((a: any, b: any) => (a.score > b.score ? a : b));
    const rawScore = best.score;
    const rawLabel = best.label === 'LABEL_0' ? 'AI-Generated' : 'Human';

    // Smart Confidence Rule
    let label = rawLabel;
    let isAI = rawLabel === 'AI-Generated';
    let confidence = Math.round(rawScore * 100);

    if (rawScore >= 0.75) {
      // strong confidence
    } else if (rawScore >= 0.6 && rawScore < 0.75) {
      // moderate confidence — frontend can show "likely"
    } else if (rawScore > 0.45 && rawScore < 0.6) {
      // uncertain zone
      label = 'Uncertain';
      let isAI: boolean | null;
      confidence = 50;
    } else {
      // low confidence, flip label
      label = rawLabel === 'AI-Generated' ? 'Human' : 'AI-Generated';
      isAI = label === 'AI-Generated';
      confidence = Math.round(100 - rawScore * 100);
    }

    return NextResponse.json({
      label,
      isAI,
      confidence,
      score: rawScore,
      model: "nateraw/image-is-ai"
    });

  } catch (error) {
    console.error('Image detection error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
