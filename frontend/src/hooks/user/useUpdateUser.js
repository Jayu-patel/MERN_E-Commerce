import { toast } from "react-toastify";

const useUpdateUser = () => {

	const updateUser = async (id,user) => {
		try {
			const res = await fetch(`/api/users/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(user),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

		} catch (error) {
			toast.error(error.message);
		}
	};

	return { updateUser };
};
export default useUpdateUser;