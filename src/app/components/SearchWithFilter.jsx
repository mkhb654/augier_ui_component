'use client'
import React, { useState, useEffect } from 'react';
import FilterComponent from './FilterComponent';
import SideBar from './SideBar';
import SearchResults from './SearchResults';

export default function SearchWithFilter() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCodes, setSelectedCodes] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedPSC, setSelectedPSC] = useState('');
  const [selectedTypeOfSetAside, setSelectedTypeOfSetAside] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [data, setData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchResults, setResults] = useState([]);

  const toggleFilters = () => setShowFilters(!showFilters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.augierai.com/api/daily-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setFilteredOptions(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleFilters = () => {
    const filters = [];

    if (selectedCodes.length > 0) filters.push({ label: `Codes: ${selectedCodes.join(', ')}`, type: 'codes' });
    if (selectedStartDate) filters.push({ label: `Start Date: ${selectedStartDate}`, type: 'startDate' });
    if (selectedEndDate) filters.push({ label: `End Date: ${selectedEndDate}`, type: 'endDate' });
    if (selectedPSC) filters.push({ label: `PSC: ${selectedPSC}`, type: 'PSC' });
    if (selectedTypeOfSetAside) filters.push({ label: `Set Aside: ${selectedTypeOfSetAside}`, type: 'typeOfSetAside' });
    setAppliedFilters(filters);
    toggleFilters();
    // Apply filters to the data
    const filteredData = data.filter(item => {
      return filters.every(filter => {
        if (filter.type === 'codes') return selectedCodes.some(code => item.codes?.includes(code));
        if (filter.type === 'startDate') return new Date(item.startDate) >= new Date(selectedStartDate);
        if (filter.type === 'endDate') return new Date(item.endDate) <= new Date(selectedEndDate);
        if (filter.type === 'PSC') return item.PSC === selectedPSC;
        if (filter.type === 'typeOfSetAside') return item.typeOfSetAside === selectedTypeOfSetAside;

        return true;
      });
    });
    setFilteredOptions(filteredData);
    console.log("Filtered::", filteredData)
  };

  const handleSearch = () => {
    // If there are no applied filters and no search text, return an empty array
    console.log("appliedFilters:::", appliedFilters);
    console.log("search Text:::", searchText);
    if (appliedFilters.length === 0 && !searchText) {
      setResults([]);// Exit the function early
    }
    else {

      const matchesFilters = (notice) => {
        // Check if the notice matches the applied filters
        return appliedFilters.every((filter) => {
          const { type, label } = filter;

          switch (type) {
            case 'codes':
              const codes = label.replace('Codes: ', '').split(', ').map(code => code.trim());
              return codes.includes(notice.naics_code);

            case 'startDate':
              return new Date(notice.posted_date) >= new Date(label.replace('Start Date: ', ''));

            case 'endDate':
              return new Date(notice.posted_date) <= new Date(label.replace('End Date: ', ''));

            case 'typeOfSetAside':
              return notice.type_of_set_aside === label.replace('Set Aside: ', '');

            case 'PSC': // New case for PSC code]
              const pscCodes = label.replace('PSC: ', '').split(', ').map(code => code.trim());
              return pscCodes.some(code => notice.summary.includes(code)); // Match in the summary

            default:
              return false; // If no matching filter type, exclude the notice
          }
        });
      };

      const matchesSearchText = (notice) => {
        const lowercasedSearchText = searchText.toLowerCase();
        const noticeTitle = notice.title.toLowerCase();
        const noticeSolicitationNumber = notice.solicitation_number.toLowerCase();

        return (
          noticeTitle.includes(lowercasedSearchText) ||
          noticeSolicitationNumber.includes(lowercasedSearchText)
        );
      };


      // Start with filtering based on the applied filters
      let filteredResults = data.filter(matchesFilters);

      // If there is a searchText, further filter the already filtered results
      if (searchText) {
        filteredResults = filteredResults.filter(matchesSearchText);
      }

      // Set the results; if no matches, it will be an empty array
      setResults(filteredResults);
      console.log("Filtered Options::", filteredResults);
    }

    setAppliedFilters([]);
    setSelectedCodes('');
    setSelectedStartDate('');
    setSelectedEndDate('');
    setSelectedPSC('');
    setSelectedTypeOfSetAside('');
    setIsSearchClicked(true); // Set search button clicked state
  };



  const removeFilter = (type) => {
    setAppliedFilters(appliedFilters.filter((filter) => filter.type !== type));

    if (type === 'codes') setSelectedCodes('');
    if (type === 'startDate') setSelectedStartDate('');
    if (type === 'endDate') setSelectedEndDate('');
    if (type === 'PSC') setSelectedPSC('');
    if (type === 'typeOfSetAside') setSelectedTypeOfSetAside('');
    if (type === 'searchText') setSearchText('')

  };



  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <img src="/imgs/augier-logo.jpg" alt="Logo" className="h-10" />
        </div>
        <div className="flex items-center">
          <img src="/imgs/augier-logo.jpg" alt="User Avatar" className="h-8 w-8 rounded-full" />
          <span className="ml-2 text-gray-700">Hello, User</span>
        </div>
      </header>

      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 p-10">
          <div className="mb-8 p-4">
            <h1 className="text-3xl text-purple-600 font-semibold">Find Opportunities</h1>
            <div className="mt-2 text-sm text-gray-600">
              Land your dream Government Contract in just a few steps. AugierAi search is at your service.
            </div>
          </div>

          <div className="flex items-center text-gray-800 justify-between mb-8 space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by Title or Solicitation Number"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required // Make the field required
              />
            </div>
            <button
              onClick={handleSearch}
              className={`px-6 py-2 ${searchText ? 'bg-purple-600 text-white' : 'bg-purple-500 text-gray-200'} rounded-lg shadow-md hover:bg-purple-500`}
              disabled={!searchText} // Disable when searchText is empty
            >
              Search
            </button>

            <button
              onClick={toggleFilters}
              className="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg shadow-md hover:bg-purple-100"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {appliedFilters.length > 0 && (
              <div className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                {appliedFilters.slice(0, 2).map((filter, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{filter.label}</span>
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => removeFilter(filter.type)}
                    >
                      &#x2716;
                    </button>
                  </span>
                ))}
                {appliedFilters.length > 2 && (
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                    +{appliedFilters.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center flex-1">
            <div className={` ${showFilters ? 'w-3/4' : 'w-full'}`}>
              {isSearchClicked && searchResults.length > 0 ? (
                <SearchResults results={searchResults} searchText={searchText} />
              ) : (
                <div className="flex flex-col items-center">
                  <img src="/imgs/binocular.png" alt="Binoculars" className="w-25 h-25 mb-4" />
                  <div className="text-gray-600">It's so empty here, let's find something exciting!</div>
                </div>
              )}
            </div>
            {showFilters && (
              <div className="w-1.5/4 ">
                <FilterComponent
                  applyFilters={handleFilters}
                  selectedCodes={selectedCodes}
                  setSelectedCodes={setSelectedCodes}
                  selectedStartDate={selectedStartDate}
                  setSelectedStartDate={setSelectedStartDate}
                  selectedEndDate={selectedEndDate}
                  setSelectedEndDate={setSelectedEndDate}
                  selectedPSC={selectedPSC}
                  setSelectedPSC={setSelectedPSC}
                  selectedTypeOfSetAside={selectedTypeOfSetAside}
                  setSelectedTypeOfSetAside={setSelectedTypeOfSetAside}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
