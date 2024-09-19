import { IUser } from "./AuthContext";
import { AuthInitialState } from "./AuthProvider";

type AuthActionTypes = 
|   { type: 'Auth - Login', payload: IUser }
|   { type: 'Auth - Logout' }

export const authReducer = ( state: AuthInitialState, action: AuthActionTypes ): AuthInitialState => {

    switch( action.type ){
       case 'Auth - Login':
           return {
               ...state,
               status: 'authenticated',
               user: {
                displayName: action.payload.displayName,
                email: action.payload.email,
                photoURL: action.payload.photoURL,
                uid: action.payload.uid,
               },
               token: localStorage.getItem('token') || action.payload.accessToken!,
           }
        case 'Auth - Logout':
            return {
                ...state,
                user: undefined,
                token: undefined,
                status: 'not-authenticated',
            }

       default:
           return state;
    }

}