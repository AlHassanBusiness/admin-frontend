import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import AddStore from './AddStore'

interface Store {
    _id: string
    name: string
    totalprofit: number
}

const HomePage = () => {
    const [stores, setStores] = useState<Store[]>([])

    useEffect(() => {
        const getStores = async () => {
            try {
                const response = await api.get('/api/stores')
                if (response.status === 200) {
                    setStores(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getStores()
    }, [])

    const deleteClient = async (storeID: string) => {
        try {
            const confirm = window.confirm(
                'Are you sure you want to delete client?',
            )
            if (!confirm) {
                return
            }
            const response = await api.delete(`/api/stores/${storeID}`)
            if (response.status === 200) {
                setStores(stores.filter((store) => store._id !== storeID))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col gap-y-20'>
            <div className='flex flex-row justify-between items-center'>
                <h3 className='text-3xl font-semibold text-primary'>Stores</h3>
                <Link
                    to={'/stores/add-store'}
                    className='bg-primary text-white rounded-sm p-1'
                >
                    Add Store
                </Link>
            </div>
            <div className='flex flex-row justify-start items-center flex-wrap gap-5'>
                {stores?.map((store: Store) => (
                    <div
                        className='px-3 py-5 bg-white flex flex-col gap-y-5 min-w-[350px] rounded-sm'
                        key={store._id}
                    >
                        <h4 className='text-2xl font-semibold text-primary tracking-wider text-center border-b border-gray-300'>
                            {store.name}
                        </h4>

                        <p className='flex flex-row  justify-between items-center flex-wrap text-lg'>
                            <span>Total Investment</span>
                            <span className='pacifico text-2xl'>
                                {store.totalprofit}
                            </span>
                        </p>

                        <button
                            className='bg-danger text-white p-1 w-16 ml-auto cursor-pointer rounded-sm text-center text-xs'
                            onClick={() => deleteClient(store._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Stores = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/add-store' element={<AddStore />} />
        </Routes>
    )
}

export default Stores
