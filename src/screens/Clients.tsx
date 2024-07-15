import { Routes, Route, Link, NavLink } from 'react-router-dom'
import SingleClient from './SingleClient'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import DecideProfit from './DecideProfit'
import Loader from '../components/Loader'

interface Client {
    _id: string
    name: string
    email: string
    phone: string
}

const HomePage = () => {
    const [clients, setClients] = useState<Client[]>([])
    const [page, setPage] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [totalClients, setTotalClients] = useState<number>(0)
    const [search, setSearch] = useState<string>('')


    const resultsPerPage = 10

    const getClients = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/api/clients?page=${page}`)
            if (response.status === 200) {
                setClients(response.data.data)
                setTotalClients(response.data.total)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getClients()
    }, [page])

    const deleteClient = async (clientID: string) => {
        try {
            const confirm = window.confirm(
                'Are you sure you want to delete client?',
            )
            if (!confirm) return

            const response = await api.delete(`/api/clients/${clientID}`)
            if (response.status === 200) {
                setClients((prevClients) =>
                    prevClients.filter((client) => client._id !== clientID),
                )
                setTotalClients((prevTotal) => prevTotal - 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const filteredClients = search
        ? clients.filter((client) =>
              client.name.toLowerCase().includes(search.toLowerCase()),
          )
        : clients

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if ((page + 1) * resultsPerPage < totalClients) {
            setPage(page + 1)
        }
    }

    return (
        <div className='min-h-screen overflow-auto'>
            <h3 className='text-3xl font-semibold text-primary mb-10'>
                Clients
            </h3>
            <input
                type='search'
                name='searchclients'
                id='searchclients'
                placeholder='Search Clients...'
                className='mb-7 p-2 bg-primary rounded-md w-fit ml-auto focus:ring-0 focus:outline-none text-white'
                value={search}
                onChange={handleSearch}
            />
            <div className='flex flex-row justify-start items-center flex-wrap gap-5'>
                {filteredClients.map((client: Client) => (
                    <div
                        className='px-3 py-5 bg-white shadow-2xl flex flex-col gap-y-5 min-w-[350px] rounded-sm'
                        key={client._id}
                    >
                        <h4 className='text-2xl font-semibold text-primary tracking-wider text-center border-b border-gray-300'>
                            {client.name}
                        </h4>
                        <p className='flex flex-row justify-between items-center flex-wrap text-sm'>
                            <span className='font-semibold'>Email: </span>
                            <span>{client.email}</span>
                        </p>
                        <p className='flex flex-row justify-between items-center flex-wrap text-sm'>
                            <span className='font-semibold'>Phone: </span>
                            <span>{client.phone}</span>
                        </p>
                        <div className='flex justify-between items-center gap-x-2 flex-wrap'>
                            <NavLink
                                to={`/edit-client/${client._id}`}
                                className='bg-primary px-4 py-1 rounded-sm cursor-pointer '
                            >
                                <CiEdit className='text-white text-lg' />
                            </NavLink>
                            <Link
                                to={`/clients/${client._id}`}
                                className='bg-primary text-white px-3 py-1 text-sm rounded-sm'
                            >
                                View Details
                            </Link>
                            <button
                                className='bg-danger text-white px-4 py-1 cursor-pointer rounded-sm'
                                onClick={() => deleteClient(client._id)}
                            >
                                <MdDelete className='text-lg' />
                            </button>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Link
                                to={`/investment/${client._id}`}
                                className='bg-primary text-white p-2 text-center'
                            >
                                Add Investment
                            </Link>
                            
                            <Link
                                to={`/clients/decideprofit/${client._id}`}
                                className='bg-primary text-white p-2 text-center'
                            >
                                Decide Profit 
                            </Link>

                        </div>
                    </div>
                ))}
                
            </div>
            {totalClients !== clients.length && (
                <div className='flex justify-center mt-10'>
                    <button
                        className='bg-primary text-white px-4 py-2 mx-2 rounded-md disabled:cursor-not-allowed '
                        onClick={handlePreviousPage}
                        disabled={page === 0 || loading}
                    >
                        Previous
                    </button>
                    <button
                        className='bg-primary text-white px-4 py-2 mx-2 rounded-md disabled:cursor-not-allowed'
                        onClick={handleNextPage}
                        disabled={
                            (page + 1) * resultsPerPage >= totalClients ||
                            loading
                        }
                    >
                        Next
                    </button>
                </div>
            )}
            {loading && <div className='text-center mt-4'><Loader /></div>}
            {clients.length === 0 &&  <span>No Clients</span> }
        </div>
    )
}

const Clients = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:id' element={<SingleClient />} />
            <Route path='/decideprofit/:id' element={<DecideProfit />} />
        </Routes>
    )
}

export default Clients
