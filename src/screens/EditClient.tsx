import { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const EditClient = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accountholdername, setAccountHolderName] = useState('')
    const [address, setAddress] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [bankname, setBankName] = useState('')

    // Fetch client details and populate form fields
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await api.get(`/api/clients/${id}`)
                if (response.status === 200) {
                    const client = response.data.data.company
                    setName(client.name)
                    setPhone(client.phone)
                    setEmail(client.email)
                    setPassword('') // Password is not retrieved for security reasons
                    setAccountHolderName(client.accountholdername)
                    setAddress(client.address)
                    setAccountNo(client.accountno)
                    setBankName(client.bankname)
                }
            } catch (error) {
                console.log(error)
                toast.error('Failed to fetch client details')
            }
        }
        fetchClient()
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (
                name === '' ||
                phone === '' ||
                email === '' ||
                accountholdername === '' ||
                address === '' ||
                accountNo === '' ||
                bankname === ''
            ) {
                toast.error('All fields are required')
                return
            }

            const response = await api.put(`/api/clients/${id}`, {
                name,
                email,
                ...(password && { password }),
                address,
                phone,
                bankname,
                accountno: accountNo,
                accountholdername,
            })

            if (response.status === 200) {
                toast.success('Client updated successfully')
                navigate('/clients')
            }
        } catch (error: object | any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    return (
        <div className='w-full h-screen flex justify-start mt-10 items-center flex-col'>
            <h4 className='text-3xl font-extrabold tracking-wider mb-10 pacifico text-primary'>
                Edit Client
            </h4>
            <div className='flex flex-col bg-white shadow-2xl p-5 gap-y-2'>
                <div className='mt-5 w-full flex flex-row justify-center items-center gap-x-5'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='fullname' className='text-xs'>
                            Name*
                        </label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            className=' border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='w-full'>
                        <label htmlFor='email' className='text-xs'>
                            Email*
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='w-full '>
                        <label htmlFor='password' className='text-xs'>
                            Password*
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                id='password'
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? (
                                <FaEye
                                    className='absolute top-3 right-3 cursor-pointer'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            ) : (
                                <FaEyeSlash
                                    className='absolute top-3 right-3 cursor-pointer'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='phone' className='text-xs'>
                            Phone*
                        </label>
                        <input
                            type='tel'
                            name='phone'
                            id='phone'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className='mt-2 w-full flex flex-row justify-center items-center gap-x-5'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='fee' className='text-xs'>
                            Bank Name*
                        </label>
                        <input
                            type='text'
                            name='bankname'
                            id='bankname'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            value={bankname}
                            onChange={(e) => setBankName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-y-1 w-full'>
                        <label htmlFor='bankaccountholder' className='text-xs'>
                            Account Holder Name*
                        </label>
                        <input
                            type='text'
                            name='accountholdername'
                            id='accountholdername'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            value={accountholdername}
                            onChange={(e) =>
                                setAccountHolderName(e.target.value)
                            }
                        />
                    </div>
                    <div className='flex flex-col gap-y-1 w-full'>
                        <label htmlFor='Account No' className='text-xs'>
                            Bank Account No.*
                        </label>
                        <input
                            type='text'
                            name='accountno'
                            id='accountno'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            value={accountNo}
                            onChange={(e) => setAccountNo(e.target.value)}
                        />
                    </div>
                </div>
                <div className='mt-2 w-full flex flex-col '>
                    <label htmlFor='address' className='text-xs'>
                        Address*
                    </label>
                    <textarea
                        name='address'
                        id='address'
                        className='border border-gray-300 p-2 rounded-md resize-none focus:outline-none focus:ring-0 focus:border-primary'
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <button
                    className='bg-primary text-white p-2 rounded-md mt-4 w-20 ml-auto'
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default EditClient
