import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'

type Store  = {
    _id: string 
    name: string 
}

type  Client =  {
    _id: string 
    name: string 
    store: Store 
}

const AddInvestment = () => {
    const { id } = useParams()
    const [amount, setAmount] = useState<number>(0)
    const [client,setClient] = useState<Client | null>(null)
    const navigate = useNavigate()

    const createStore = async () => {
        try {
            if (amount <= 0 ) {
                toast.error(
                    'A valid amount is required',
                )
                return
            }

            const response = await api.post('/api/investments', {
                client: id,
                store: client?.store._id,
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

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        if (value >= 0) {
            setAmount(value)
        } else {
            toast.error('Amount must be non-negative')
        }
    }

    useEffect(()=> {
        const getClient = async () => {
            try {
                const response = await api.get(`/api/clients/${id}`)
                if(response.status===200){
                    setClient(response.data.data.client)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getClient()

    },[])


    return (
        <div className='flex justify-start items-center h-screen flex-col gap-y-10'>
            <h4 className='text-4xl font-semibold pacifico mt-16'>
                Add Investment
            </h4>

            <div className='flex flex-col bg-white px-20 py-10 shadow-md gap-2'>
                {client !==null && 
                (
                <div className='flex flex-col'>
                    <label htmlFor='client' className='text-xs'>
                        Client 
                    </label>
                    <span 
                        title='Client name'
                        className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary hover:cursor-not-allowed'
                    >{client?.name}</span>
                </div>
            )}

                {client !==null && 
                                (
                                <div className='flex flex-col'>
                                    <label htmlFor='store' className='text-xs'>
                                        Store  
                                    </label>
                                    <span 
                                        title='Store name'
                                        className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary hover:cursor-not-allowed'
                                    >{client?.store?.name}</span>
                                </div>
                            )}

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
