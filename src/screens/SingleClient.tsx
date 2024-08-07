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
    accountno: string,
    store: Store
}

interface DecidedProfit {
    _id: string 
    total_earning: number 
    to_client: number 
    createdAt: string
}

interface Store {
    _id: string
    name: string
}

interface Investment {
    _id: string
    client: Client
    store: Store
    amount: number
    createdAt: string
}

const SingleClient = () => {
    const { id } = useParams()
    const [client, setClient] = useState<Client>(Object)
    const [investments, setInvestments] = useState([])
    const [loading, setLoading] = useState(false)
    const [decidedProft,setDecidedProfit] = useState<DecidedProfit[]>([])

    useEffect(() => {
        const getClient = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/api/clients/${id}`)
                if (response.status === 200) {
                    setClient(response.data.data.client)
                    setInvestments(response.data.data.investments)
                    setDecidedProfit(response.data.data.decidedProfits)
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

    const handleDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            month: 'long', // Full month name
            day: '2-digit', // Two-digit day
            year: 'numeric', // Full year
        })

        return formattedDate
    }


    return (
        <div className='flex justify-start  min-h-screen font-semibold flex-col pt-10'>
            <h4 className='mb-10 text-3xl font-semibold text-primary'>
                Client Info
            </h4>
            <div className='min-w-[80%] mx-auto bg-white shadow-md p-5 flex flex-col gap-y-3 text-primary border border-primary-100'>
                {loading && (
                    <span className=' font-semibold'>Fetching Client....</span>
                )}

                <p className='flex flex-row justify-between items-center text-lg bg-primary p-2 text-white'>
                    <span>Store</span>
                    <span className=''>{client?.store?.name}</span>
                </p>

                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Name</span>
                    <span className=''>{client.name}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Email</span>
                    <span className=''>{client.email}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Phone</span>
                    <span className=' pacifico'>{client.phone}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Address</span>
                    <span className=' '>{client.address}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Bank</span>
                    <span className=''>{client.bankname}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Bank Account Holder Name</span>
                    <span className=''>{client.accountholdername}</span>
                </p>
                <p className='flex flex-row justify-between items-center text-lg'>
                    <span>Bank Account No.</span>
                    <span className=''>{client.accountno}</span>
                </p>
            </div>
            <h4 className='my-10 text-3xl font-semibold text-primary'>
                Investement Details
            </h4>
            {investments.length > 0 ? (
                <div className='min-w-[80%] mx-auto shadow-md flex flex-col gap-y-3 text-primary border border-orange-100'>
                    {investments.length > 0 && (
                        <table className='table-auto'>
                            <thead className='bg-primary text-white'>
                                <tr className='text-left'>
                                    <th className='text-sm p-5'>Store</th>
                                    <th className='text-sm p-5'>Amount</th>
                                    <th className='text-sm p-5'>
                                        Creation Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {investments.map((investment: Investment) => (
                                    <tr
                                        className='text-left text-sm'
                                        key={investment._id}
                                    >
                                        <td className='p-5 tex-sm'>
                                            {client?.store?.name}
                                        </td>
                                        <td className='p-5 tex-sm'>
                                            $ {investment.amount}
                                        </td>
                                        <td className='p-5 tex-sm'>
                                            {handleDate(investment.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ) : (
                <span>No Investements</span>
            )}
            <hr className='mt-10' />
            <h4 className='my-10 text-3xl font-semibold  text-primary mt-20'>
                Decided Profits
            </h4>
            {decidedProft?.length > 0 ? (
                <div className='min-w-[80%] mx-auto shadow-md flex flex-col gap-y-3 text-primary border border-orange-100'>
                    {decidedProft.length > 0 && (
                        <table className='table-auto'>
                            <thead className='bg-primary text-white'>
                                <tr className='text-left'>
                                    <th className='text-sm p-5'>Index</th>
                                    <th className='text-sm p-5'>Date</th>
                                    <th className='text-sm p-5'>Total Earnings</th>
                                    <th className='text-sm p-5'>
                                        Client Profit 
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {decidedProft?.map((profit: DecidedProfit,i: number) => (
                                    <tr
                                        className='text-left text-sm'
                                        key={i}
                                    >
                                        <td className='p-5 tex-sm'>
                                           {i+1}
                                        </td>
                                        <td className='p-5 tex-sm'>
                                            {handleDate(profit.createdAt)}
                                        </td>
                                        <td className='p-5 tex-sm'>
                                            $ {profit.total_earning}
                                        </td>
                                        <td className='p-5 tex-sm'>
                                            $ {profit.to_client}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ) : (
                <span>No Investements</span>
            )}

        </div>
    )
}

export default SingleClient
