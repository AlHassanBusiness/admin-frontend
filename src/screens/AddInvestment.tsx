import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'

const AddInvestment = () => {
    const { id } = useParams()
    const [stores, setStores] = useState([])

    const [selectedStore, setSelectedStore] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const navigate = useNavigate()

    const createStore = async () => {
        try {
            if (amount <= 0 || selectedStore === '') {
                toast.error(
                    'All fields are required and amount must be positive',
                )
                return
            }

            const response = await api.post('/api/investments', {
                client: id,
                store: selectedStore,
                amount: amount,
            })

            if (response.status === 201) {
                toast.success('Investment added')
                navigate('/clients')
            }
        } catch (error: object | any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        const getStores = async () => {
            try {
                const response = await api.get('/api/stores')
                if (response.status === 200) {
                    setStores(response.data.data)
                }
            } catch (error: object | any) {
                console.log(error)
                toast.error(error.response.data.error)
            }
        }
        getStores()
    }, [])

    const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStore(event.target.value)
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        if (value >= 0) {
            setAmount(value)
        } else {
            toast.error('Amount must be non-negative')
        }
    }

    return (
        <div className='flex justify-start items-center h-screen flex-col gap-y-10'>
            <h4 className='text-4xl font-semibold pacifico mt-16'>
                Add Investment
            </h4>
            <div className='flex flex-col bg-white px-20 py-10 shadow-md gap-2'>
                <div className='flex flex-col'>
                    <label htmlFor='amount' className='text-xs'>
                        Amount to invest
                    </label>
                    <input
                        type='number'
                        name='amount'
                        id='amount'
                        value={amount}
                        min='0' // Set minimum value to 0
                        onChange={handleAmountChange}
                        className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                    />
                </div>
                <div className='flex flex-col'>
                    {stores && stores.length > 0 && (
                        <select
                            name='storename'
                            id='storename'
                            onChange={handleStoreChange}
                            className='p-2 bg-primary text-white rounded-md'
                        >
                            <option value=''>Select Store</option>
                            {stores.map((store: any) => (
                                <option key={store._id} value={store._id}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {stores.length < 0 && (
                        <span>
                            No Stores, for creating investment store must be
                            added
                        </span>
                    )}
                </div>
                <button
                    onClick={createStore}
                    className='bg-primary text-white w-fit p-2 ml-auto mt-5'
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default AddInvestment
