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
            if (amount === 0 || selectedStore === '') {
                toast.error('All fields are required')
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

    return (
        <div className='flex justify-start items-center h-screen flex-col gap-y-10'>
            <h4 className='text-4xl font-semibold pacifico mt-16'>
                Add Investment
            </h4>
            <div className='flex flex-col bg-white px-20 py-10 shadow-md gap-2'>
                <div className='flex flex-col'>
                    <label htmlFor='name' className='text-xs'>
                        Amount to invest
                    </label>
                    <input
                        type='number'
                        name='amount'
                        id='amount'
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='store' className='text-xs'>
                        Select Store
                    </label>
                    {stores && stores.length > 0 && (
                        <select
                            name='storename'
                            id='storename'
                            onChange={handleStoreChange}
                            className='p-2 bg-primary text-white rounded-md'
                        >
                            {stores.map((store: any) => (
                                <option key={store._id} value={store._id}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
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
