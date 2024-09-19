import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    type User
} from 'firebase/auth'  
import { firebaseAuth } from './config';

export function listenToAuthState(callback: (user: User | null) => void) {
    const auth = getAuth()
    return onAuthStateChanged(auth, callback)
  }
  export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
  
    provider.setCustomParameters({
      prompt: 'select_account',
    });
  
    const emailRegex = /@sofka\.(com\.co|us)$/
    const result = await signInWithPopup(firebaseAuth, provider)
    const user = result.user
  
    const resp = await fetch('https://script.google.com/macros/s/AKfycbw3FO0_tr-gwVp6gbF-rMOcGmu80IRhr2fSlMtmk-M72dM_WcaLPQ_-7FIVGhqAdIns/exec?apiKey=OZPetSXrrmOxRSadj2KzQocrc9sbp0', {
      method: 'GET'
    });
    const allowedUsers = await resp.json();
  
    if (!result || !user || !user.email || !emailRegex.test(user.email) || !allowedUsers.includes(user.email)) {
      if (user) {
        await user.delete()
      }
      await firebaseAuth.signOut()
      //   toast.error('Correo no autorizado')
      console.log('correo no autorizado')
      return null
    }
  
    return result.user.uid
  }
  
  export async function signOutWithGoogle() {
    try {
      await firebaseAuth.signOut()
    } catch (error) {
        console.log({error})
        //   toast.error(getMessageFromCode('UNKNOWN_ERROR'))
    }
}