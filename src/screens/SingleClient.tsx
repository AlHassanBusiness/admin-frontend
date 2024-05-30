import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../api/api'
import toast from 'react-hot-toast'
interface Client {
    _id: string
    name: string
    phone: number
    email: string
    address: string
    bankname: string
    accountholdername: string
    accountno: string
}
const SingleClient = () => {
    const { id } = useParams()
    const [client, setClient] = useState<Client>(Object)
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getClient = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/api/clients/${id}`)
                if (response.status === 200) {
                    setClient(response.data.data.client)
                    setStores(response.data.data.store)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
                toast.error('Error while fetching client')
            }
        }
        getClient()
    }, [id])

    return (
        <div className='flex justify-start  min-h-screen font-semibold flex-col pt-10'>
            <h4 className='mb-10 text-3xl font-semibold pacifico text-primary'>
                Client Info
            </h4>
            <div className='min-w-[80%] mx-auto bg-white shadow-md p-5 flex flex-col gap-y-3 text-primary border border-orange-100'>
                {loading && (
                    <span className='text-orange-600 font-semibold'>
                        Fetching Client....
                    </span>
                )}
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Name</span>
                    <span className='text-orange-600'>{client.name}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Email</span>
                    <span className='text-orange-600'>{client.email}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Phone</span>
                    <span className='text-orange-600 pacifico'>
                        {client.phone}
                    </span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Address</span>
                    <span className='text-orange-600 '>{client.address}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Bank</span>
                    <span className='text-orange-600'>{client.bankname}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Bank Account Holder Name</span>
                    <span className='text-orange-600'>
                        {client.accountholdername}
                    </span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Bank Account No.</span>
                    <span className='text-orange-600'>{client.accountno}</span>
                </p>
            </div>
            <h4 className='my-10 text-3xl font-semibold pacifico text-primary'>
                Investement Details
            </h4>
            <div className='min-w-[80%] mx-auto shadow-md flex flex-col gap-y-3 text-primary border border-orange-100'>
                {stores.length > 0 && (
                    <table className='table-auto'>
                        <thead className='bg-primary text-white'>
                            <tr className='text-left'>
                                <th className='text-sm p-5'>Store</th>
                                <th className='text-sm p-5'>Amount</th>
                                <th className='text-sm p-5'>Creation Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.map((store) => (
                                <tr className='text-left text-sm'>
                                    <td className='p-5 tex-sm'>Store-1</td>
                                    <td className='p-5 tex-sm'>Rs.50000</td>
                                    <td className='p-5 tex-sm'>1961</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default SingleClient
