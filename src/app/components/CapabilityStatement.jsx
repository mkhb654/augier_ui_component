'use client';
import React, { useRef, useContext } from 'react';
import { FaUpload } from 'react-icons/fa';
import UploadPopup from './UploadPopUp';
import PopUpConfirmation from './PopUpConfirmation'; // Adjust the import path accordingly
import { AppContext } from '../context/AppContext'; // Import the AppContext

export default function CapabilityStatement({ onSkip }) {
    const { files, setFiles, isUploading, setIsUploading, uploadSuccess, setUploadSuccess } = useContext(AppContext);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFiles((prevFiles) => [...prevFiles, selectedFile]); // Update this line to use setFiles
            handleUpload(selectedFile); // Start upload process
        }
    };

    const handleUpload = (selectedFile) => {
        setIsUploading(true);
        
        // Simulate file upload process (replace this with your actual upload logic)
        setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(true);
            // Optionally notify parent component about the successful upload
            // onFileUpload(selectedFile);
        }, 2000); // Simulating a 2-second upload
    };

    const handleCloseConfirmation = () => {
        setUploadSuccess(false); // Close the confirmation popup
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== selectedFile.name)); // Reset the file state if needed
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
                            {files.length > 0 ? 'Upload' : 'Upload'}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".doc,.pdf,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                    {files.length > 0 && (
                        <div className="text-sm text-gray-600 mt-2">{files[files.length - 1].name}</div>
                    )}
                </div>
                <div className="text-sm text-gray-600 text-center">
                    Supported formats: PDF, DOC, DOCX
                </div>
            </div>
        </div>
    );
}
