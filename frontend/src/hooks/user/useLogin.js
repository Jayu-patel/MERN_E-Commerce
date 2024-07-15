import { useState } from "react";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const useLogin = () => {
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const login = async (email, password) => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
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

	return { isLoading, login };
};
export default useLogin;