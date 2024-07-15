import { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { api } from '../api/api.ts'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { loggedIn, setUser, setLoggedIn } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')
    const [togglePassword, setTogglePassword] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)

    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (!email || !password) {
            toast.error('Email and password are mandatory')
            setLoading(false)
            return
        }

        try {
            const response = await api.post('/api/auth/admin/login', {
                email,
                password,
            })
            if (response.status === 200) {
                toast.success('Login Successful')
                setUser(response.data)
                setLoggedIn(true)
                localStorage.setItem('user', JSON.stringify(response.data))
                const expiryDate = new Date()
                expiryDate.setDate(expiryDate.getDate() + 1)
                localStorage.setItem('expiry', expiryDate.toISOString())
                setLoading(false)
                navigate('/')
            }
        } catch (error) {
            toast.error("Invalid credentials")
            setLoading(false)
        }
    }

    useEffect(() => {
        if (loggedIn) {
            navigate('/')
        }
    }, [loggedIn])

    return (
        <>
            <section className='flex justify-center items-center h-screen bg-slate-200'>
                <div className='max-h-[600px] lg:p-16 p-10 bg-white flex flex-col gap-y-6 rounded-sm min-w-[600px]'>
                    <h1 className='text-4xl text-gray-700 font-extrabold tracking-wider text-center mb-5'>
                        Login
                    </h1>
                    <form onSubmit={login} className='flex flex-col'>
                        <div className='mb-2 flex flex-col'>
                            <label
                                htmlFor='email'
                                className='text-sm text-gray-700 font-semibold'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border border-slate-300 p-2 rounded-sm focus:ring-0 focus:outline-none'
                                required
                            />
                        </div>
                        <div className='mb-5 flex flex-col relative'>
                            <label
                                htmlFor='password'
                                className='text-sm text-gray-700 font-semibold'
                            >
                                Password
                            </label>
                            <input
                                type={togglePassword ? 'text' : 'password'}
                                name='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border border-slate-300 p-2 rounded-sm focus:ring-0 focus:outline-none'
                                required
                            />
                            {togglePassword ? (
                                <FaEye
                                    className='absolute right-2 top-8 cursor-pointer'
                                    onClick={() =>
                                        setTogglePassword(!togglePassword)
                                    }
                                />
                            ) : (
                                <FaEyeSlash
                                    className='absolute right-2 top-8 cursor-pointer'
                                    onClick={() =>
                                        setTogglePassword(!togglePassword)
                                    }
                                />
                            )}
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='bg-primary mt-10 text-white font-semibold p-2 rounded-sm hover:bg-gray-800 transition-colors duration-300 ease-linear'
                        >
                            {
                                loading ? 'Logging in ....' : 'Log in'
                            }
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
