const useUpdateCategory = () => {

	const updateCategory = async (id,userData) => {
		try {
			const res = await fetch(`/api/category/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
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

	return {  updateCategory }
};
export default useUpdateCategory