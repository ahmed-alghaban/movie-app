import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, onAuthStateChanged,
    signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut,
    updateProfile, sendPasswordResetEmail
} from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth } from '../utils/firbase';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Register user and update displayName
    const registerUser = async (email, password, displayName) => {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName });
            setCurrentUser({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            });
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Sign in user
    const signIn = async (email, password) => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Google Sign-In (Popup)
    const signUpProvider = async () => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setCurrentUser({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            });
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Google Sign-In (Redirect)
    const signUpProviderRedirect = async () => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Sign Out
    const logOut = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            setCurrentUser(null);
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Forgot password
    const forgotPassword = async (email) => {
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            } else {
                setCurrentUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            isLoading,
            registerUser,
            signIn,
            signUpProvider,
            signUpProviderRedirect,
            logOut,
            forgotPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

