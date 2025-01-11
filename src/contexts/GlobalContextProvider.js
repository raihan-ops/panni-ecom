'use client';

import { GET_ALL_SECTIONS_API_URL } from '../helpers/apiUrl';
import { MODE_BIKE, MODE_CAR } from '@/helpers/constant';
import api from '@/providers/Api';
import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function GlobalContextProvider({ children }) {
  const [mode, setMode] = useState(MODE_BIKE);
  const [allMode, setAllMode] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  const handleSwitch = (id) => {
    if (id) {
      setMode(id);
    } else {
      setMode((prevMode) => (prevMode === MODE_CAR ? MODE_BIKE : MODE_CAR));
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        mode,
        handleSwitch,
        allMode,
        brands,
        setBrands,
        setAllMode,
        setMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
