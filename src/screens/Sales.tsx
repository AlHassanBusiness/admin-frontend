import { Route, Routes ,Link} from "react-router-dom"
import AddSales from "./AddSales"
import { useState,useEffect } from "react"
import Loader from "../components/Loader"
import { api } from "../api/api"
import toast from "react-hot-toast"

type Client = {
  _id: string 
  name: string 
}
type Product = {
  _id: string 
  name: string 
  saleprice: number
  image: string 
}

type Sales = {
  _id: string
  client: Client 
  product: Product 
  customer: string 
  createdAt: string
}


const HomePage = () => {

  const [sales,setSales] = useState<Sales[]>([])
  const [loading,setLoading] =  useState(false)
  const [search,setSearch] = useState('')

  useEffect(() => {

    const getSales = async() => {
      try {
        setLoading(true)
          const response = await api.get('/api/sales')
          if(response.status===200){
            setSales(response.data.data)
            setLoading(false)
          }
      } catch (error:any) {
        toast.error(error.response.data.error)
        setLoading(false)
      }
    }
    getSales()

  },[])


  const handleDate = (createdAt: string) => {
    const date = new Date(createdAt)
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date)
    return formattedDate
}

const filteredSales = sales.filter(sale => 
  sale.client.name.toLowerCase().includes(search.toLowerCase())
)


  

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-row justify-between m-2">
        <h3 className="font-semibold text-3xl text-primary">All Sales</h3>
        <Link to={'/sales/add-sales'} className="bg-primary p-2 text-white font-semibold">Add Sales</Link>
      </div>
      {loading && <Loader />}
      {
        !loading && sales.length > 0 && (
          <div className='min-w-[80%] mx-auto flex flex-col gap-y-3 text-primary'>
        <input type="search" name="searchField" className="p-2 border ring-0 outline-none my-10 border-gray-300 w-[400px]" placeholder="Search By Client Name" onChange={(e) => setSearch(e.target.value)} />
                    <table className='table-auto shadow-md'>
                        <thead className='bg-primary text-white'>
                            <tr className='text-left '>
                              <th className="text-sm p-5">Index</th>
                                <th className='text-sm p-5'>Client</th>
                                <th className='text-sm p-5'>Product</th>
                                <th className='text-sm p-5'>Sale Price</th>
                                <th className="text-sm p-5">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSales?.map((sale: Sales,i: number) => (
                                <tr
                                    className='text-left text-sm mb-3'
                                    key={i}
                                >
                                  <td className="p-5 text-sm">{i+1}</td>
                                    <td className='p-5 text-sm'>
                                        {sale.client.name}
                                    </td>
                                    <td className='p-5 text-sm flex flex-col gap-y-2'>
                                        <span>{sale.product.name}</span>
                                        <img src={`http://localhost:3000/${sale.product.image}`} alt="Product Image" className="w-16 h-16 rounded-md" />
                                    </td>
                                    <td className='p-5 text-sm'>
                                        $ {sale.product.saleprice}
                                    </td>
                                    <td className='p-5 text-sm'>
                                        {handleDate(sale.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
        </div> 
        )
          }
          {
            (
              !loading && sales.length ===0 && (
                <span className='font-light text-lg mt-4'>No Sales for this month</span>
            ))
          }
    </div>
  )
}

export default function Sales() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-sales" element={<AddSales />} />
    </Routes>
  )
}