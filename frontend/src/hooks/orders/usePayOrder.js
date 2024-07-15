import { useState } from "react";
import { toast } from "react-toastify";

const usePayOrder = () => {
	const [isLoading, setLoading] = useState(false);

	const payOrder = async (id,details) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/orders/${id}/pay`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
                body: JSON.stringify(details)
			});

			const d = await res.json()
			if (d.error) {
				throw new Error(d.error)
			}
		} catch (error) {
			toast.error(error)
		} finally {
			setLoading(false);
		}
	};

	return { payOrder, isLoading }
};
export default usePayOrder