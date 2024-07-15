import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetMyOrder = () => {
	const [isLoading, setLoading] = useState(false);
    const [errorr, setError] = useState(null)
    const [data, setData] = useState(null)

	const getMyOrder = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/orders/mine", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const d = await res.json();
			if (d.error) {
				throw new Error(d.error);
			}
			else setData(d)

		} catch (error) {
			toast.error(error.message);
            setError(error)
		} finally {
			setLoading(false);
		}
	};
	useEffect(()=>{
		getMyOrder()
	},[])

	return { isLoading, errorr, data };
};
export default useGetMyOrder;