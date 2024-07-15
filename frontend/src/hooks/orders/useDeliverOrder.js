import { useState } from "react";
import { toast } from "react-toastify";

const useDeliverOrder = () => {
	const [isLoading, setLoading] = useState(false);

	const deliverOrder = async (id) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/orders/${id}/deliver`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
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

	return { deliverOrder, isLoading }
};
export default useDeliverOrder