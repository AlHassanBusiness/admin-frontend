import { useState } from 'react'
import toast from 'react-hot-toast'
import { api } from '../api/api'
import { useNavigate } from 'react-router-dom'

const AddStore = () => {
    const [name, setName] = useState<string>('')
    const navigate = useNavigate()
    const createStore = async () => {
        try {
            if (name === '') {
                toast.error('Name is required')
                return
            }

            const response = await api.post('/api/stores', {
                name,
            })

            if (response.status === 201) {
                toast.success('Store created')
                navigate('/stores')
            }
        } catch (error: object | any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    return (
        <>
            <div className='flex justify-start  h-screen flex-col gap-y-10'>
                <h4 className='text-4xl font-semibold mt-16 mx-20'>
                    Add Store
                </h4>
                <div className='flex flex-col bg-white p-10 shadow-md gap-2 min-w-[500px] mx-20'>
                    <div className='flex flex-col'>
                        <label htmlFor='name' className='text-xs'>
                            Store name
                        </label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                        />
                    </div>
                    <button
                        onClick={createStore}
                        className='bg-primary mt-7 text-white w-fit px-4 py-2 font-semibold ml-auto'
                    >
                        Add
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddStore
