import { useState } from "react";
import { toast } from "react-toastify";

const useCreateOrder = () => {
	const [isLoading, setLoading] = useState(false);
    const [err, setError] = useState({
        error: false,
        message: ""
    })

	const createOrder = async (userData) => {
		setLoading(true);
		try {
			const res = await fetch("/api/orders", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});

			const d = await res.json();
			if (d.error) {
                setError({
                    error: true,
                    message: d
                });
				throw new Error(d.error);
			}
            return d

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { createOrder, isLoading, err };
};
export default useCreateOrder;