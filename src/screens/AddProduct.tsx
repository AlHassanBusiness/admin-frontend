import { useParams,useNavigate } from "react-router-dom"
import { api } from "../api/api"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"


const AddProduct = () => {
    const {id} = useParams()

    const navigate = useNavigate()

    const [name,setName] =useState('')
    const [description,setDescription] = useState('')
    const [costprice,setCostPrice] = useState<number>(0)
    const [saleprice,setSalePrice] = useState<number>(0)
    const [image,setImage] = useState<string  |null>(null)
    const [finalImage,setFinalImage] = useState<File | null>(null)

    const [loading,setLoading] = useState<boolean>(false)

    
    const handleSubmit = async() => {
        try {

            if(name === '' || description==='' || costprice===0 || saleprice===0 || image === null){
                toast.error('All fields are required') 
                return 
            }

            let formData = new FormData()
            formData.append('name',name);
            formData.append('description',description);
            formData.append('costprice',costprice.toString())
            formData.append('saleprice',saleprice.toString())
            if(id){
                formData.append('store',id)
            }
            if(finalImage){
                formData.append('image',finalImage)
            }

            const response = await api.post('/api/products',formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if(response.status===200){
                toast.success('Product added successfully')
                navigate(`/stores/${id}/products`)
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        setFinalImage(file);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };


  return (
    <div className='w-full h-screen flex justify-start mt-10 items-center flex-col'>
            <h4 className='text-3xl font-extrabold tracking-wider mb-10 text-primary'>
                Add New Product 
            </h4>
            <div className='flex flex-col bg-white shadow-2xl p-5 gap-y-2'>
                
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='fullname' >
                            Product Name*
                        </label>
                        <input
                            type='text'
                            name='name'
                            className=' border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='w-full'>
                        <label htmlFor='description' >
                            Product Description*
                        </label>
                        <textarea 
                            name='description'
                            cols={10}
                            rows={3}
                            className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary resize-none'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                   
                
                <div className="mt-2 w-full flex fle-row justify-center items-center gap-x-5">
                <div className='w-full '>
                        <label htmlFor='cost price' >
                            Cost Price*
                        </label>
                        <div className='relative'>
                            <input
                                type="number"
                                name='cost price'
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                required
                                min={0}
                                value={costprice}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCostPrice(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='sale price' >
                            Sale Price*
                        </label>
                        <input
                            type='number'
                            name='sale price'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            min={0}
                            value={saleprice}
                            onChange={(e) => setSalePrice(parseFloat(e.target.value))}
                        />
                    </div>
                </div>
                <div className='mt-2 w-full flex flex-col gap-x-5'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='Product Image' className='text-xs'>
                            Product Image*
                        </label>
                        <input
                            type='file'
                            name='productimage'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                            required 
                            onChange={handleImageChange}
                        />
                    </div>
                    {
                        image && 
                        (
                            <img className="w-32 h-32 rounded-md mt-5" src={image} alt="Product image" />
                        )
                    }

                </div>
                <button
                    className='bg-primary text-white p-2 rounded-md mt-4 w-20 ml-auto focus:ring-0 focus:outline-none'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Creating....': 'Create'}
                </button>
            </div>
        </div>
  )
}

export default AddProduct