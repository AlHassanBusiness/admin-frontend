import { useState, useEffect } from 'react'
import { api } from '../api/api'

interface Store {
    _id: string
    name: string
    totalprofit: number
}
interface Client {
    _id: string
    name: string
}

interface Investement {
    _id: string
    client: Client
    store: Store
    amount: number
    createdAt: string
}

const Investments = () => {
    const [investments, setInvestments] = useState([])

    useEffect(() => {
        const getInvestments = async () => {
            try {
                const response = await api.get('/api/investments')
                if (response.status === 200) {
                    setInvestments(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getInvestments()
    }, [])

    const handleDate = (createdAt: string) => {
        const date = new Date(createdAt)
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date)

        return formattedDate // Corrected return statement
    }

    return (
        <div className='flex justify-start  min-h-screen font-semibold flex-col pt-10'>
            <h4 className='my-10 text-3xl font-semibold pacifico text-primary'>
                Total Investements
            </h4>
            {investments.length > 0 ? (
                <div className='min-w-[80%] mx-auto shadow-md flex flex-col gap-y-3 text-primary border border-orange-100'>
                    {investments.length > 0 && (
                        <table className='table-auto'>
                            <thead className='bg-primary text-white'>
                                <tr className='text-left'>
                                    <th className='text-sm p-5'>Client</th>
                                    <th className='text-sm p-5'>Store</th>
                                    <th className='text-sm p-5'>
                                        Invested Amount
                                    </th>
                                    <th className='text-sm p-5'>
                                        Creation Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {investments.map((investment: Investement) => (
                                    <tr
                                        className='text-left text-sm'
                                        key={investment._id}
                                    >
                                        <td className='p-5 text-sm'>
                                            {investment.client.name}
                                        </td>
                                        <td className='p-5 tex-sm'>
                                            {investment.store.name}
                                        </td>
                                        <td className='p-5 tex-sm'>
                                            {investment.amount}
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
                <span className='font-light text-lg'>No Investments</span>
            )}
        </div>
    )
}

export default Investments
