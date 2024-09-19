import { ThemeMode } from "./ThemeContext";
import { ThemeState } from "./ThemeProvider";

type ThemeActionTypes = 
|   { type: 'Theme - Set', payload: { newStatus: ThemeMode } }

export const themeReducer = ( state: ThemeState, action: ThemeActionTypes ): ThemeState => {

    switch( action.type ){
        case 'Theme - Set':
           return {
               ...state,
               mode: action.payload.newStatus,
           }
        default:
           return state;
    }
}