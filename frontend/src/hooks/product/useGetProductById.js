import { useEffect, useState } from "react"

const useGetProductById =(id)=>{
    const [data, setData] = useState(null)
    const getData = async()=>{
        try{
            const res = await fetch(`/api/products/${id}`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            })

            const d = await res.json()
            if (d.error) {
				throw new Error(d.error);
			}
            else setData(d)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getData()
    },[])

    return {data}
}

export default useGetProductById