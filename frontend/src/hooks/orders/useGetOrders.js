import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetOrders = () => {
	const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [data, setData] = useState([])

	const getData = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/orders`, {
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

    useEffect(()=>{getData()},[])

	return { data, isLoading, error }
};
export default useGetOrders