'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function MediaTab() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    const newImages: string[] = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          setGalleryImages(prev => [...prev, ...newImages].slice(0, 4));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeCoverImage = () => {
    setCoverImage(null);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="text-sm text-muted-foreground">
        Upload images and media for your coworking space
      </p>

      {/* Cover Image */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Cover Image <span className="text-destructive">*</span>
        </label>
        <p className="text-xs text-muted-foreground">
          Recommended: 1920x1080px
        </p>

        {!coverImage ? (
          <label
            htmlFor="cover-image"
            className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-muted-foreground/50"
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Drag and drop your image here, or browse
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Supports: JPG, PNG (Max 5MB)
            </p>
            <Input
              id="cover-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageChange}
            />
          </label>
        ) : (
          <div className="relative">
            <img
              src={coverImage}
              alt="Cover preview"
              className="h-[200px] w-full rounded-lg object-cover"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute right-2 top-2 h-8 w-8"
              onClick={removeCoverImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Gallery Images */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Gallery Images (Max 4)</label>
        <p className="text-xs text-muted-foreground">Recommended: 1200x800px</p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="h-32 w-full rounded-lg object-cover"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute right-1 top-1 h-6 w-6"
                onClick={() => removeGalleryImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {galleryImages.length < 4 && (
            <label
              htmlFor="gallery-images"
              className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-muted-foreground/50"
            >
              <Upload className="h-6 w-6 text-muted-foreground" />
              <p className="mt-1 text-xs text-muted-foreground">Upload</p>
              <Input
                id="gallery-images"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleGalleryImagesChange}
              />
            </label>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Upload up to {4 - galleryImages.length} more image(s) (Max 5MB each)
        </p>
      </div>

      {/* Virtual Tour Link */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Virtual Tour Link (Optional)
        </label>
        <Input placeholder="https://example.com/virtual-tour" type="url" />
        <p className="text-xs text-muted-foreground">
          Add a link to a 360° virtual tour or Matterport link
        </p>
      </div>

      {/* Video Link */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Video Link (Optional)</label>
        <Input placeholder="https://youtube.com/watch?v=..." type="url" />
        <p className="text-xs text-muted-foreground">
          YouTube or Vimeo video link
        </p>
      </div>
    </div>
  );
}
