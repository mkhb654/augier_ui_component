'use client';

import React, { useState, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';

export default function CapabilityStatement({ onSkip, onFileUpload }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            alert('File uploaded successfully');
            onFileUpload(); // Notify parent component about the successful upload
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-2xl">
                <h1 className="text-xl font-bold text-purple-800 mb-4">Upload your Capability Statement to unlock these benefits.</h1>
                <ul className="list-disc list-inside mb-4 text-gray-800">
                    <li>Find Opportunities tailored to your Business</li>
                    <li>AI-Powered Proposal Drafting for RFPs, RFQs, Sources sought.</li>
                    <li>Bid Management for optimizing proposals and tracking deadlines.</li>
                </ul>
                <div className="flex flex-col items-center space-y-4 mb-4">
                    <div className="flex space-x-4">
                        <button
                            onClick={onSkip}
                            className="inline-flex items-center px-4 py-2 bg-white text-gray-800 border border-purple-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 min-w-max"
                        >
                            Skip for now
                        </button>
                        <button
                            onClick={handleButtonClick}
                            className="inline-flex items-center px-4 py-2 bg-purple-800 text-white border border-purple-600 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 min-w-max"
                        >
                            <FaUpload className="w-4 h-4 mr-2" />
                            {file ? 'Uploading' : 'Upload'}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".doc,.pdf,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                    {file && (
                        <p className="text-sm text-gray-600 mt-2">{file.name}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
