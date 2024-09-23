'use client';
import { useState } from 'react';
import { FaPlus, FaTrash, FaFilePdf, FaFileWord, FaArrowRight } from 'react-icons/fa';
import PrivacyStatementPopup from './PrivacyStatementPopUp';

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [files, setFiles] = useState([]);
  const [isNext, setIsNext] = useState(false);

  const templates = [
    { id: 1, title: 'Sources Sought / Request for Information', description: 'A Request for Proposal (RFP) is a formal document used by the government to solicit proposals from contractors for a product, project, or service.' },
    { id: 2, title: 'Request for Proposal (RFP)', description: 'Request for Quotation (RFQ) invites suppliers or contractors to submit price bids for products or services.' },
    { id: 3, title: 'Request for Quotation (RFQ)', description: 'A sources sought notice is used by agencies to solicit interest in a project under consideration by that agency.' },
  ];

  const handleSelect = (id) => setSelectedTemplate(id);
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).filter((file) =>
      ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
    );
    setFiles([...files, ...uploadedFiles]);
    e.target.value = ''; // Clear file input after selection
  };

  const handleFileRemove = (indexToRemove) => setFiles(files.filter((_, index) => index !== indexToRemove));
  const handleContinue = () => setIsNext(true);

  if (isNext) return <PrivacyStatementPopup />;


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-md w-[600px] p-4"> {/* Reduced width and padding */}
        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-1 rounded-full mb-4">
          <div className="bg-purple-600 h-1 rounded-full" style={{ width: '50%' }}></div>
        </div>

        <h1 className="text-xl font-bold text-gray-800">Choose Template</h1>
        <div className="text-sm text-gray-500 mb-2">Create documents that win</div>
        <div className="text-sm text-gray-500 mb-2">
          <span className="text-red-500">*</span> Select template
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"> {/* Reduced gap */}
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelect(template.id)}
              className={`border p-2 rounded-md cursor-pointer ${
                selectedTemplate === template.id ? 'border-purple-500' : 'border-gray-300'
              } hover:border-purple-500 transition-colors`}
            >
              <h2 className="text-sm font-semibold text-gray-800">{template.title}</h2>
              <div className="text-xs text-gray-500 mt-1">{template.description}</div> {/* Reduced text size */}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 py-3">
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex flex-col border-dashed border-2 border-gray-300 p-3 rounded-md w-full"> {/* Reduced padding */}
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-gray-800 font-medium text-sm">Add Capability Statement</h3>
                  <div className="text-xs text-gray-500">Get personalized content curated for your business</div>
                </div>
                <div className="relative flex justify-end">
                <button className="p-1 border border-gray-300 rounded-full relative flex items-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <FaPlus className="h-4 w-4 text-gray-500" /> {/* Smaller icon */}
                </button>
              </div>
              </div>
              

              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2"> {/* Reduced gap */}
                  {files.map((file, index) => {
                    let FileIcon = file.type.includes('pdf') ? FaFilePdf : FaFileWord;
                    return (
                      <div key={index} className="flex items-center space-x-1 border border-gray-200 rounded-md p-1 bg-gray-50"> {/* Reduced padding */}
                        <FileIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-xs text-gray-700">{file.name}</span> {/* Reduced text size */}
                        <button onClick={() => handleFileRemove(index)} className="focus:outline-none">
                          <FaTrash className="h-4 w-4 text-red-400 hover:text-red-600" /> {/* Smaller icon */}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-purple-600 text-white px-4 py-1.5 rounded-md font-semibold hover:bg-purple-700 flex items-center text-sm" 
              disabled={!selectedTemplate || files.length === 0}
              onClick={handleContinue}
            >
              Continue
              <FaArrowRight className="ml-2 h-4 w-4" /> {/* Smaller icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
