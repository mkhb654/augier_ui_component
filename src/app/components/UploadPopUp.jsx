'use client'; // Ensure this is a client-side component

export default function UploadPopup() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col items-center justify-center w-[350px] h-[300px] bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-purple-600 mt-3 ">Uploading your Capability Statement...</h2>
        {/* Spinner */}
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
} 
