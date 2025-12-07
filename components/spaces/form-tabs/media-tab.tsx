'use client';

import { useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';

export function MediaTab() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const images = watch('images') || [];

  const addImageSlot = () => {
    setValue('images', [...images, '']);
  };

  const removeImageSlot = (index: number) => {
    const newImages = images.filter((_: string, i: number) => i !== index);
    setValue('images', newImages);
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    setValue('images', newImages);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Media Gallery</h3>
        <p className="text-sm text-muted-foreground">
          Upload high-quality images of your space. The first image will be used
          as the cover image for listings.
        </p>
      </div>

      {errors.images && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {errors.images.message as string}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image: string, index: number) => (
          <div
            key={index}
            className="relative group border rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-8 w-8 shadow-sm"
                onClick={() => removeImageSlot(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-1">
              <div className="flex items-center justify-between px-3 py-2 border-b mb-0 bg-muted/30">
                <span className="text-xs font-medium text-muted-foreground">
                  {index === 0 ? 'Cover Image' : `Image ${index + 1}`}
                </span>
              </div>
              <div className="p-3">
                <ImageUpload
                  value={image}
                  onChange={url => updateImage(index, url)}
                  folder="spaces"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="h-full min-h-[250px] flex flex-col items-center justify-center border-dashed border-2 hover:border-primary/50 hover:bg-muted/50 rounded-xl gap-3 transition-all"
          onClick={addImageSlot}
        >
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <span className="text-sm font-medium">Add New Image</span>
            <p className="text-xs text-muted-foreground mt-1">
              Click to add slot
            </p>
          </div>
        </Button>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 mt-4">
        <h4 className="text-sm font-medium text-blue-900 mb-1">
          Tips for great photos
        </h4>
        <ul className="list-disc list-inside text-xs text-blue-700 space-y-1">
          <li>Use high-resolution images (at least 1920x1080)</li>
          <li>Use natural lighting whenever possible</li>
          <li>
            Show different areas: entrance, workspace, meeting rooms, amenities
          </li>
          <li>Avoid blurry or dark photos</li>
        </ul>
      </div>
    </div>
  );
}
