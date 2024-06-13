


import React, { ReactNode, createContext, useContext, useState } from 'react';
import { indiaTheme, ukTheme, spainTheme, thailandTheme } from './themes';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { PaperProvider } from 'react-native-paper';

type ThemeContextType = {
  theme: ThemeProp;
  setThemeName: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


const themeMap: { [key: string]: ThemeProp } = {
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
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
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
