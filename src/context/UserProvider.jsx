import { createContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { getDoc, setDoc, doc } from 'firebase/firestore/lite'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false)
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(true)
      if (user) {
        setUser(true)
        setLoading(false)
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      } else {
        setUser(false)
        setUserData({})
      }
    })
  }, [user])

  const registerUser = async (email, password, nombre) => {
    try {
      setLoading(true)
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const docRef = doc(db, 'users', user.uid)
      const docSpan = await getDoc(docRef)
      if (docSpan.exists()) {
        setUserData({ ...docSpan.data() })
      } else {
        await setDoc(docRef, {
          email: user.email,
          uid: user.uid,
          displayName: nombre,
          photoURL: user.photoURL
        })
        setUser(true)
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: nombre,
          photoURL: user.photoURL
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const loginUser = (email, password) => {
    try {
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const signOutUser = () => {
    signOut(auth)
  }

  const GoogleSignIn = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithRedirect(auth, provider)
      const docRef = doc(db, 'users', user.uid)
      const docSpan = await getDoc(docRef)
      if (docSpan.exists()) {
        setUserData({ ...docSpan.data() })
      } else {
        await setDoc(docRef, {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
        setUser(true)
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const ResetPassword = async () => {
    await sendPasswordResetEmail(auth, auth.currentUser.email)
  }

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
        setUserData,
        ResetPassword,
        loading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider

export const UserContext = createContext()
