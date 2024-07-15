import { useState } from "react";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const useUpdateProfile = () => {
	const [loadingUpdateProfile, setLoading] = useState(false);
	const dispatch = useDispatch();

	const updateProfile = async (user) => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(user),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			else dispatch(setCredentials({ ...data }));

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loadingUpdateProfile, updateProfile };
};
export default useUpdateProfile;