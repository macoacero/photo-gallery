import React, { FC, useState } from 'react';

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  onClick: () => void;
}

const ModalPhotos: FC<ModalProps> = ({ children, title, onClick }) => {

  return (
    <>
        <div className="fixed inset-0 z-50 overflow-y-auto px-4 pt-5 md:inset-0 md:p-0 md:flex md:items-center md:justify-center">
          <div className="inline-block w-full max-w-md p-8 shadow-sm bg-white rounded-lg overflow-hidden text-left md:rounded-xl">
            {title && <h3 className="text-xl font-bold mb-4 text-gray-700">{title}</h3>}
            {children}<button
            onClick={onClick}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
            Cerrar
            </button>
          </div>
        </div>
    </>
  );
};

export default ModalPhotos;
