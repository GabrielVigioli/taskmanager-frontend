import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login () {
  const navigate = useNavigate()
  type loginFuncType = {
    email: string
    password: string
  }

  const [error, setError] = useState<string>('')
  const loginFunc = async (data: loginFuncType) => {
    try {
      const login = await axios.post('http://localhost:3000/login', data)
      const token = login.data
      localStorage.setItem('token', token)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setError('Email or password incorrect')
    }
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      email: form.email.value,
      password: form.password.value
    }

    loginFunc(data)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>

        <form className='flex flex-col gap-4' onSubmit={handleLogin}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
          />

          <input
            type='password'
            name='password'
            placeholder='Senha'
            required
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
          />

          <button className='bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium'>
            Entrar
          </button>
        </form>

        <p className='mt-4 text-center text-sm text-gray-600'>
          Não tem conta?
          <a
            href='/signup'
            className='text-blue-600 font-medium hover:underline ml-1'
          >
            Criar conta
          </a>
        </p>
        {error && (
          <>
            <p className='text-center text-red-600'>{error}</p>
          </>
        )}
      </div>
    </div>
  )
}
