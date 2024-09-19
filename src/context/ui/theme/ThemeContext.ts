import { createContext } from "react";

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextProps {
    mode: ThemeMode;
    setThemeMode: (newStatus: ThemeMode) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);