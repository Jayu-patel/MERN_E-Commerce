const useDeleteCategory = () => {

	const deleteCategory = async (id) => {
		try {
			const res = await fetch(`/api/category/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json()
			if (data.error) {
				throw new Error(data.error)
			}
			return data

		} catch (error) {
			return error
		}
	};

	return { deleteCategory }
};
export default useDeleteCategory