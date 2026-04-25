import './App.css'
import { SignUp } from './components/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { Home } from './components/Home'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
