'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import SafeImage from '@/components/SafeImage';
import { Photo } from '@/types/api';

export default function CSRPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=12');
        setPhotos(response.data);
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">CSR Page</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">CSR Page</h1>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">CSR Page</h1>
      <p className="text-gray-600 mb-6 text-center">
        Client-Side Rendering - данные загружаются на клиенте после рендера компонента
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
            <div className="relative w-full h-40 bg-gray-100">
              <SafeImage 
                src={photo.thumbnailUrl}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index === 0}
                photoId={photo.id}
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium truncate" title={photo.title}>
                {photo.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">ID: {photo.id}</p>
              <p className="text-xs text-blue-500 mt-1">Album: {Math.ceil(photo.id / 50)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}