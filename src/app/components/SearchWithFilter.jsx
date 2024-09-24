'use client';
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import FilterComponent from './FilterComponent';
import SearchResults from './SearchResults';
import SideBar from './SideBar';

export default function SearchWithFilter() {
  const {
    showFilters,
    setShowFilters,
    searchText,
    setSearchText,
    selectedCodes,
    setSelectedCodes,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    selectedPSC,
    setSelectedPSC,
    selectedTypeOfSetAside,
    setSelectedTypeOfSetAside,
    appliedFilters,
    setAppliedFilters,
    data,
    setData,
    removeFilter,
    filteredOptions,
    setFilteredOptions,
    error,
    setError,
    isSearchClicked,
    setIsSearchClicked,
    setResults,
    toggleFilters,
    results,
    
  } = useAppContext(); // Use the context



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
  }, [setData, setFilteredOptions, setError]);

  const handleFilters = () => {
    const filters = [];
    if (selectedCodes.length > 0) filters.push({ label: `Codes: ${selectedCodes.join(', ')}`, type: 'codes' });
    if (selectedStartDate) filters.push({ label: `Start Date: ${selectedStartDate}`, type: 'startDate' });
    if (selectedEndDate) filters.push({ label: `End Date: ${selectedEndDate}`, type: 'endDate' });
    if (selectedPSC) filters.push({ label: `PSC: ${selectedPSC}`, type: 'PSC' });
    if (selectedTypeOfSetAside) filters.push({ label: `Set Aside: ${selectedTypeOfSetAside}`, type: 'typeOfSetAside' });

    setAppliedFilters(filters);
    toggleFilters();

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
  };

  const handleSearch = () => {
    if (appliedFilters.length === 0 && !searchText) {
      setResults([]);
      return;
    }

    const matchesFilters = (notice) => {
      return appliedFilters.every((filter) => {
        const { type, label } = filter;

        switch (type) {
          case 'codes':
            const codes = label.replace('Codes: ', '').split(', ').map(code => code.trim());
            return codes.includes(notice.naics_code);
          case 'startDate':
            const startDate = new Date(label.replace('Start Date: ', ''));
            const postedDate = new Date(notice.posted_date);
            return postedDate >= startDate;
          case 'endDate':
            const endDate = new Date(label.replace('End Date: ', ''));
            const responseDeadline = notice.response_deadline ? new Date(notice.response_deadline) : null;
            return responseDeadline ? responseDeadline <= endDate : false;
          case 'typeOfSetAside':
            return notice.type_of_set_aside === label.replace('Set Aside: ', '');
          case 'PSC':
            const pscCode = label.replace('PSC: ', '').trim();
            return notice.classification_code === pscCode;
          default:
            return false;
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

    let filteredResults = data.filter(matchesFilters);
    console.log("filtered::::;",filteredResults)
    if (searchText) {
      filteredResults = filteredResults.filter(matchesSearchText);
      
    }
    setResults(filteredResults);
    setSearchText('');
    setAppliedFilters([]);
    setSelectedCodes('');
    setSelectedStartDate('');
    setSelectedEndDate('');
    setSelectedPSC('');
    setSelectedTypeOfSetAside('');
    setIsSearchClicked(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <img src="/imgs/augier-logo.jpg" alt="Logo" className="h-10" />
        <div className="flex items-center">
          <img src="/imgs/augier-logo.jpg" alt="User Avatar" className="h-8 w-8 rounded-full" />
          <span className="ml-2 text-gray-700">Hello, User</span>
        </div>
      </header>

      <main className="flex flex-1 bg-gray-50 ">
        <SideBar />
        <div className="flex flex-col w-full p-10 space-y-4">
          {/* Added heading and description */}
          <div className="mb-4">
            <h1 className="text-3xl text-purple-600 font-semibold">Find Opportunities</h1>
            <div className="mt-2 text-sm text-gray-600">
              Land your dream Government Contract in just a few steps. AugierAi search is at your service.
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center flex-1 space-x-4">
              <input
                type="text"
                placeholder="Search by Title or Solicitation Number"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 w-[70%] text-gray-800"
                required
              />
              <div className="flex items-center space-x-2"> {/* Wrapped buttons in a div */}
                <button
                  onClick={handleSearch}
                  className={`px-4 py-2 ${searchText ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'} rounded-lg shadow-md`}
                >
                  Search
                </button>
                <button
                  onClick={toggleFilters}
                  className="px-3 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg shadow-md"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            </div>
            {appliedFilters.length > 0 && (
              <div className="flex items-center space-x-2 bg-gray-100 border border-gray-400 rounded-lg px-4 py-2">
                <span className="flex items-center text-black">
                  {appliedFilters.slice(0, 2).map((filter, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-200 text-black rounded-full text-sm flex items-center space-x-2 hover:bg-gray-300 transition duration-200">
                      <span className="truncate w-24">{filter.label}</span> {/* Adjust w-24 as needed */}
                      <button className="ml-2 text-red-500 hover:text-red-700 transition duration-200" onClick={() => removeFilter(filter.type)}>
                        &#x2716;
                      </button>
                    </span>
                  ))}
                  {appliedFilters.length > 2 && (
                    <span className="text-black">+{appliedFilters.length - 2} filters</span>
                  )}
                </span>
              </div>
            )}


          </div>

          <div className="flex flex-1 space-x-3">
            <div className={`flex-1 overflow-auto ${showFilters ? 'pr-4' : ''}`}>
              {isSearchClicked && results.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto"> {/* Set max height and enable scrolling */}
                  <SearchResults  />
                </div>
              ) : (
                <div className={`flex flex-col items-center justify-center h-full ${showFilters ? 'pr-4' : ''}`}>
                  <img src="/imgs/binocular.png" alt="Binoculars" className="w-25 h-25 mb-4" />
                  <div className="text-gray-600 text-center">It's so empty here, let's find something exciting!</div>
                </div>
              )}
            </div>
            {showFilters && (
              <div className="w-1.2/3 p-4 bg-white shadow-lg rounded-md overflow-auto">
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
        </div>
      </main>


    </div>
  );
}
