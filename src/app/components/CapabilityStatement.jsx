'use client';
import React, { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import UploadPopup from './UploadPopup'; // Adjust the import path accordingly
import PopUpConfirmation from './PopUpConfirmation'; // Adjust the import path accordingly

export default function CapabilityStatement({ onSkip, onFileUpload }) {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            handleUpload(selectedFile); // Start upload process
        }
    };

    const handleUpload = (selectedFile) => {
        setIsUploading(true);
        
        // Simulate file upload process (replace this with your actual upload logic)
        setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(true);
            //onFileUpload(selectedFile); // Notify parent component about the successful upload
        }, 2000); // Simulating a 2-second upload
    };

    const handleCloseConfirmation = () => {
        setUploadSuccess(false); // Close the confirmation popup
        setFile(null); // Reset the file state
    };

    if (isUploading) {
        return <UploadPopup />; // Show the upload spinner
    }

    if (uploadSuccess) {
        return <PopUpConfirmation message="Your capability statement has been successfully uploaded!" onClose={handleCloseConfirmation} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-2xl">
                <h1 className="text-xl font-bold text-purple-800 mb-4">Upload your Capability Statement to unlock these benefits:</h1>
                <ul className="list-disc list-inside mb-4 text-gray-800">
                    <li>Find opportunities tailored to your business</li>
                    <li>AI-Powered proposal drafting for RFPs, RFQs, and sources sought</li>
                    <li>Bid management for optimizing proposals and tracking deadlines</li>
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
                            onClick={() => fileInputRef.current.click()}
                            className="inline-flex items-center px-4 py-2 bg-purple-800 text-white border border-purple-600 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 min-w-max"
                        >
                            <FaUpload className="w-4 h-4 mr-2" />
                            {file ? 'Uploading...' : 'Upload'}
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
                        <div className="text-sm text-gray-600 mt-2">{file.name}</div>
                    )}
                </div>
                <div className="text-sm text-gray-600 text-center">
                    Supported formats: PDF, DOC, DOCX
                </div>
            </div>
        </div>
    );
}
