import React, {useState} from 'react';
import {ThemeProvider as SCThemeProvider} from 'styled-components'
import {dark, light} from "./index";

const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({isDark: null, toggleTheme: () => null})

const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
            return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
        }

        return false
    })

    const toggleTheme = () => {
        setIsDark((prevState) => {
            localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
            return !prevState
        })
    }

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            <SCThemeProvider theme={isDark ? dark : light}>{children}</SCThemeProvider>
        </ThemeContext.Provider>
    );
};

export {ThemeContext, ThemeProvider};