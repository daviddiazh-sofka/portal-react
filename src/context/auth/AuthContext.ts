import { createContext } from 'react';

export type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

export interface IUser {
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    uid: string | null;
    accessToken?: string | null; // not use this
}

interface AuthStateProps {
    user: IUser | undefined;
    token: string | undefined;
    status: AuthStatus;

    login: (user: IUser) => void;
    logout: () => Promise<void>;
    // enrolment: (user: ) => void;
}

export const AuthContext = createContext({} as AuthStateProps);