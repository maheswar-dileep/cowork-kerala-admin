import { useState } from 'react';
import axios from 'axios';
import { api } from '@/lib/api';

interface UploadOptions {
  folder?: 'spaces' | 'leads' | 'users' | 'documents' | 'uploads' | 'locations';
  onProgress?: (progress: number) => void;
}

interface UploadedFile {
  key: string;
  url: string;
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    options: UploadOptions = {}
  ): Promise<UploadedFile | null> => {
    setIsUploading(true);
    setError(null);

    try {
      // 1. Get Presigned URL
      const { data: signedData } = await api.get('/upload/signed-url-put', {
        params: {
          folder: options.folder || 'uploads',
          fileName: file.name,
          contentType: file.type,
        },
      });

      if (!signedData.success) {
        throw new Error('Failed to get upload URL');
      }

      const { signedUrl, key } = signedData.data;

      // 2. Upload to R2 Worker Proxy
      const workerUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_WORKER_URL}?signedUrl=${encodeURIComponent(signedUrl)}`;

      const formData = new FormData();
      formData.append('file', file);

      await axios.put(workerUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (options.onProgress && progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            options.onProgress(percent);
          }
        },
      });

      // Construct public URL using the configured public domain
      const publicUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_URL}/${key}`;

      return { key, url: publicUrl };
    } catch (err) {
      console.error('Upload failed:', err);
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : (err as Error).message || 'Upload failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, error };
}
