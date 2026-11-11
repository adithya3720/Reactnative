import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const lightTheme = {
        background: '#F5F9FC',
        card: '#FFFFFF',
        text: '#17202A',
        secondaryText: '#64748B',
        primary: '#078DD3',
        border: '#E2E8F0',
    };
     const darkTheme= {
        background: '#101827',
        card:'#1E293B',
        text: '#FFFFFF',
        secondaryText: '#CBD5E1',
        primary: '#078DD3',
        border: '#334155',
     };

    const theme = isDark ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setIsDark(previous => !previous);
    };
  return (
   <ThemeContext.Provider value={{ theme, isDark, toggleTheme}}>
    {children}
   </ThemeContext.Provider>
  );
};


export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error('useTheme must be used inside ThemeProvider');
    };
    return context;
};