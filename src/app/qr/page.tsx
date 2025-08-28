"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import QRGenerator from "@/components/QRGenerator";

export default function QRCodePage() {
  const [tableId, setTableId] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [qrSize, setQrSize] = useState(256);

  const generateQRCode = () => {
    if (!tableId.trim()) {
      alert('Please enter a table ID');
      return;
    }

    // Get the current domain (in production, this would be your actual domain)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const menuUrl = `${baseUrl}/menu?table=${encodeURIComponent(tableId.trim())}`;
    setGeneratedUrl(menuUrl);
  };

  const clearForm = () => {
    setTableId('');
    setGeneratedUrl('');
  };

  const predefinedTables = [
    'Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5',
    'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10',
    'VIP Table A', 'VIP Table B', 'Outdoor Table 1', 'Outdoor Table 2'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
              <p className="text-gray-600">Generate QR codes for table ordering</p>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generate QR Code</CardTitle>
              <CardDescription>
                Create a QR code that customers can scan to access the digital menu for a specific table
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Manual Input */}
              <div className="space-y-2">
                <Label htmlFor="tableId">Table ID</Label>
                <Input
                  id="tableId"
                  placeholder="Enter table ID (e.g., Table 1, VIP A, etc.)"
                  value={tableId}
                  onChange={(e) => setTableId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateQRCode()}
                />
              </div>

              {/* Quick Select */}
              <div className="space-y-2">
                <Label>Quick Select</Label>
                <div className="grid grid-cols-2 gap-2">
                  {predefinedTables.map((table) => (
                    <Button
                      key={table}
                      variant="outline"
                      size="sm"
                      onClick={() => setTableId(table)}
                      className="text-left justify-start"
                    >
                      {table}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* QR Size */}
              <div className="space-y-2">
                <Label htmlFor="qrSize">QR Code Size</Label>
                <select
                  id="qrSize"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value={128}>Small (128x128)</option>
                  <option value={256}>Medium (256x256)</option>
                  <option value={512}>Large (512x512)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={generateQRCode} className="flex-1">
                  Generate QR Code
                </Button>
                <Button onClick={clearForm} variant="outline">
                  Clear
                </Button>
              </div>

              {/* Generated URL Display */}
              {generatedUrl && (
                <div className="space-y-2">
                  <Label>Generated URL</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-mono break-all">{generatedUrl}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(generatedUrl)}
                  >
                    Copy URL
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
              <CardDescription>
                {generatedUrl ? 'Your QR code is ready!' : 'QR code will appear here after generation'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedUrl ? (
                <div className="flex flex-col items-center space-y-4">
                  <QRGenerator url={generatedUrl} size={qrSize} />
                  
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      Table: <span className="font-medium">{tableId}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Customers can scan this QR code to access the menu
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-center">
                    Enter a table ID and click "Generate QR Code" to create your QR code
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use QR Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Generate QR Code</h3>
                <p className="text-sm text-gray-600">
                  Enter the table ID and generate a unique QR code for each table
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Print & Place</h3>
                <p className="text-sm text-gray-600">
                  Download and print the QR code, then place it on the corresponding table
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Customer Scans</h3>
                <p className="text-sm text-gray-600">
                  Customers scan the QR code to access the digital menu and place orders
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
