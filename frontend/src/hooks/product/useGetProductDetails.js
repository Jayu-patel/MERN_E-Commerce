import { useEffect } from "react";
import { useState } from "react";

const useGetProductDetails = (id) => {
    const [data, setData] = useState([])
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(null);

	const refetch = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/products/${id}`, {
				method: "GET",
			});

			const d = await res.json();
			setData(d)
			if (d.error) {
				throw new Error(d.error);
			}

		} catch (error) {
			setError(error)
		} finally {
			setLoading(false);
		}
	};

	useEffect(()=>{
		refetch()
	},[])

	return { data , refetch, isLoading, error: isError };
};
export default useGetProductDetails;