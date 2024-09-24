import { FaStar, FaRegStar } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { SparklesIcon } from '@heroicons/react/solid';

const SearchResults = () => {
  const { favoritedItems, setFavoritedItems, results } = useAppContext();

  const toggleFavorite = (noticeId) => {
    const updatedFavorites = { ...favoritedItems };
    if (updatedFavorites[noticeId]) {
      delete updatedFavorites[noticeId];
    } else {
      updatedFavorites[noticeId] = true;
    }
    setFavoritedItems(updatedFavorites);
  };

  return (
    <div className="mt-4 p-4">
      <h2 className="text-xl text-gray-800 font-bold mb-4">
        Found {results.length} Search {results.length === 1 ? 'Result' : 'Results'}
      </h2>
      {results.map((item) => (
        <div key={item.notice_id} className="border rounded-lg shadow-sm p-4 mb-4 bg-white transition duration-200 ease-in-out hover:shadow-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-purple-800 font-semibold text-lg">{item.title}</div>
             
            </div>
            
            <div className="flex-none">
            <div className="text-sm font-semibold text-gray-600">Due Date: {item.response_deadline}</div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between p-2">
            <div className="text-gray-700 font-bold border border-green-200 bg-green-50 text-sm flex justify-center items-center w-full md:w-auto rounded p-2">
              <span className="text-center">Summary</span>
              <span className="ml-2">
                <SparklesIcon className="h-4 w-4 text-green-500" />
              </span>
            </div>
          </div>

          <div className="text-gray-600 text-sm">{item.summary}</div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-gray-800">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="bg-gray-100 rounded-lg p-2 text-center text-xs">
                <span>NAICS Code: {item.naics_code}</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 text-center text-xs">
                <span>Solicitation Number: {item.solicitation_number}</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 text-center text-xs">
                <span>Office City: {item.office_city}</span>
              </div>
            </div>

            <div className="mt-2 md:mt-0">
              <div className="bg-purple-600 p-2 rounded-lg">
                <button onClick={() => toggleFavorite(item.notice_id)} className="text-yellow-500 flex items-center">
                  {favoritedItems[item.notice_id] ? <FaStar /> : <FaRegStar />}
                  <span className="ml-3 text-white font-bold text-sm">
                    {favoritedItems[item.notice_id] ? 'Remove' : 'Favourites'}
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
