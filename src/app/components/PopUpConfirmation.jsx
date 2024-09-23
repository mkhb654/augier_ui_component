import React from 'react';

const PopUpConfirmation = ({ message, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} 
        >
            <div
                className="bg-white w-[650px] h-[291px] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center"
                onClick={(e) => e.stopPropagation()} 
            >
                <h2 className="text-2xl font-bold text-purple-800 mb-4">Capability Statement Uploaded</h2>
                
                {/* Centered Tick Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1" // Keep the stroke thickness
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-20 h-20 text-green-500 mb-4"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M7 14l3 3 6-10" /> 
                </svg>

                {/* Centered Message */}
                <div className="text-xl font-bold text-gray-700 mb-6">{message}</div>
            </div>
        </div>
    );
};

export default PopUpConfirmation;
