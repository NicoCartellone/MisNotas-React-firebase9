import { useState } from 'react'
import { db, auth } from '../firebase'
import { addDoc, collection, deleteDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore/lite'

export const useFirestore = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState({})

  const today = new Date()
  const now = today.toLocaleString()

  const getData = async (uid) => {
    try {
      setLoading(prev => ({ ...prev, getData: true }))
      const dataRef = collection(db, `users/${uid}/notas`)
      const q = query(dataRef, where('uid', '==', auth.currentUser.uid))
      const querySnapshot = await getDocs(q)
      const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setData(dataDB)
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(prev => ({ ...prev, getData: false }))
    }
  }

  const addData = async (titulo, nota, uid) => {
    try {
      setLoading(prev => ({ ...prev, addData: true }))
      const collectionRef = collection(db, `users/${uid}/notas`)
      const payload = {
        titulo,
        nota,
        uid: auth.currentUser.uid,
        fecha: now
      }
      const docRef = await addDoc(collectionRef, payload)
      const id = docRef.id
      const newPayload = ({ ...payload, id })
      setData([newPayload, ...data])
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(prev => ({ ...prev, addData: false }))
    }
  }

  const deletNota = async (id, uid) => {
    try {
      setLoading((prev) => ({ ...prev, [id]: true }))
      const docRef = doc(db, `users/${uid}/notas`, id)
      await deleteDoc(docRef)
      setData(data.filter(item => item.id !== id))
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  const updateData = async (newId, titulo, nota, uid) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true }))
      const docRef = doc(db, `users/${uid}/notas`, newId)
      await updateDoc(docRef, ({ titulo, nota }))
      setData(data.map(item => item.id === newId ? ({ ...item, titulo, nota, fecha: now }) : item))
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }))
    }
  }

  return {
    data,
    error,
    loading,
    getData,
    addData,
    deletNota,
    updateData
  }
}
