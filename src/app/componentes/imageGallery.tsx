import React, {useState } from 'react';
import Image from 'next/image';
import { Modal, Button } from 'react-bootstrap'; 

interface Photo {
  id: string;
  url: string;
  title?: string;
}

interface ImageGalleryProps {
  photos: Photo[];
  onDelete?: (photoId: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, onDelete }) => {
  const [show, setShow] = useState(false); 
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null); 

  const handleClose = () => setShow(false);
  const handleOpenModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setShow(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative">
          <Image
            src={photo.url}
            alt={photo.title || 'Imagen'}
            width={300}
            height={200}
            className="rounded-lg object-cover group-hover:scale-105 transition duration-200 cursor-pointer"
            onClick={() => handleOpenModal(photo)} 
          />
          {onDelete && (
            <button
              type="button"
              className="absolute top-0 right-0 mt-2 mr-2 bg-transparent hover:bg-red-500 hover:text-white text-red-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              onClick={() => onDelete(photo.id)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      ))}

      {/* Modal for displaying selected photo */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPhoto?.title || 'Imagen'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={selectedPhoto?.url || ''}
            alt={selectedPhoto?.title || 'Imagen'}
            width={600}
            height={400}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageGallery;
