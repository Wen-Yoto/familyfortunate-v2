import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../app/hooks'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'
import { Checkbox } from '../components/InputButton'
import Link from '../components/Link'
import Logo from '../components/Logo'
import Title from '../components/Title'
import { setUser } from '../slices/slice'
import { setAuthToken } from '../utils/axios'
import axios from 'axios'
import { Spinner } from 'flowbite-react'
import type { NextPage } from 'next'
import Cookies from 'universal-cookie'
import { clear, error } from 'console'
import ResetPassword from './reset-password'

const SignIn: NextPage = () => {
  const cookies = new Cookies()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loginMessage, setLoginMessage] = useState({ type: '', message: '', status: 404 })

  // defining the initial state for the form
  const initialState = {
    email: '',
    password: '',
    remember: 'false',
    clear: 'test',
  }

  // getting the event handlers from our custom hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  useEffect(() => {
    //this will fix the ref issues

    register('email', {
      required: 'You must provide an email address',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Please enter a valid email address',
      },
    })

    register('password', {
      required: 'You must specify a password',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    })
  }, [register])

  const onSubmit = async (data: any) => {
    setLoading(true)
    // set configurations
    const configuration = {
      method: 'post',
      url: '/api/auth/login',
      data: data,
    }

    // make the API call
    await axios(configuration)
      .then(async (result) => {
        // set the cookie
        cookies.set('TOKEN', result.data.token, {
          path: '/',
        })
        setAuthToken(result.data.token)
        const user = await axios('/api/users/getUser')
        dispatch(setUser(user.data.user[0]))
        setLoginMessage({
          type: 'success',
          message: 'You have successfully signed in',
          status: 200,
        })
        setLoading(false)
        // redirect user to the auth page
        setTimeout(() => {
          if (result.data.roles === 'admin') {
            router.push('/admin')
          } else {
            router.push('/member/questions')
          }
        }, 3000)
      })
      .catch((err) => {
        const { message } = err.response.data
        setLoginMessage({ type: 'error', message: message, status: err.response.status })
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setLoginMessage({ type: '', message: '', status: 404 })
          setLoading(false)
        }, 3000)
      })
  }

  return (
    <>
      <div className="h-screen bg-vanilla p-8">
        <Link href="/" className="!block lg:inline-block">
          <span className="sr-only">Go home</span>
          <Logo className="mx-auto h-28 w-auto" isWhite={true} />
        </Link>
        <main className="display relative z-20 max-h-screen md:max-h-fit">
          <div className="base m-auto mt-8 block max-h-screen max-w-full rounded-3xl bg-white p-7 text-base shadow-sm md:max-h-fit md:max-w-md">
            <div className="top-2">
              <Title>Sign in</Title>

              <Heading size={2} className="text-center">
                Sign in
              </Heading>
              <p className="base my-3 mt-2 text-center md:mt-4 lg:text-sm">
                Hey, enter your details to sign-in to your account.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 md:mt-12">
              <div className="mb-4">
                <Input
                  label={'Email address'}
                  type={'text'}
                  name={'email'}
                  placeholder={'johndoe@gmail.com'}
                  autoComplete={'email'}
                  error={errors?.email?.message}
                  onChange={(e) => setValue('email', (e.target as HTMLInputElement).value)}
                ></Input>
              </div>
              <div className="mb-4">
                <Input
                  label={'Password'}
                  type={'password'}
                  placeholder={'•••••••••'}
                  name={'password'}
                  autoComplete={'current-password'}
                  error={errors?.password?.message}
                  onChange={(e) => setValue('password', (e.target as HTMLInputElement).value)}
                ></Input>
              </div>
              <div className="mb-4 flex flex-row justify-between">
                <Checkbox name="remember" value={'true'}>
                  Remember me
                </Checkbox>
                <Link
                  className="ml-2 font-medium text-gray-900 hover:underline hover:underline-offset-2 dark:text-gray-400"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              {loginMessage?.type === 'success' && (
                <p className="mt-2 text-sm text-success-500">{loginMessage?.message}</p>
              )}{' '}
              {loginMessage?.type === 'error' &&
                (loginMessage?.status === 400 ? (
                  <p className="mt-2 text-sm text-danger-500">{loginMessage?.message}</p>
                ) : (
                  <p className="mt-2 text-sm text-danger-500">
                    No account found for this email. Retry, or{' '}
                    <Link
                      className="inline font-medium text-primary-500 hover:underline"
                      href="/get-started"
                    >
                      create an account
                    </Link>
                  </p>
                ))}
              <div className="mt-7">
                <Button href="" className="w-full" color="dark" type={'submit'}>
                  {loading ? (
                    <>
                      <Spinner aria-label="loading" />
                      <span className="pl-3">Signing in...</span>
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </div>
            </form>
            <p className="base mt-5 text-center text-sm md:mt-6 lg:mt-8">
              Don&apos;t have an account?{' '}
              <Link className="inline text-secondary-500 hover:underline" href={'/get-started'}>
                Create an account
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  )
}

export default SignIn
