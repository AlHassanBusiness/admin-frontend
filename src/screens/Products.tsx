import { Routes, Route, Link,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import AddProduct from './AddProduct'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'

interface Product {
    _id: string
    name: string
    description: string 
    costprice: number 
    saleprice: number 
    image: string 
}


const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading,setLoading] = useState<boolean>(false)

    const {id} = useParams()

    const getProducts = async () => {
        try {
            setLoading(true)
            if(id)
            {
                const response = await api.get(`/api/products/${id}`)
                if (response.status === 200) {
                    setProducts(response.data.data)
                    setLoading(false)
                }
            }
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    const deleteProduct = async (productId: string) => {
        try {
            const confirm = window.confirm(
                'Are you sure you want to delete client?',
            )
            if (!confirm) {
                return
            }
            setLoading(true)
            const response = await api.delete(`/api/products/${productId}`)
            if (response.status === 200) {
                toast.success("Product deleted successfully")
                getProducts()
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error deleting Product')
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-y-20 m-5'>
            <div className='flex flex-row justify-between items-center'>
                <h3 className='text-3xl font-semibold text-primary'>Products</h3>
                <Link
                    to={`/stores/${id}/products/addproduct`}
                    className='bg-primary text-white rounded-sm p-2 text-lg'
                >
                    Add Product 
                </Link>
            </div>
            {products.length > 0 ? (
                <div className='w-full overflow-auto'>
                    <table className="table-auto w-full">
                        <thead className='bg-primary text-white'>
                            <tr >
                                <th className='p-2'>Index</th>
                                <th className='p-2'>Image</th>
                                <th className='p-2'>Name</th>
                                <th className='p-2'>Description</th>
                                <th className='p-2'>Cost Price</th>
                                <th className='p-2'>Sale Price</th>
                                <th className='p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                products?.map((product: Product,i) => (
                                    <tr key={i+1} className='border-b border-gray-600'>
                                        <td className='text-center p-2'>{i+1}</td>
                                        <td className='p-2 flex justify-center items-center'>
                                            <img src={product.image} alt="Product Image" className='w-16 h-16 rounded-lg' />
                                        </td>
                                        <td className='text-center p-2'>
                                            {product.name}
                                        </td>
                                        <td className='text-center p-2'>
                                            {product.description}
                                        </td>
                                        <td className='text-center p-2'>
                                            $ {product.costprice}
                                        </td>
                                        <td className='text-center p-2'>
                                            {product.saleprice}
                                        </td>
                                        <td className='text-center p-2'>
                                            <button className='p-2 text-sm bg-red-500 text-white rounded-md font-medium' onClick={() => deleteProduct(product._id)}>Delete</button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No Products</p>
            )}
            {
                loading && <div className='flex justify-center items-center'> <Loader /> </div>
            }
        </div>
    )
}

const Stores = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/addproduct' element={<AddProduct />} />
        </Routes>
    )
}

export default Stores
