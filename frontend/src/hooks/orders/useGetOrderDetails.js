import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetOrderDetails = (id) => {
	const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [data, setData] = useState([])

	const refetch = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/orders/${id}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const d = await res.json()
			if (d.error) {
                setError(d)
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
        refetch()
    },[])

	return { isLoading, error, data, refetch }
};
export default useGetOrderDetails