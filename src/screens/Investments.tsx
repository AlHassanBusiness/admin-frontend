import { useState, useEffect } from 'react'
import { api } from '../api/api'
import Loader from '../components/Loader'


type Store = {
    _id: string
    name: string 
}


type Client =  {
    _id: string
    name: string
    store: Store 
}

interface Investment {
    _id: string
    client: Client 
    amount: number
    createdAt: string
}

const Investments = () => {
    const [investments, setInvestments] = useState<Investment[]>([])
    const [page, setPage] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [totalInvestments, setTotalInvestments] = useState<number>(0)
    const resultsPerPage = 20

    const getInvestments = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/api/investments?page=${page}`)
            if (response.status === 200) {
                setInvestments(response.data.data)
                setTotalInvestments(response.data.total)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getInvestments()
    }, [page])

    const handleDate = (createdAt: string) => {
        const date = new Date(createdAt)
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date)
        return formattedDate
    }

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if ((page + 1) * resultsPerPage < totalInvestments) {
            setPage(page + 1)
        }
    }

    return (
        <div className='flex justify-start min-h-screen font-semibold flex-col pt-10'>
            <h4 className='my-10 text-3xl font-semibold text-primary'>
                Total Investments
            </h4>
            {loading && <Loader />}
            {!loading && investments.length > 0 ? (
                <div className='min-w-[80%] mx-auto shadow-md flex flex-col gap-y-3 text-primary border border-orange-100'>
                    <table className='table-auto'>
                        <thead className='bg-primary text-white'>
                            <tr className='text-left'>
                                <th className='text-sm p-5'>Client</th>
                                <th className='text-sm p-5'>Store</th>
                                <th className='text-sm p-5'>Invested Amount</th>
                                <th className='text-sm p-5'>Creation Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investments.map((investment: Investment) => (
                                <tr
                                    className='text-left text-sm'
                                    key={investment._id}
                                >
                                    <td className='p-5 text-sm'>
                                        {investment.client.name}
                                    </td>
                                    <td className='p-5 text-sm'>
                                        {investment.client.store.name}
                                    </td>
                                    <td className='p-5 text-sm'>
                                        $ {investment.amount}
                                    </td>
                                    <td className='p-5 text-sm'>
                                        {handleDate(investment.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {totalInvestments > resultsPerPage && (
                        <div className='flex justify-center items-center my-10'>
                            <button
                                className='bg-primary text-white px-4 py-2 mx-2 rounded-md disabled:cursor-not-allowed'
                                onClick={handlePreviousPage}
                                disabled={page === 0 || loading}
                            >
                                Previous
                            </button>
                            <button
                                className='bg-primary text-white px-4 py-2 mx-2 rounded-md disabled:cursor-not-allowed'
                                onClick={handleNextPage}
                                disabled={
                                    (page + 1) * resultsPerPage >=
                                        totalInvestments || loading
                                }
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                !loading && (
                    <span className='font-light text-lg'>No Investments</span>
                )
            )}
        </div>
    )
}

export default Investments
