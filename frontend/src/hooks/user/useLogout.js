import { toast } from "react-toastify";

const useLogout = () => {

	const logoutHook = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
		} 
        catch (error) {
			toast.error(error.message);
		}
	};

	return { logoutHook };
};
export default useLogout;