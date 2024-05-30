import React, { createContext, useState, useEffect } from 'react';
import { useLockState } from '../hooks/home/useLockState.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [claims, setClaims] = useState(null);
  const [isHouseLocked, setHouseLocked] = useState(false)

  const getLockState = useLockState();
  
  useEffect(() => {
    const storedClaims = JSON.parse(localStorage.getItem('claims'));
    if (storedClaims) {
      setClaims(storedClaims);
      const currentState = getLockState(storedClaims?.houseId, storedClaims?.token);
      setHouseLocked(!currentState)
    }
  }, []);

  useEffect(() => {
    if (claims) {
      localStorage.setItem('claims', JSON.stringify(claims));
    } else {
      localStorage.removeItem('claims');
    }
  }, [claims]);

  return (
    <AuthContext.Provider value={{ claims, setClaims, isHouseLocked, setHouseLocked }}>
      {children}
    </AuthContext.Provider>
  );
};
