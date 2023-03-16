import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDQ2FvK-xWye2tx6bJQbPw5_3IJ91BM-OQ',
  authDomain: 'mis-notas-816ee.firebaseapp.com',
  projectId: 'mis-notas-816ee',
  storageBucket: 'mis-notas-816ee.appspot.com',
  messagingSenderId: '544196621977',
  appId: '1:544196621977:web:6e1d696f34f898bff0aa08'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
