import { useEffect, useState } from "react";

const useGetTopProducts = () => {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);

	const getData = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/products/top`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const d = await res.json();
            setData(d)
			if (d.error) {
                setLoading(false);
                setError(true);
				throw new Error(data.error);
			}

		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

    useEffect(()=>{getData()},[])

	return { data, isLoading, isError };
};
export default useGetTopProducts;