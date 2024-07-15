import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import AddStore from './AddStore'
import Loader from '../components/Loader'
import Products from './Products'
import toast from 'react-hot-toast'

interface Store {
    _id: string
    name: string
    totalprofit: number
}

const HomePage = () => {
    const [stores, setStores] = useState<Store[]>([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const getStores = async () => {
            try {
                setLoading(true)
                const response = await api.get('/api/stores')
                if (response.status === 200) {
                    setStores(response.data.data)
                    setLoading(false)
                }
            } catch (error) {
                toast.error("Error while getting stores")
                setLoading(false)
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
            toast.error("Error deleting client")
        }
    }

    return (
        <div className='flex flex-col gap-y-20'>
            <div className='flex flex-row justify-between items-center m-10'>
                <h3 className='text-3xl font-semibold text-primary'>Stores</h3>
                <Link
                    to={'/stores/add-store'}
                    className='bg-primary text-white rounded-sm p-2 text-lg'
                >
                    Add Store
                </Link>
            </div>
            {stores.length > 0 && (
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
                            <div className='flex flex-row justify-between items-center m-2'>
                                <Link to={`/stores/${store._id}/products`} className='bg-primary p-2 text-white rounded-sm'>See Products</Link>
                                <button
                                    className='bg-danger text-white p-2 cursor-pointer rounded-sm text-center '
                                    onClick={() => deleteClient(store._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) }
            {stores.length === 0 && !loading && <span>No Stores</span>}
            {loading && <Loader />}
        </div>
    )
}

const Stores = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/add-store' element={<AddStore />} />
            {/* <Route path='/:id/addproduct' element={<AddProduct />} /> */}
            <Route path='/:id/products/*' element={<Products />} />
        </Routes>
    )
}

export default Stores
