'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import ImageGallery from "../componentes/imageGallery";

interface Photo {
    id: string;
    url: string;
    title?: string;
  }

export default function Home() {

    const router = useRouter();
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    const [photos, setPhotos] = useState<Photo[]>([
        { id: '1', url: '/images/img1.jpg', title: 'Imagen 1' },
        { id: '2', url: '/images/img2.jpg', title: 'Imagen 2' },
        { id: '3', url: '/images/img3.jpg', title: 'Imagen 3' },
        { id: '4', url: '/images/img4.jpg', title: 'Imagen 4' },
        { id: '5', url: '/images/img5.jpg', title: 'Imagen 5' },
        { id: '6', url: '/images/img6.jpg', title: 'Imagen 6' },
        { id: '7', url: '/images/img7.jpg', title: 'Imagen 7' },
        { id: '8', url: '/images/img8.jpeg', title: 'Imagen 8' },
        { id: '9', url: '/images/img9.jpeg', title: 'Imagen 9' },
        { id: '10', url: '/images/img10.jpeg', title: 'Imagen 10' },
      ]);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
      
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
              const photoUrl = e.target?.result as string;
              const newPhotos = [...photos];
              newPhotos.push({ id: Math.random().toString(), url: photoUrl });
              setPhotos(newPhotos);
            }
          };
          reader.readAsDataURL(file);
        }
      };

      const handleDelete = (photoId: string) => {
        const newPhotos = photos.filter((photo) => photo.id !== photoId);
        setPhotos(newPhotos);
      };

    if (isLoggedIn) {
        return (
            <main className="bg-gray-100">
                <div className="container mx-auto px-4 py-16">
                <h3 className="text-2m mb-8 my-0 text-gray-700">Hola {currentUser}.</h3>
                <h1 className="text-3xl font-bold mb-8 text-gray-700">Bienvenido a tu galería de fotos</h1>
                <div className="mb-4">
                    <label htmlFor="upload" className="block text-gray-700 font-bold mb-2">
                    Subir Foto
                    </label>
                    <input type="file" id="upload" className="appearance-none border rounded-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleUpload} />
                </div>
                {photos.length > 0 ? (
                    <ImageGallery photos={photos} onDelete={handleDelete} />
                ) : (
                    <p className="text-gray-500">No hay fotos en la galería.</p>
                )}
                </div>
            </main>
        );
    }
    else {
        router.push('/'); 
    }
}
