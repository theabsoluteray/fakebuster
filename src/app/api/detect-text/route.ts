import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text input is required' }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Hugging Face API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/Hello-SimpleAI/HC3',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();

    const fake = data.find((item: any) => item.label === 'LABEL_0');
    const human = data.find((item: any) => item.label === 'LABEL_1');

    if (!fake || !human) {
      return NextResponse.json({ error: 'Invalid model response' }, { status: 500 });
    }

    const isAI = fake.score > human.score;
    const label = isAI ? 'AI-Generated' : 'Human';
    const score = isAI ? fake.score : human.score;
    const confidence = Math.round(score * 100);

    return NextResponse.json({
      label,
      isAI,
      confidence,
      fakeScore: Math.round(fake.score * 100),
      humanScore: Math.round(human.score * 100),
      model: "Hello-SimpleAI/HC3"
    });

  } catch (error) {
    console.error('Text detection error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze text' },
      { status: 500 }
    );
  }
}
