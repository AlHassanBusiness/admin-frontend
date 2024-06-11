import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { api } from '../api/api'
import { useNavigate } from 'react-router-dom'

interface Store {
    _id: string
    name: string
    totalprofit: number
}

interface Client {
    _id: string
    name: string
    email: string
    phone: string
}

const AddProfit = () => {
    const [stores, setStores] = useState<Store[]>([])
    const [clients, setClients] = useState<Client[]>([])
    const [selectedClient, setSelectedClient] = useState<string>('')
    const [selectedStore, setSelectedStore] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const navigate = useNavigate()
    const createProfit = async () => {
        try {
            if (selectedClient === '' || selectedStore === '' || amount === 0) {
                toast.error('All fields are required')
                return
            }

            const response = await api.post('/api/profits', {
                client: selectedClient,
                store: selectedStore,
                amount,
            })

            if (response.status === 201) {
                toast.success('Profit created')
                navigate('/')
            }
        } catch (error: object | any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const storesResponse = await api.get('/api/stores')
                if (storesResponse.status === 200) {
                    setStores(storesResponse.data.data)
                }

                const clientsResponse = await api.get('/api/clients')
                if (clientsResponse.status === 200) {
                    setClients(clientsResponse.data.data)
                }
            } catch (error: object | any) {
                console.log(error)
                toast.error(error.response.data.error)
            }
        }
        getData()
    }, [])

    const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStore(event.target.value)
    }
    const handleClientChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedClient(event.target.value)
    }

    return (
        <div className='flex justify-start items-center h-screen flex-col gap-y-10'>
            <h4 className='text-4xl font-semibold pacifico mt-16'>
                Add Profit
            </h4>
            <div className='flex flex-col gap-y-5 bg-white p-10 shadow-md gap-2 min-w-[400px]'>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='client' className='text-xs'>
                        Select Client
                    </label>
                    {clients.length > 0 && (
                        <select
                            name='client'
                            id='client'
                            className='bg-primary p-2 text-white rounded-sm'
                            onChange={handleClientChange}
                        >
                            <option value=''>Select Client</option>
                            {clients.map((client: Client) => (
                                <option value={client._id} key={client._id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='store' className='text-xs'>
                        Select Store
                    </label>
                    {stores.length > 0 && (
                        <select
                            name='store'
                            id='store'
                            className='bg-primary p-2 text-white rounded-sm'
                            onChange={handleStoreChange}
                        >
                            <option value=''>Select Store</option>
                            {stores.map((store: Store) => (
                                <option value={store._id} key={store._id}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='amount' className='text-xs'>
                        Enter profit
                    </label>

                    <input
                        type='number'
                        name='amount'
                        id='amount'
                        min={0}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className='p-2 rounded-sm border border-gray-300 focus:ring-0 focus:outline-none'
                    />
                </div>
                <button
                    onClick={createProfit}
                    className='bg-primary text-white w-fit p-2 ml-auto'
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default AddProfit
