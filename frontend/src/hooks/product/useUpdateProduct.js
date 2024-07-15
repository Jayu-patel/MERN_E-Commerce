const useUpdateProduct = () => {
	const updateProduct = async (id,formData) => {
		try {
			const res = await fetch(`/api/products/${id}`, {
				method: "PUT",
				body: formData,
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            return data

		} catch (error) {
			console.log(error.message)
        }
	};

	return { updateProduct }
};
export default useUpdateProduct