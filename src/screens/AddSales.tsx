import Loader from "../components/Loader"
import { api } from "../api/api"
import { useState,useEffect } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"


type Client = {
    _id: string 
    name: string 
  }
  type Product = {
    _id: string 
    name: string 
    image: string 
  }

const AddSales = () => {

    const [clients,setClients] = useState<Client[]>([])
  const [products,setProducts] = useState<Product[]>([])
  const [loading,setLoading] = useState(false)
  const [selectedClient,setSelectedClient] = useState('')
  const [selectedProduct,setSelectedProduct] = useState('')
  const [formLoading,setFormLoading]= useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const getData = async() => {
      try {
        setLoading(false)
        const clientsResponse = await api.get('/api/clients/allclients')
        const productsResponse = await api.get('/api/products')

        clientsResponse.status===200 && setClients(clientsResponse.data.data)
        productsResponse.status===200 && setProducts(productsResponse.data.data)

        setLoading(false)

      } catch (error:any) {
        toast.error(error.response.data.error)
      }
    }
    getData()
},[])

const handleAddSales = async()=> {
  try {
    setFormLoading(true)
    if(selectedClient === '' || selectedProduct === ''){
      toast.error("Please select correct options")
      return 
    }
    let customer = ''
    const response = await axios.get('https://randomuser.me/api/?results=1')
    if(response.status===200){
        customer+=response.data.results[0].name.first 
        customer+= ' '
        customer+=response.data.results[0].name.last 
    }

    const salesResponse = await api.post('/api/sales',{
      client: selectedClient,
      product: selectedProduct,
      customer
    })

    if(salesResponse.status===201){
      toast.success("Sales added successfully")
      navigate('/sales')
      setFormLoading(false)
    }

  } catch (error:any) {
      toast.error(error.response.data.error)
      setFormLoading(false)
  }
}

  return (
    <div className="flex flex-col mt-10"> 
      <h3 className="text-3xl font-semibold  text-primary">Add Sales</h3>
      <div className="flex bg-white p-10 shadow-lg m-10 rounded-md flex-col">
        <div className="grid grid-cols-2 gap-x-10">

          <div className="flex flex-col">
            <label htmlFor="client">Select Client</label>
            {loading && <Loader />}
            {
            clients?.length > 0 && 
            <select name="client" id="client" className="p-2 bg-primary text-white rounded-sm" onChange={(e) => setSelectedClient(e.target.value)}>
              <option value="">....</option>
              {
                clients?.map((client: Client) => (
                  <option value={client._id} key={client._id}>{client.name}</option>
                ))
              }
            </select>  
              }
          </div>

          <div className="flex flex-col">
            <label htmlFor="client">Select Product</label>
            {loading && <Loader />}
            {
            products?.length > 0 && 
            <select name="product" id="product" className="p-2 bg-primary text-white rounded-sm" onChange={(e) => setSelectedProduct(e.target.value)}>
              <option value="">....</option>
              {
                products?.map((product: Product) => (
                  <option value={product._id} key={product._id} className="p-2 flex flex-row">
                    {product.name}
                  </option>
                ))
              }
            </select>  
              }
          </div>
        </div>
        <button className="mt-10 bg-primary p-2 text-white min-w-[120px] rounded-sm font-semibold ml-auto" onClick={handleAddSales} disabled={formLoading}>
          {formLoading ? 'Creating...' : 'Add'}
        </button>
      </div>
    </div>
  )
}

export default AddSales