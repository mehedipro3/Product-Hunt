import { useEffect, useState } from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminPanding, setIsAdminPending] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/admin/${user.email}`)
        .then((res) => {
          setIsAdmin(res.data?.admin === true);
          setIsAdminPending(false);
        })
        .catch((err) => {
          console.error("Admin check failed:", err);
          setIsAdmin(false);
          setIsAdminPending(false);
        });
    } else {
      setIsAdmin(false);
      setIsAdminPending(false);
    }
  }, [user, axiosSecure]);

  return [isAdmin, isAdminPanding];
};

export default useAdmin;
