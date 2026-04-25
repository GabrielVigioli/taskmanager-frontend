import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'

export function useAuth () {
  type User = {
    id: string
    name: string
    email: string
  }

  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  const getUser = async () => {
    try {
      const res = await api.get('/me')
      setUser(res.data)
    } catch {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    getUser() //es lint desgracado
  }, [])

  return {
    handleLogout,
    user
  }
}
