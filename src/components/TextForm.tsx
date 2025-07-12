'use client';

import { useState } from 'react';
import { detectTextAI, detectTextFallback, TextDetectionResult } from '@/lib/textDetector';

interface TextFormProps {
  onResult: (result: TextDetectionResult) => void;
  onLoading: (loading: boolean) => void;
}

export default function TextForm({ onResult, onLoading }: TextFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setError('');
    onLoading(true);

    try {
      // Use the detection function (which now uses fallback by default)
      const result = await detectTextAI(text);
      onResult(result);
    } catch (error) {
      setError('Failed to analyze text. Please try again.');
      console.error('Text analysis error:', error);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-black mb-2">
            Enter text to analyze
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type the text you want to analyze for AI-generated content..."
            className="w-full h-32 px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            required
          />
        </div>
        
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Analyze Text
        </button>
      </form>
      
      <div className="mt-6 text-sm text-black">
        <h4 className="font-medium mb-2">What we analyze:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Writing patterns and style consistency</li>
          <li>Repetitive language structures</li>
          <li>Statistical text characteristics</li>
          <li>Common AI generation markers</li>
        </ul>
      </div>
    </div>
  );
} 