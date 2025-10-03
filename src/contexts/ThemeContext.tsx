import React, {createContext, ReactNode, useMemo, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import {themes, ThemeType} from '../styles/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
    theme: ThemeType;
}

export const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => {
    },
    theme: themes.light,
});

interface CustomThemeProviderProps {
    children: ReactNode;
}

export const CustomThemeProvider = ({children}: CustomThemeProviderProps) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const toggleTheme = () => {
        setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(() => themes[themeMode], [themeMode]);

    return (
        <ThemeContext.Provider value={{mode: themeMode, toggleTheme, theme}}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};