'use client'
import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface Store {
    _id: string 
    name: string 
}


const AddClient = () => {
    const navigator = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accountholdername, setAccountHolderName] = useState('')
    const [address, setAddress] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [bankname, setBankName] = useState('')
    const [store,setStore] = useState('')
    const [stores,setStores] = useState<Store[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (
                name === '' ||
                phone === '' ||
                email === '' ||
                password === '' ||
                accountholdername === '' ||
                address === '' ||
                accountNo === '' ||
                bankname === '' ||
                store === ''
            ) {
                toast.error('All fields are required')
                return
            }

            const response = await api.post('/api/clients', {
                name,
                email,
                password,
                address,
                phone,
                bankname,
                accountno: accountNo,
                accountholdername,
                store 
            })

            if (response.status === 201) {
                toast.success('Client created successfully')
                navigator('/clients')
            }
        } catch (error: object | any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    useEffect(()=> {
        const getStores =async() => {
            try {
                const response = await api.get('/api/stores')
                if(response.status===200){
                    setStores(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getStores()
    },[])


    return (
        <div className='w-full h-screen flex justify-start flex-col'>
            <h4 className='text-3xl font-extrabold tracking-wider text-primary m-10'>
                Add New Client
            </h4>
            <div className='flex flex-col bg-white shadow-2xl p-5 gap-y-2 m-20'>
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
                                required
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
                <div className='mt-2 w-full flex flex-col '>
                    {stores.length > 0 && 
                        (
                            <>
                    <label htmlFor='address' className='text-xs mb-2'>
                        Select Store (for investment)*
                    </label>
                        <select name="store" id="" className='p-2 rounded-md' >
                            <option value="">...</option>
                            {
                                stores.map((store: Store) => {
                                    return (
                                        <option key={store._id} value={store._id} onClick={() => setStore(store._id)}>{store.name}</option>
                                    )
                                })
                            }
                        </select>
                        </>
                    )
                    }
                </div>


                <button
                    className='bg-primary text-white p-2 rounded-md mt-4 w-20 ml-auto'
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AddClient
