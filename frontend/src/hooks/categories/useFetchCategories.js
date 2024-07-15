import { useState } from "react";
import { toast } from "react-toastify";

const useFetchCategories = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false)

	const getData = async () => {
		setLoading(true)
		try {
			const res = await fetch("/api/category/categories", {
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
        }
		finally{
			setLoading(false)
		}
	};

	return { data, refetch: getData, loading };
};
export default useFetchCategories;