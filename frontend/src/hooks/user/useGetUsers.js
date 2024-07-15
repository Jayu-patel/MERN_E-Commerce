import { useState } from 'react';
import { toast } from "react-toastify";

const useGetUsers = (options={}) => {
	const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

	const getData = async () => {
		setLoading(true)
        setError(null)
		try {
			const res = await fetch("/api/users", options);

			const d = await res.json();
			if (d.error) {
				throw new Error(d.error);
			}
            else{
				setData(d)
			} 

		} catch (err) {
			toast.error(err.message);
            setError(err)
		} finally {
			setLoading(false);
		}
	}

	return { data, isLoading, error, refetch: getData  };
};
export default useGetUsers;