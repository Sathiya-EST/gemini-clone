"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
  onClose: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  onClose,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return false;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      processFile(file);
    }
  };

  const handleConfirm = () => {
    if (preview) {
      onImageSelected(preview);
      onClose();
    }
  };

  return (
    <div className="w-full">
      <div className="p-4">
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-32 mx-auto rounded"
              />
            ) : (
              <div>
                <Upload
                  className={`h-8 w-8 mx-auto mb-2 transition-colors ${
                    isDragging
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <p
                  className={`text-sm transition-colors ${
                    isDragging
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {isDragging
                    ? "Drop image here"
                    : "Click to upload or drag & drop"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Max size: 5MB
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!preview}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
