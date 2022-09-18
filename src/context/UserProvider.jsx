import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore/lite";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(false);
        setUserData({});
      }
    });
  }, [user]);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", user.uid);
      const docSpan = await getDoc(docRef);
      if (docSpan.exists()) {
        setUserData({ ...docSpan.data() });
      } else {
        await setDoc(docRef, {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        setUser(true);
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const signOutUser = () => {
    signOut(auth);
  };

  const GoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const docRef = doc(db, "users", user.uid);
      const docSpan = await getDoc(docRef);
      if (docSpan.exists()) {
        setUserData({ ...docSpan.data() });
      } else {
        await setDoc(docRef, {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        setUser(true);
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        signOutUser,
        GoogleSignIn,
        userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

export const UserContext = createContext();
