# FakeBuster 🔍

A modern web application that detects AI-generated content using advanced machine learning models. Analyze text and images to identify artificial intelligence patterns with confidence scores.

## ✨ Features

- **Text Detection**: Analyze text content using Hugging Face's `roberta-base-openai-detector` model
- **Image Detection**: Detect AI-generated images using computer vision analysis
- **Confidence Scoring**: Get detailed confidence levels and detection verdicts
- **Modern UI**: Beautiful glassmorphism design with smooth animations
- **Fallback Support**: Heuristic analysis when APIs are unavailable
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: TailwindCSS
- **APIs**: 
  - Hugging Face Inference API (Text Detection)
  - Replicate API (Image Detection)
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fakebuster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Hugging Face API Key for text detection
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   
   # Replicate API Token for image detection
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   
   # Next.js configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Get API Keys**
   - **Hugging Face**: Sign up at [huggingface.co](https://huggingface.co) and get your API key
   - **Replicate**: Sign up at [replicate.com](https://replicate.com) and get your API token

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
fakebuster/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage
│   │   ├── text-detector/page.tsx   # Text analysis page
│   │   ├── image-detector/page.tsx  # Image analysis page
│   │   └── api/
│   │       ├── detect-text/route.ts # Text detection API
│   │       └── detect-image/route.ts # Image detection API
│   ├── components/
│   │   ├── DetectorCard.tsx         # Results display component
│   │   ├── TextForm.tsx             # Text input form
│   │   └── UploadForm.tsx           # Image URL input form
│   ├── lib/
│   │   ├── textDetector.ts          # Text detection logic
│   │   └── imageDetector.ts         # Image detection logic
│   └── utils/
│       └── confidenceToColor.ts     # Confidence score utilities
├── public/                          # Static assets
└── package.json
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `HUGGINGFACE_API_KEY` | Hugging Face API key for text detection | Yes |
| `REPLICATE_API_TOKEN` | Replicate API token for image detection | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's URL (for production) | No |

### API Models

- **Text Detection**: `roberta-base-openai-detector` (Hugging Face)
- **Image Detection**: Custom AI classifier (Replicate)

## 🎯 Usage

### Text Detection
1. Navigate to the Text Detector page
2. Paste or type the text you want to analyze
3. Click "Analyze Text"
4. View the confidence score and detection result

### Image Detection
1. Navigate to the Image Detector page
2. Enter the URL of the image you want to analyze
3. Click "Analyze Image"