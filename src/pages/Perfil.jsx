import { UserContext } from '../context/UserProvider'
import { useContext, useState, useRef } from 'react'
import { auth, db, storage } from '../firebase'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'

import Title from '../../../../src/components/Title'
import Button from '../../../../src/components/Button'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore/lite'

const Perfil = () => {
  const { userData, setUserData, setUser, ResetPassword } =
    useContext(UserContext)
  const [profileUrl, setProfileUrl] = useState(null)
  const fileRef = useRef()

  const handleOpenFilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }

  const handleChangeFile = async (e) => {
    if (e.target.files[0].size < 1048576) {
      const file = e.target.files[0]
      const res = await setUserProfilePhoto(auth.currentUser.uid, file)
      if (res) {
        const tmpUser = { ...userData }
        tmpUser.photoURL = res.metadata.fullPath
        const url = await getProfilePhotoUrl(tmpUser.photoURL)
        await updateProfile(auth.currentUser, {
          photoURL: url
        })
        tmpUser.photoURL = url
        setUserData({ ...tmpUser })
        const updateRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(updateRef, {
          photoURL: url
        })
        setUser(true)
        setProfileUrl(url)
      }
    } else {
      console.log('tamaño de imagen superda')
    }
  }

  const setUserProfilePhoto = async (uid, file) => {
    try {
      const imageRef = ref(storage, `photoProfile/${uid}`)
      const resUpload = await uploadBytes(imageRef, file)
      return resUpload
    } catch (error) {
      console.log(error)
    }
  }

  const getProfilePhotoUrl = async (photoURL) => {
    try {
      const imageRef = ref(storage, photoURL)
      const url = await getDownloadURL(imageRef)
      return url
    } catch (error) {
      console.log(error)
    }
  }

  const handleResetPassword = async () => {
    await ResetPassword()
  }

  return (
    <div>
      <div>
        <Title text='Perfil' />
      </div>

      <div className='mt-5'>
        <div className='flex justify-center'>
          {profileUrl
            ? (
              <img
                className='w-32 h-32 rounded-full shadow-md'
                src={profileUrl}
                alt='user photo'
              />
              )
            : (
              <img
                className='w-32 h-32 rounded-full shadow-md'
                src={userData.photoURL}
                alt='user photo'
              />
              )}
        </div>
        <div className='mt-5 flex justify-center'>
          <Button
            text='Cambiar foto de perfil'
            onClick={handleOpenFilePicker}
          />
          <input
            type='file'
            accept='image/png,image/jpeg'
            ref={fileRef}
            style={{ display: 'none' }}
            onChange={handleChangeFile}
          />
        </div>
      </div>
      <div className='mt-10'>
        <div className='flex justify-center mb-3 text-xl'>
          <h1 className='mr-5'>Nombre</h1>
          <h1 className='capitalize'>{userData.displayName}</h1>
        </div>
        <div className='flex justify-center text-xl'>
          <h1 className='mr-5'>Email</h1>
          <h1>{userData.email}</h1>
        </div>
        <div className='flex justify-center mt-5'>
          <Button onClick={handleResetPassword} text='Restablecer contraseña' />
        </div>
      </div>
    </div>
  )
}
export default Perfil
