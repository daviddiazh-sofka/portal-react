import { useAuth } from "../context/auth/AuthProvider";
import { listenToAuthState, signInWithGoogle } from "../lib/firebase/auth";

export const useLogin = () => {
    // const { setLoading } = useLoading();

    const { login } = useAuth();
  
    const handleSignIn = async () => {
    //   setLoading(true);
      try {
        const auth = await signInWithGoogle();
        if (auth) {
          listenToAuthState(function (user) {
            const emailRegex = /@sofka\.(com\.co|us)$/;
            if (user && emailRegex.test(user.email ?? '')) {
              login(user);
            }
          });
        }
      } catch (error) {
        console.error('Error signing in:', error);
      } finally {
        // setLoading(false);
      }
    };
  
    return { handleSignIn };
}