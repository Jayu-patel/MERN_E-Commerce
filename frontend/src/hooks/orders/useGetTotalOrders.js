import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetTotalOrders = () => {
	const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([])

	const getData = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/orders/total-orders`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const d = await res.json()
			if (d.error) {
				throw new Error(d.error)
			}
            setData(d)
		} catch (error) {
			toast.error(error)
		} finally {
			setLoading(false);
		}
	};

    useEffect(()=>{
        getData()
    },[])

	return { data, isLoading }
};
export default useGetTotalOrders