// PaymentConfirmationPage.js
'use client';

import React from 'react';
import { useAppContext } from '../context/AppContext';

const PaymentConfirmationPage = () => {
    const { isEmailNotificationsChecked, setIsEmailNotificationsChecked } = useAppContext(); // Use context

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

    const handleCheckboxChange = () => setIsEmailNotificationsChecked(prev => !prev); // Update the context state

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
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                    <div className="flex items-center mb-6">
                        <div className="text-xl text-gray-600 mr-2">Payment Received</div>
                        {/* Green Tick Icon */}
                        <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 5-5" />
                        </svg>
                    </div>

                    <div className="text-2xl font-bold text-purple-800 mb-6">Congratulations on buying the Augier AI premium subscription!</div>

                    <div className="mb-6 text-lg text-gray-700 font-semibold">You got access to all premium features:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center text-gray-800 mb-2">
                                <svg
                                    className="w-10 h-10 text-green-500" 
                                    fill="none" 
                                    stroke="currentColor"
                                    strokeWidth="2" 
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 12l2 2 5-5"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div>{feature}</div>
                            </div>
                        ))}
                    </div>

                    {/* Email Notifications Checkbox */}
                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            id="emailNotifications"
                            checked={isEmailNotificationsChecked}
                            onChange={handleCheckboxChange}
                            className="mr-3"
                        />
                        <label htmlFor="emailNotifications" className="text-gray-700 font-bold text-purple-800">I want to receive emails about the Daily's Opportunities and Market insights (Recommended)</label>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400">
                            Get Started
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PaymentConfirmationPage;
