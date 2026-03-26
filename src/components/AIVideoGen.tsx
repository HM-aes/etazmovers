import { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion } from 'motion/react';
import { Upload, Video, Loader2, Key } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function AIVideoGen() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const generateVideo = async () => {
    if (!file) return;

    try {
      setIsGenerating(true);
      setError(null);

      // Check for API key selection
      // @ts-ignore
      if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          
          let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: 'A cinematic, high-quality video of a moving truck driving smoothly down a scenic road, professional lighting, 4k resolution.',
            image: {
              imageBytes: base64Data,
              mimeType: file.type,
            },
            config: {
              numberOfVideos: 1,
              resolution: '720p',
              aspectRatio: '16:9'
            }
          });

          while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
          }

          const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
          if (downloadLink) {
            // Fetch video with API key header
            const response = await fetch(downloadLink, {
              method: 'GET',
              headers: {
                'x-goog-api-key': process.env.GEMINI_API_KEY || '',
              },
            });
            
            const blob = await response.blob();
            const videoObjectUrl = URL.createObjectURL(blob);
            setVideoUrl(videoObjectUrl);
          } else {
            throw new Error('No video generated');
          }
        } catch (err: any) {
          console.error(err);
          setError(err.message || 'Failed to generate video');
        } finally {
          setIsGenerating(false);
        }
      };
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to initialize video generation');
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Breng Uw Verhuizing Tot Leven</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors">
            Upload een foto van uw nieuwe woning en onze AI genereert een prachtige welkomstvideo.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-950 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-2xl transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 hover:border-amber-500 transition-colors">
              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <Upload className="w-8 h-8 text-amber-500" />
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              <MagneticButton
                onClick={() => fileInputRef.current?.click()}
                className="bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white px-6 py-3 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 mb-4 transition-colors"
              >
                {previewUrl ? 'Kies Andere Foto' : 'Upload Foto'}
              </MagneticButton>
              <p className="text-sm text-zinc-500 text-center">
                JPG, PNG of WebP (max. 5MB)
              </p>
            </div>

            {/* Result Section */}
            <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
              {videoUrl ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                </div>
              ) : isGenerating ? (
                <div className="flex flex-col items-center text-center">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                  <h3 className="text-xl font-bold mb-2">Video Genereren...</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm transition-colors">
                    Dit kan enkele minuten duren. Onze AI creëert een unieke video op basis van uw foto.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center opacity-50">
                  <Video className="w-16 h-16 text-zinc-500 dark:text-zinc-600 mb-4 transition-colors" />
                  <p className="text-zinc-600 dark:text-zinc-400 transition-colors">Uw gegenereerde video verschijnt hier.</p>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <MagneticButton
                onClick={generateVideo}
                disabled={!file || isGenerating}
                className={`mt-8 w-full py-4 font-bold text-lg transition-colors ${
                  !file || isGenerating
                    ? 'bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed'
                    : 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
                }`}
              >
                {isGenerating ? 'Bezig met genereren...' : 'Genereer Video'}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
