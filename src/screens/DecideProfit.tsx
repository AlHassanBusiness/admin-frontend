import { useEffect, useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { api } from "../api/api"
import toast from "react-hot-toast"

const DecideProfit = () => {
    const [totalInvestment,setTotalIvestment] = useState<number | null>(null)
    const [earning,setEarning] = useState(0)
    const [calculatedEarning,setCalculatedEarning] = useState(0)
    const [toClientPercentage,setToClientPercentage] = useState(0)
    const [toClientValue,setToClientValue] = useState(0)

    const {id} = useParams()
    const navigate = useNavigate()


    useEffect(()=> {
        const getTotalInvestment = async() => {
            try {
                const response = await api.get(`/api/investments/totalinvestment/${id}`)    

                if(response.status===200){
                    setTotalIvestment(response.data.totalAmount)
                    if(totalInvestment === 0){
                        toast.error('Client Investment is 0, please add investment!!')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        getTotalInvestment()

    },[id])

    const handleEarningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if (!isNaN(value)) {
            setEarning(value);
        }
        
    }

    const handleClientPercentageChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const value = parseFloat(e.target.value)
        if(!isNaN(value)){
            setToClientPercentage(value)
        }
    }

    useEffect(() =>{
        if(totalInvestment !==null ){
            let value = toClientPercentage *totalInvestment / 100;
            setToClientValue(value)
        }
    },[toClientPercentage])

    useEffect(() =>{
        if(totalInvestment !==null ){
            let value = earning *totalInvestment / 100;
            setCalculatedEarning(value)
        }
    },[earning])


    const addDecideProfit = async() => {
        try {
            if(!id || calculatedEarning === 0 || toClientValue === 0){
                toast.error("All fields are required!!")
                return 
            }

            const response = await api.post('/api/decidedprofit',{
                client: id,
                total_earning: calculatedEarning,
                to_client: toClientValue
            })

            if(response.status===201){
                toast.success("Profit Decided!!")
                navigate(`/clients/${id}`)
            }

        } catch (error: any) {
            toast.error(error.response.data.error)
        }
    }


  return (
    <div className="flex flex-col mt-10">
        <h3 className="text-3xl font-semibold text-primary mb-10">Decide Profit</h3>
        <div className="flex flex-col min-w-[600px] bg-white shadow-md p-10">
            <p className="flex flex-row justify-between ">
                <span className="font-semibold text-lg">Client's Total Investment</span>
                <span className="text-2xl pacifico">${totalInvestment}</span>
            </p>

            <div className="grid grid-cols-4 items-center gap-x-10 mt-5">
                <input type="number" className="p-2 border border-gray-700 focus:ring-0 focus:outline-none col-span-3" placeholder="Total Earning %percentage" onChange={handleEarningChange} min={1} step={'any'} />
                <span className="border-b border-gray-500 text-right">${calculatedEarning}</span>
            </div>

            <div className="grid grid-cols-4 items-center gap-x-10 mt-5">
                <input type="number" className="p-2 border border-gray-700 focus:ring-0 focus:outline-none col-span-3" placeholder="$percentage to give client" onChange={handleClientPercentageChange} min={1} step={'any'} />
                <span className="border-b border-gray-500 text-right">${toClientValue}</span>
            </div>

            <button className="mt-10 bg-primary text-white p-2 w-[120px] ml-auto" onClick={addDecideProfit}>Add</button>
        </div>
    </div>
  )
}

export default DecideProfit