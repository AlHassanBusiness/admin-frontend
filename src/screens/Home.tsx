import { FaInfoCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { api } from '../api/api'

const Home = () => {
    const [stores, setStores] = useState<number>(0)
    const [clients, setClients] = useState<number>(0)
    const [investment, setInvestment] = useState<number>(0)

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await api.get('/api/clients/dashboard/details')

                if (response.status === 200) {
                    setStores(response.data.totalStores)
                    setClients(response.data.totalClients)
                    setInvestment(response.data.totalInvestments)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getDetails()
    }, [])

    return (
        <div className='flex flex-col gap-y-28'>
            <h3 className='text-3xl font-semibold text-primary'>Dashboard</h3>
            <div className='flex flex-row lg:justify-center justify-start gap-5 items-center flex-wrap'>
                <div className='px-3 py-5 bg-white flex flex-col gap-y-5 min-w-[300px] rounded-sm'>
                    <div className='flex justify-center items-center border-b border-gray-300'>
                        <h4 className='text-2xl font-semibold text-primary tracking-wider text-center'>
                            Total Clients
                        </h4>
                        <FaInfoCircle className='text-primary ml-1' />
                    </div>
                    <span className='pacifico text-4xl text-primary text-end'>
                        {clients}
                    </span>
                </div>
                <div className='px-3 py-5 bg-white flex flex-col gap-y-5 min-w-[300px] rounded-sm'>
                    <div className='flex justify-center items-center border-b border-gray-300'>
                        <h4 className='text-2xl font-semibold text-primary tracking-wider text-center'>
                            Total Investments
                        </h4>
                        <FaInfoCircle className='text-primary ml-1' />
                    </div>
                    <span className='pacifico text-4xl text-primary text-end'>
                        $ {investment}
                    </span>
                </div>
                <div className='px-3 py-5 bg-white flex flex-col gap-y-5 min-w-[300px] rounded-sm'>
                    <div className='flex justify-center items-center border-b border-gray-300'>
                        <h4 className='text-2xl font-semibold text-primary tracking-wider text-center'>
                            Total Stores
                        </h4>
                        <FaInfoCircle className='text-primary ml-1' />
                    </div>
                    <span className='pacifico text-4xl text-primary text-end'>
                        {clients}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home
