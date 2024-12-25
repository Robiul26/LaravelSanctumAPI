
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Pagess/Layout'
import Home from './Pagess/Home'
import Register from './Pagess/Auth/Register'
import Login from './Pagess/Auth/Login'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/register' element={user ? <Home /> : <Register />} />
          <Route path='/login' element={user ? <Home /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


