import { useEffect } from "react";
import { useState } from "react";

const useCreateReview = () => {
	const [isLoading, setLoading] = useState(false);

	const createReview = async (id,rating,comment) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/products/${id}/reviews`, {
				method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({rating,comment})
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(d.error);
			}
            if(data == "Product already reviewed")
                return {err: true, data}
            else return {err: false, data}
            
		} catch (error) {
			return {err: true, error}
		} finally {
			setLoading(false);
		}
	};

	return { createReview, isLoading }
};
export default useCreateReview