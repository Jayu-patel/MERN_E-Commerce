import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetFilteredProducts = (formData) => {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false)

	const getData = async () => {
		setLoading(true)
		try {
			const res = await fetch("/api/products/filtered-products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
			});

			const d = await res.json();
			if (d.error) {
				throw new Error(d.error);
			}
            setData(d)

		} catch (error) {
			toast.error(error.message);
        }
		finally{
			setLoading(false)
		}

	};

    useEffect(()=>{
        getData()
    },[])

	return { data , isLoading, getData };
};
export default useGetFilteredProducts;