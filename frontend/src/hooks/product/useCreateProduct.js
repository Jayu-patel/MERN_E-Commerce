const useCreateProduct =()=>{

    const createProduct =async(formData)=>{

        try{
            const res = await fetch('/api/products',{
                method: "POST",
                body: formData
            })

            const data = await res.json()
            if (data.error) {
				throw new Error(data.error);
			}
            return data
        }
        catch(error){
            console.log(error.message)
        }
    }

    return {createProduct}
}

export default useCreateProduct