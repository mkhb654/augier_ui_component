'use client';
import { createContext, useContext, useState } from 'react';

// Create a context for the app
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // State variables
    const [searchText, setSearchText] = useState('');
    const [selectedCodes, setSelectedCodes] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [selectedPSC, setSelectedPSC] = useState('');
    const [selectedTypeOfSetAside, setSelectedTypeOfSetAside] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isEmailNotificationsChecked, setIsEmailNotificationsChecked] = useState(true);
    const [files, setFiles] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isChecked, setIsChecked] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [data, setData] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [error, setError] = useState('');
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [favoritedItems, setFavoritedItems] = useState({}); // New state for managing favorited items
    const [results, setResults] = useState([]); // Add this
    const toggleFilters = () => setShowFilters(!showFilters);
    
    const addFiles = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const removeFilter = (type) => {
        setAppliedFilters((prev) => prev.filter((filter) => filter.type !== type));
        switch (type) {
            case 'codes':
                setSelectedCodes([]);
                break;
            case 'startDate':
                setSelectedStartDate('');
                break;
            case 'endDate':
                setSelectedEndDate('');
                break;
            case 'PSC':
                setSelectedPSC('');
                break;
            case 'typeOfSetAside':
                setSelectedTypeOfSetAside('');
                break;
            case 'searchText':
                setSearchText('');
                break;
            default:
                break;
        }
    };

    const applyFilters = () => {
      const filters = [];
      if (selectedCodes.length > 0) filters.push({ label: `Codes: ${selectedCodes.join(', ')}`, type: 'codes' });
      if (selectedStartDate) filters.push({ label: `Start Date: ${selectedStartDate}`, type: 'startDate' });
      if (selectedEndDate) filters.push({ label: `End Date: ${selectedEndDate}`, type: 'endDate' });
      if (selectedPSC) filters.push({ label: `PSC: ${selectedPSC}`, type: 'PSC' });
      if (selectedTypeOfSetAside) filters.push({ label: `Set Aside: ${selectedTypeOfSetAside}`, type: 'typeOfSetAside' });

      setAppliedFilters(filters);
      toggleFilters();
    };

    const toggleFavorite = (noticeId) => {
        setFavoritedItems((prev) => {
            const updated = { ...prev };
            if (updated[noticeId]) {
                delete updated[noticeId]; // Remove favorite if already present
            } else {
                updated[noticeId] = true; // Mark as favorite
            }
            return updated;
        });
    };

    return (
        <AppContext.Provider
            value={{
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
               
                isEmailNotificationsChecked,
                setIsEmailNotificationsChecked,
                isChecked,
                setIsChecked,
                removeFilter,
                files,
                addFiles,
                removeFile,
                selectedTemplate,
                setSelectedTemplate,
                showFilters,
                setShowFilters,
                data,
                setData,
                filteredOptions,
                setFilteredOptions,
                error,
                setError,
                isSearchClicked,
                setIsSearchClicked,
                applyFilters, // Expose applyFilters to context
                toggleFilters,
                favoritedItems, // Expose favorites state
                setFavoritedItems, 
                toggleFavorite, // Expose toggleFavorite function,
                results,
                setResults,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for using the app context
export const useAppContext = () => {
    return useContext(AppContext);
};

// Export AppContext for direct access if needed
export { AppContext };
