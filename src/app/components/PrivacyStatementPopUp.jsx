'use client';

import { useContext } from 'react';
import { MdInfoOutline, MdWarning } from 'react-icons/md';
import { FaMagic, FaArrowRight } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const PrivacyStatementPopup = () => {
  const { isChecked, setIsChecked } = useContext(AppContext);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col justify-between bg-white shadow-md rounded-md w-[650px] min-h-[400px] p-4 relative">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>

        {/* Header Section */}
        <div className="flex items-center text-gray-800 text-lg mb-3 font-semibold">
          <MdInfoOutline className="mr-2 text-2xl text-purple-600" />
          <h1 className="text-lg">Your Privacy and Responsibility Matter to Us</h1>
        </div>

        {/* Privacy Statement */}
        <div className="text-gray-500 text-sm mb-4">
          <div>
            At AugierAI, we prioritize your privacy. Rest assured, our platform is secure, and we do not access or store your personal or proprietary information without your consent.
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-yellow-100 p-3 rounded-md mb-4">
          <div className="flex items-center text-red-600 mb-2">
            <MdWarning className="mr-2 text-lg" />
            <h2 className="text-md">Legal Disclaimer</h2>
          </div>
          <div className="text-gray-600 text-xs">
            <div>
              This proposal generation tool is provided as-is to assist in drafting proposals. Users are solely responsible for the content, accuracy, and compliance of any proposals created using this software.
              AugierAI does not guarantee the suitability of generated content for any specific purpose. Users must thoroughly review and verify all generated content before submission or use.
              AugierAI is not liable for any consequences resulting from the use of proposals created with this tool, including but not limited to errors, omissions, or non-compliance with RFP requirements.
            </div>
          </div>
        </div>

        {/* Checkbox Section */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={toggleCheckbox}
            className="mr-2 h-4 w-4"
          />
          <label className="text-gray-700 text-sm">Enabled and saved in the state variable</label>
        </div>

        {/* Start Generation Button */}
        <div className="flex justify-end mt-auto">
          <button className="flex items-center justify-center bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
            <FaMagic className="mr-2 text-sm" />
            <span>Start Generation</span>
            <FaArrowRight className="ml-2 text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyStatementPopup;

