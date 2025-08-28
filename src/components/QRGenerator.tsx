"use client";

import { useEffect, useRef, useState } from 'react';

interface QRGeneratorProps {
  url: string;
  size?: number;
  className?: string;
}

export default function QRGenerator({ url, size = 256, className = "" }: QRGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    generateQRCode();
  }, [url, size]);

  const generateQRCode = async () => {
    if (!canvasRef.current || !url) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Simple QR code generation using a web service
      // In production, you might want to use a proper QR code library
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas size
      canvas.width = size;
      canvas.height = size;

      // Create image and load QR code
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          // Clear canvas
          ctx.clearRect(0, 0, size, size);
          
          // Draw white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, size, size);
          
          // Draw QR code
          ctx.drawImage(img, 0, 0, size, size);
          
          setIsGenerating(false);
        } catch (err) {
          console.error('Error drawing QR code:', err);
          setError('Failed to render QR code');
          setIsGenerating(false);
        }
      };

      img.onerror = () => {
        console.error('Error loading QR code image');
        setError('Failed to generate QR code');
        setIsGenerating(false);
      };

      img.src = qrApiUrl;

    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code');
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      console.error('Error downloading QR code:', err);
      setError('Failed to download QR code');
    }
  };

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 ${className}`} style={{ width: size, height: size }}>
        <div className="text-red-500 text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <p className="text-sm">{error}</p>
          <button 
            onClick={generateQRCode}
            className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-gray-200 rounded-lg shadow-sm"
          style={{ width: size, height: size }}
        />
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-600">Generating...</p>
            </div>
          </div>
        )}
      </div>
      
      {!isGenerating && !error && (
        <button
          onClick={downloadQR}
          className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
}
