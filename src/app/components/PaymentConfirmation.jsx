'use client';

import React, { useState } from 'react';
import CapabilityStatement from './CapabilityStatement';

const PaymentConfirmation = () => {
    const features = [
        "AI Powered Opportunity Search",
        "AI Proposal Writing Assistance",
        "Advanced Opportunity Matching",
        "Pipeline Management",
        "Keyword Tracking",
        "Automated RFP Parsing",
        "AI Insights",
        "Proposal Content Library",
        "Government Contract Database"
    ];

    const [isChecked, setIsChecked] = useState(true);
    const [showCapabilityStatement, setShowCapabilityStatement] = useState(true);

    const handleCheckboxChange = () => setIsChecked(prev => !prev);

    const handleSkip = () => setShowCapabilityStatement(false);

    const handleFileUpload = () => {
        setShowCapabilityStatement(false); // Hide CapabilityStatement
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header Section */}
            <header className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="flex items-center">
                    <img src="/imgs/augier-logo.jpg" alt="Logo" className="h-10" />
                    <h1 className="ml-3 text-xl font-bold text-gray-800">My Dashboard</h1>
                </div>
                <div className="flex items-center">
                    <img
                        src="/imgs/augier-logo.jpg"
                        alt="User Avatar"
                        className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-gray-700">Hello, User</span>
                </div>
            </header>

            {/* Main Content */}
            {showCapabilityStatement ? (
                <CapabilityStatement onSkip={handleSkip} onFileUpload={handleFileUpload} />
            ) : (
                <main className="flex-grow flex flex-col items-center justify-center p-4">
                    <div className="w-full max-w-4xl">
                        <div className="flex items-center mb-6">
                            <p className="text-xl text-gray-600 mr-2">Payment Received</p>
                            {/* Green Tick Icon */}
                            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" />
                            </svg>
                        </div>

                        <p className="text-2xl font-bold text-purple-800 mb-6">Congratulations on buying the Augier AI premium subscription!</p>

                        <p className="mb-6 text-lg text-gray-700 font-semibold">You got access to all premium features:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center text-gray-800 mb-2">
                                    <svg className="w-8 h-8 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <p>{feature}</p>
                                </div>
                            ))}
                        </div>

                        {/* Email Notifications Checkbox */}
                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                id="emailNotifications"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className="mr-3"
                            />
                            <label htmlFor="emailNotifications" className="text-gray-700">Receive email notifications about new features and updates</label>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button className="px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400">
                                Get Started
                            </button>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
};

export default PaymentConfirmation;
