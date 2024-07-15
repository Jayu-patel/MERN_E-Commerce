import { toast } from "react-toastify";

const useCreateCategory = () => {

	const createCategory = async (name) => {
		try {
			const res = await fetch("/api/category", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name }),
			});

			const data = await res.json()
			if (data.error) {
				throw new Error(data.error)
			}
            return data

		} catch (error) {
			toast.error(error.message)
        }
	}

	return { createCategory }
}
export default useCreateCategory