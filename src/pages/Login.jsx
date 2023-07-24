import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { useForm } from 'react-hook-form'
import { formValidate } from '../utils/formValidate'

import FormError from '../components/FormError'
import FormInput from '../components/FormInput'
import Title from '../components/Title'
import Button from '../components/Button'
import ButtonGoogle from '../components/ButtonGoogle'
import Loading from '../components/Loading'

const Login = () => {
  const { loginUser, user, loading } = useContext(UserContext)

  const navegate = useNavigate()

  useEffect(() => {
    if (user) {
      navegate('/')
    }
  }, [user])

  const { required, patternEmail, minLength, validateTrim } = formValidate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async ({ email, password }) => {
    await loginUser(email, password)
  }

  return !loading
    ? (
      <Loading />
      )
    : (
      <div className='w-96 mx-auto mt-10'>
        <Title text='Iniciar Sesión' />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type='email'
              placeholder='Ingrese email'
              {...register('email', {
                required,
                pattern: patternEmail
              })}
              label='Correo'
              error={errors.email}
            >
              <FormError error={errors.email} />
            </FormInput>
            <FormInput
              type='password'
              placeholder='Ingrese Contraseña'
              {...register('password', {
                minLength,
                validate: validateTrim
              })}
              label='Contraseña'
              error={errors.password}
            >
              <FormError error={errors.password} />
            </FormInput>
            <div className='flex justify-center'>
              <Button text='Acceder' type='submit' />
            </div>
            <div className='flex justify-center align-center mt-8 mb-8 w-full'>
              <div className='flex bg-gray-300 h-px w-5/12' />
              <p className='flex w-1/12 items-center justify-center -mt-3'>O</p>
              <div className='flex bg-gray-300 h-px w-5/12' />
            </div>
          </form>
          <div className='flex justify-center '>
            <ButtonGoogle />
          </div>
        </div>
      </div>
      )
}
export default Login
