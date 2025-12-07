'use client';

import { useState, useRef } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFileUpload } from '@/lib/hooks/use-file-upload';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  folder?: 'spaces' | 'leads' | 'users' | 'documents' | 'uploads' | 'locations';
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  folder = 'uploads',
  disabled,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading } = useFileUpload();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setProgress(0);

    // Upload
    const result = await uploadFile(file, {
      folder,
      onProgress: p => setProgress(p),
    });

    if (result) {
      onChange(result.url);
      setPreview(result.url);
    } else {
      setPreview(value);
    }
  };

  const handleRemove = () => {
    onChange('');
    setPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        disabled={disabled || isUploading}
      />

      {preview ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
          />
          <div className="absolute right-2 top-2 z-10">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="h-8 w-8"
              onClick={handleRemove}
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {isUploading && (
            <>
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <span className="text-sm font-medium">
                  {progress}% uploaded
                </span>
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 p-8 transition-colors hover:border-primary hover:bg-gray-50',
            (disabled || isUploading) && 'pointer-events-none opacity-50'
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            ) : (
              <UploadCloud className="h-6 w-6 text-gray-500" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">
              {isUploading ? 'Uploading...' : 'Click to upload'}
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
          </div>
        </div>
      )}
    </div>
  );
}
