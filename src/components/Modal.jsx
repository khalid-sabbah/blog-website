import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-600" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
