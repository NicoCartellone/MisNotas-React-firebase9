import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'

import NavBar from './components/NavBar'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Perfil />} />

      </Routes>
    </>
  )
}

export default App
