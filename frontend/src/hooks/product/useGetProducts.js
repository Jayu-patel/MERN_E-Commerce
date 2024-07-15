import { useEffect, useState } from "react";

const useGetProducts = (keyword) => {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);

	const key = keyword ? keyword : ''

	const getData = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/products?keyword=${key}`, {
				method: "GET",
				// headers: { "Content-Type": "application/json" },
                // body: JSON.stringify(keyword)
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
export default useGetProducts;