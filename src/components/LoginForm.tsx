import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instagram from '../assets/instagram.svg'
import { auth } from '../services/firebase/firebase-config'
import { Input } from './Lib'

export interface formInputs {
  email: string,
  password: string,
  username?: string,
  name?: string
}

export function LoginForm () {
  useEffect(() => {
    document.title = 'Login • Instagram'
  })
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [formInputs, setFormInputs] = useState<formInputs>({
    email: '',
    password: ''
  })
  const { email, password } = formInputs
  const isSubmitInvalid = email === '' || password === ''
  const handleFormInputs = (event: React.ChangeEvent<HTMLFormElement>) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      error instanceof Error ? setError(error.message) : console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='py-12 w-80'>
      <div className='bg-white justify-center flex flex-col items-center border border-gray-200 py-5'>
        <div className='flex justify-center my-6'>
            <img src={instagram} alt='Instagram logo' className='h-12' />
        </div>
          <form onChange={handleFormInputs} onSubmit={handleSubmit} className='w-64 flex flex-col'>
            <Input name='email' type='text' placeholder='Email address'/>
            <Input name='password' type='password' placeholder='Password'/>
            <button disabled={isSubmitInvalid} className='bg-blue-500 text-white rounded-md py-1 my-2 font-medium disabled:opacity-50'>
            {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
      <div className='font-thin text-red-500 mt-5'>
      {error}
      </div>
      </div>
      <div className='bg-white my-3 text-center p-5 border border-gray-200'>
        Don't have an account? <Link to='/signup' className='text-blue-500 font-medium'>Sign up</Link>
      </div>
    </div>
  )
}
