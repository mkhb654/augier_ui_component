import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useAppContext } from '../context/AppContext';

export default function FilterComponent() {
  const {
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
    applyFilters,
  } = useAppContext();

  const [naicsOptions, setNaicsOptions] = useState([]);
  const [typeOfSetAsideOptions, setTypeOfSetAsideOptions] = useState([]);
  const [pscOptions, setPscOptions] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.augierai.com/api/daily-data');
        const data = await response.json();

        // Extract unique NAICS code options
        const uniqueNaicsOptions = [
          ...new Set(data.map(item => ({ value: item.naics_code, label: item.naics_code })).filter(code => code.value)),
        ];
        setNaicsOptions(uniqueNaicsOptions);

        // Extract unique type_of_set_aside options
        const uniqueTypeOfSetAsideOptions = [
          ...new Set(data.map(item => item.type_of_set_aside).filter(type => type)),
        ].map(type => ({ value: type, label: type }));
        setTypeOfSetAsideOptions(uniqueTypeOfSetAsideOptions);

        // Extract unique PSC code options
        const uniquePscOptions = [
          ...new Set(data.map(item => item.classification_code).filter(psc => psc)),
        ].map(psc => ({ value: psc, label: psc }));
        setPscOptions(uniquePscOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCodesChange = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setSelectedCodes(values);
  };

  return (
    <div className="p-6 bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Select Filters</h2>
      <div className="text-sm mb-4 text-gray-800">A targeted search is the best search</div>
      <hr className="mb-4 border-gray-300" />
      <div className="space-y-4">

        {/* NAICS Codes Filter */}
        <div>
          <label className="block text-gray-800">Filter by NAICS codes:</label>
          <Select
            isMulti
            options={naicsOptions}
            value={naicsOptions.filter(option => selectedCodes.includes(option.value))}
            onChange={handleCodesChange}
            className="basic-single mt-2"
            classNamePrefix="select"
            placeholder="NAICS codes"
          />
        </div>

        {/* PSC Codes Filter */}
        <div>
          <label className="block text-gray-800">Filter by PSC Codes:</label>
          <Select
            options={pscOptions}
            value={pscOptions.find(option => option.value === selectedPSC) || null}
            onChange={(option) => setSelectedPSC(option ? option.value : '')}
            className="basic-single mt-2"
            classNamePrefix="select"
            placeholder="Select a PSC Code"
          />
        </div>

        {/* Date Filters */}
        <div>
          <label className="block text-gray-800">Filter by Date:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 text-gray-800 gap-4 mt-2">
            <input
              type="date"
              className="p-2 border rounded-md w-full"
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border rounded-md w-full"
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Type of Set Aside Filter */}
        <div>
          <label className="block text-gray-800">Filter by Type of Set Aside:</label>
          <Select
            options={typeOfSetAsideOptions}
            value={typeOfSetAsideOptions.find(option => option.value === selectedTypeOfSetAside) || null}
            onChange={(option) => setSelectedTypeOfSetAside(option ? option.value : '')}
            className="basic-single mt-2"
            classNamePrefix="select"
          />
        </div>

        {/* Apply Filters Button */}
        <button
          className="w-full py-2 mt-4 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-500 transition duration-200"
          onClick={applyFilters}
        >
          Apply Selected Filters
        </button>
      </div>
    </div>
  );
}
