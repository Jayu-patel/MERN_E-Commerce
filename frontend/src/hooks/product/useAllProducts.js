// allproducts

import { useEffect, useState } from "react";

const useAllProducts = () => {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)


	const getData = async () => {
        setLoading(true)
		try {
			const res = await fetch(`/api/products/allproducts`);

			const d = await res.json();
			if (d.error) {
                setError(true);
                setLoading(false);
				throw new Error(data.error);
			}
            else{
                setLoading(false)
                setData(d)
            }
		} catch (error) {
            console.log(error.message)
        }
	};
    useEffect(()=>{getData()},[])

	return {  data, isLoading, isError }
};
export default useAllProducts