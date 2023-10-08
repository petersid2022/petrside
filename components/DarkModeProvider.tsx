import React, { createContext, useEffect, useContext, useState } from 'react';
import cookie from 'js-cookie';

interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = (): DarkModeContextType => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};

interface DarkModeProviderProps {
    children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const darkModeCookie = cookie.get('darkMode');
        if (darkModeCookie === '1') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        cookie.set('darkMode', isDarkMode ? '0' : '1');
    };
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

