'use client';

import { useState, useRef } from 'react';
import { detectImageAI, detectImageFallback, ImageDetectionResult } from '@/lib/imageDetector';

interface UploadFormProps {
  onResult: (result: ImageDetectionResult) => void;
  onLoading: (loading: boolean) => void;
}

export default function UploadForm({ onResult, onLoading }: UploadFormProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        setFilePreview(null);
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        setFilePreview(null);
        return;
      }
      
      setSelectedFile(file);
      setError('');
      // Generate preview
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadMethod === 'url') {
      if (!imageUrl.trim()) {
        setError('Please enter an image URL');
        return;
      }

      // Basic URL validation
      try {
        new URL(imageUrl);
      } catch {
        setError('Please enter a valid image URL');
        return;
      }
    } else {
      if (!selectedFile) {
        setError('Please select an image file');
        return;
      }
    }

    setError('');
    onLoading(true);

    try {
      let imageToAnalyze: string;
      
      if (uploadMethod === 'file' && selectedFile) {
        // Convert file to data URL for analysis
        const reader = new FileReader();
        imageToAnalyze = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
      } else {
        imageToAnalyze = imageUrl;
      }
      
      // Use the detection function
      const result = await detectImageAI(imageToAnalyze);
      onResult(result);
    } catch (error) {
      setError('Failed to analyze image. Please try again.');
      console.error('Image analysis error:', error);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Upload Method Toggle */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setUploadMethod('url')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              uploadMethod === 'url'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Image URL
          </button>
          <button
            type="button"
            onClick={() => setUploadMethod('file')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              uploadMethod === 'file'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upload File
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {uploadMethod === 'url' ? (
          <div>
            <label htmlFor="imageUrl" className="block text-black text-sm font-medium text-black mb-2">
              Enter image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor="imageFile" className="block text-sm font-medium text-black mb-2">
              Select image file
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm text-gray-600">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Click to upload
                  </button>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              {selectedFile && (
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <p className="text-sm text-green-800">
                    <strong>Selected:</strong> {selectedFile.name}
                  </p>
                  {filePreview && (
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="mt-2 max-h-48 mx-auto rounded shadow"
                      style={{ objectFit: 'contain' }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Analyze Image
        </button>
      </form>
      
      <div className="mt-6 text-sm text-black">
        <h4 className="font-medium mb-2">What we analyze:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Image artifacts and patterns</li>
          <li>Statistical image characteristics</li>
          <li>AI generation markers</li>
          <li>Visual consistency and realism</li>
        </ul>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-blue-800 text-xs">
            <strong>Note:</strong> You can upload image files directly or provide image URLs. 
            Supported formats: JPG, PNG, GIF (max 10MB for uploads).
          </p>
        </div>
      </div>
    </div>
  );
} 