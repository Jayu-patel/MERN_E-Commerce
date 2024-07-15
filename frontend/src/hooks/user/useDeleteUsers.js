import { toast } from "react-toastify";

const useDeleteUser = () => {
	const deleteUser = async (id) => {
		try {
			const res = await fetch(`/api/users/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return {deleteUser}
};
export default useDeleteUser;