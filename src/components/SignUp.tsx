import { useState } from 'react'
import '../App.css'
import axios from 'axios'

type SignUpData = {
  name: string
  email: string
  password: string
}

export function SignUp () {
  const [error, setError] = useState<string>('')
  const [created, setCreated] = useState(false)
  const [tried, setTried] = useState(false)

  const signUpFunc = async (data: SignUpData) => {
    try {
      const signuprequest = await axios.post(
        'http://localhost:3000/users',
        data
      )
      console.log(signuprequest)
      setCreated(true)
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error || 'Unknown error')
        //error.response.data.error
      } else {
        console.log(error)
      }
      setCreated(false)
    }
    setTried(true)
  }

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value
    }
    signUpFunc(data)
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
          <h1 className='text-2xl font-semibold text-center mb-6'>
            Create your account
          </h1>

          <form
            action=''
            className='flex flex-col gap-4'
            onSubmit={handleSignUp}
          >
            <input
              type='text'
              placeholder='Name'
              required
              name='name'
              className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
              type='email'
              placeholder='Email'
              required
              name='email'
              className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
              type='password'
              placeholder='Password'
              name='password'
              required
              className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <button className='bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium'>
              Sign Up
            </button>
          </form>
          {tried && (
            <p
              className={`mt-4 text-center font-medium ${
                created ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {created ? (
                <>
                  User created successfully{' '}
                  <a href='/login' className='underline font-semibold'>
                    Login
                  </a>
                </>
              ) : (
                <>
                  <p>Error creating account: {error}</p>
                  <a
                    href='/login'
                    className='underline font-semibold text-green-600'
                  >
                    Login
                  </a>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
