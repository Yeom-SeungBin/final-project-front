import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchConditions, setSearchConditions] = useState({
    selectedArea: '',
    selectedSubArea: '',
    facilitySearch: '',
    isSearchClicked: false,
  });

  return (
    <SearchContext.Provider
      value={{ searchConditions, setSearchConditions }}
    >
      {children}
    </SearchContext.Provider>
  );
};
