# FakeBuster 🔍

Detect AI-generated text and images using Hugging Face models.

## Features

- **Text Detection**: Uses `Hello-SimpleAI/HC3` model
- **Image Detection**: Uses `nateraw/image-is-ai` model
- **Smart Confidence Rules**: Advanced analysis for better accuracy
- **Modern UI**: Clean, responsive design

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create `.env.local`:
   ```env
   HUGGINGFACE_API_KEY=your_api_key_here
   ```

3. **Get API Key**
   - Sign up at [huggingface.co](https://huggingface.co)
   - Get API key from [Settings > Access Tokens](https://huggingface.co/settings/tokens)

4. **Run the app**
   ```bash
   npm run dev
   ```

## Usage

- **Text Detection**: Paste text and analyze
- **Image Detection**: Enter image URL and analyze
- **Results**: Get confidence scores and AI/Human classification

## Tech Stack

- Next.js 15 (TypeScript)
- TailwindCSS
- Hugging Face Inference API

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── text-detector/page.tsx   # Text analysis
│   ├── image-detector/page.tsx  # Image analysis
│   └── api/
│       ├── detect-text/route.ts # Text API
│       └── detect-image/route.ts # Image API
├── components/
│   ├── DetectorCard.tsx         # Results display
│   ├── TextForm.tsx             # Text input
│   └── UploadForm.tsx           # Image upload
└── lib/
    ├── textDetector.ts          # Text logic
    └── imageDetector.ts         # Image logic
```