import { FC, ReactNode, useContext, useEffect, useReducer } from "react"
import { AuthContext, AuthStatus, IUser } from './AuthContext';
import { authReducer } from "./authReducer";
import { signOutWithGoogle } from "../../lib/firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { firebaseAuth } from "../../lib/firebase/config";
import { CircularProgress } from "@mui/material";

export interface AuthInitialState {
    user: IUser | undefined;
    token: string | undefined;
    status: AuthStatus;
}

const INITIAL_STATE: AuthInitialState = {
    user: undefined,
    token: undefined,
    status: 'checking',
}

export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
    
    const [ state, dispatch ] = useReducer(authReducer, INITIAL_STATE);

    const login = async (user: IUser) => {
        // connection with backend

        dispatch({type: 'Auth - Login', payload: user});
    }

    const logout = async () => {
        await signOutWithGoogle();
        dispatch({type: 'Auth - Logout'});
    }

    const getUser = () => {
        return new Promise((resolve) => {
          onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
              resolve(user);
            } else {
              resolve(null);
              dispatch({type: 'Auth - Logout'});
            }
          });
        });
    };
    
    useEffect(() => {
        getUser().then((user) => {
            if (user) {
                login(user as IUser);
            }
        });
    }, [])

    if (state.status === 'checking') return <CircularProgress />

    return (
        <AuthContext.Provider value={{
            ...state,

            login,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);