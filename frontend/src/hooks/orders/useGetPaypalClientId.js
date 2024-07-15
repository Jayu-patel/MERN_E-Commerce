import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetPaypalId = () => {
	const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [data, setData] = useState([])

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/config/paypal`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const d = await res.json()
			if (d.error) {
                setError(true)
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
        fetchData()
    },[])

	return { isLoading, error, data }
};
export default useGetPaypalId