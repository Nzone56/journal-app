import { singInWithGoogle, registerUser, loginUser, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, logout, login } from "./authSlice"


export const chekingAuthentication = (email, password ) =>{
    return async ( dispatch ) => {

        dispatch( checkingCredentials() ); 

    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() ); 

        const result = await singInWithGoogle(); 
        console.log({ result })
        if( !result.ok ) return dispatch( logout( result.errorMessage ) ); 

        dispatch( login( result ) )

    }
}

export const startCreatingUser = ({ email, password, displayName }) =>{
    return async ( dispatch ) =>{ 

        dispatch( checkingCredentials()); 

       const { ok, uid, photoURL, errorMessage } = await registerUser({ email, password, displayName }); 
       if(!ok ) return dispatch( logout( {errorMessage} ) )

       dispatch( login({ uid, displayName, email, photoURL}))
    }
}

export const startLogin  = ({ email, password}) =>{
     return async ( dispatch ) => {
       dispatch(checkingCredentials());
        
       const {ok, uid, photoURL, errorMessage, displayName } = await loginUser( {email, password});
       if (!ok) return dispatch(logout({ errorMessage} ));

       dispatch(login({ uid, displayName, email, photoURL}));
        
      };
     
}

export const startLogout = () =>{

    return async( dispatch ) => {
        await logoutFirebase ();
        dispatch( clearNotesLogout() )
        dispatch( logout({}) ); 
    }

}