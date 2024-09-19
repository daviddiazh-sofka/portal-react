import { FC, ReactNode, useContext, useEffect, useReducer } from "react"
import { ThemeProvider as ThemeProviderMUI } from '@emotion/react'
import { ThemeContext, ThemeMode } from "./ThemeContext"
import { themeReducer } from "./themeReducer";
import { lightTheme } from "../../../themes/light";
import { darkTheme } from "../../../themes/dark";

export interface ThemeState {
    mode: ThemeMode;
}

const INITIAL_STATE: ThemeState = {
    mode: 'system'
}

export const ThemeProvider: FC<{children: ReactNode}> = ({ children }) => {

    const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

    useEffect(() => {
        if(state.mode === 'system') {
            const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
            if (darkThemeMq.matches) {
                dispatch({type: 'Theme - Set', payload: {newStatus: 'dark'}});
            } else {
                dispatch({type: 'Theme - Set', payload: {newStatus: 'light'}});
            }
        }
    }, [state.mode])

    const setThemeMode = (newState: ThemeMode) => {
        dispatch({type: 'Theme - Set', payload: {newStatus: newState}});
    }

    return (
        <ThemeContext.Provider value={{
            ...state,
            setThemeMode
        }}>
            <ThemeProviderMUI theme={ state.mode === 'light' ? lightTheme : darkTheme }>
                { children }
            </ThemeProviderMUI>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);