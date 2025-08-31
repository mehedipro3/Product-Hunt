import { createContext, useEffect, useState } from "react";
import { app } from "../FireBase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hook/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const CreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const SingIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        //get token and store client site
        const userInfo = { email: currentUser.email }
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('Access-Token', res.data.token);
              setLoading(false);
            }
          })
      }
      else {
        //Remove Token
        localStorage.removeItem('Access-Token');
        setLoading(false);
      }

    });

    return () => unsubscribe();
  }, [axiosPublic]);



  const authInfo = {
    user,
    loading,
    CreateUser,
    SingIn,
    logOut,
    updateUserProfile,
    googleLogin
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;