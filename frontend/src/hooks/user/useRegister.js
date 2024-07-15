import { useState } from "react";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const useRegister = () => {
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const register = async (username ,email, password) => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({username, email, password }),
			});

			const data = await res.json();

			if(res.status < 400){
				dispatch(setCredentials({ ...data }));
			}
			else{
				toast.error(data?.message)
			}
			return res.status

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { isLoading, register };
};
export default useRegister;