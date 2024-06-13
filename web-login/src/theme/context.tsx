// src/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { indiaTheme, ukTheme, spainTheme, thailandTheme } from './index';

type ThemeContextType = {
  theme: Theme;
  setThemeName: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


const themeMap: { [key: string]: Theme } = {
  india: indiaTheme,
  uk: ukTheme,
  spain: spainTheme,
  thailand: thailandTheme,
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>('india');
  const theme = themeMap[themeName] || indiaTheme;

  return (
    <ThemeContext.Provider value={{ theme, setThemeName }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
