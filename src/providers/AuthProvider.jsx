import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic()


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    //update user photo
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    //set user state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current User ----:', currentUser);
            setUser(currentUser);
            if (currentUser) {
                //get token and store token || as token is given to all user so use axiosPublic
                const userInfo = { email: currentUser.email };
                console.log('inside if');
                axiosPublic.post('/jwt', userInfo)
                    .then(response => {
                        if (response.data.token) {
                            localStorage.setItem('user-token', response.data.token);
                            setLoading(false); //Fix race condition
                        }
                    });
            }
            else {
                console.log('else condition executed');
                localStorage.removeItem('user-token');
                setLoading(false);  //Fix race condition
            }
        });
        return () => {
            unSubscribe();
        }

    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        signIn,
        googleSignIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;