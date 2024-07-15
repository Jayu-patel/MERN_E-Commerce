const useDeleteProduct = () => {
	const deleteProduct = async (id) => {
		try {
			const res = await fetch(`/api/products/${id}`, {
				method: "DELETE",
			});

			const data = await res.json()
			if (data.error) {
				throw new Error(data.error)
			}
            return data

		} catch (error) {
			console.log(error.message)
        }
	};

	return { deleteProduct }
};
export default useDeleteProduct