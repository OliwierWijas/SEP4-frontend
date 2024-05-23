import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [claims, setClaims] = useState(null);

  useEffect(() => {
    const storedClaims = JSON.parse(localStorage.getItem('claims'));
    if (storedClaims) {
      setClaims(storedClaims);
    }
  }, []);

  useEffect(() => {
    if (claims) {
      localStorage.setItem('claims', JSON.stringify(claims));
    }
  }, [claims]);

  return (
    <AuthContext.Provider value={{ claims, setClaims }}>
      {children}
    </AuthContext.Provider>
  );
};
