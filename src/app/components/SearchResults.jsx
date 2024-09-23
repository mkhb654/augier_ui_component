import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const SearchResults = ({ results, searchText }) => {
    // Create an array to hold the favorite states
    const [favoritedItems, setFavoritedItems] = useState(
        Array(results.length).fill(false) // Initialize all to false
    );

    const toggleFavorite = (index) => {
        // Create a copy of the current favoritedItems
        const updatedFavorites = [...favoritedItems];
        updatedFavorites[index] = !updatedFavorites[index]; // Toggle favorite status
        setFavoritedItems(updatedFavorites);
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl text-gray-800 font-bold mb-4">
                Found {results.length} Search {results.length === 1 ? 'Result' : 'Results'}
            </h2>
            {results.map((item, index) => (
                <div key={item.notice_id} className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <div className="text-purple-800 font-semibold text-lg">{item.title}</div>
                        </div>
                        <div className="text-sm text-gray-600">Due Date: {item.posted_date}</div>
                    </div>

                    <div className="mt-2 flex items-center">
                        <span className="font-semibold text-gray-700 text-sm">Summary:</span>
                        <span className="ml-1 text-sm">
                            <i className="fas fa-info-circle"></i>
                        </span>
                    </div>
                    <div className="text-gray-600 text-sm">{item.summary}</div>

                    <div className="flex justify-between items-center mt-4 text-gray-800">
                        <div className="flex space-x-2">
                            <div className="bg-gray-100 rounded-lg p-2 text-center flex-none text-xs">
                                <span>NAICS Code: {item.naics_code}</span>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-2 text-center flex-none text-xs">
                                <span>Solicitation Number: {item.solicitation_number}</span>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-2 text-center flex-none text-xs">
                                <span>Office City: {item.office_city}</span>
                            </div>
                        </div>

                        <div className="ml-4">
                            <div className="bg-purple-400 p-2 rounded-lg">
                                <button onClick={() => toggleFavorite(index)} className="text-white flex items-center">
                                    {favoritedItems[index] ? <FaStar /> : <FaRegStar />}
                                    <span className="ml-1 text-sm">
                                        {favoritedItems[index] ? 'Remove from Bid Pipeline' : 'Add to Bid Pipeline'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
