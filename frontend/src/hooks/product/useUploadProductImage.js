
const useUploadProductImage =()=>{

    const uploadProductImage =async(formData)=>{

        try{
            const res = await fetch('/api/upload',{
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

    return {uploadProductImage}
}

export default useUploadProductImage