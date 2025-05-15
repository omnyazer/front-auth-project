import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (token) {
          await fetch("https://offers-api.digistos.com/api/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } catch (err) {
        console.error("Erreur lors de la déconnexion :", err);
      } finally {
        dispatch(logout());
        navigate("/connexion");
      }
    };

    handleLogout();
  }, [token, dispatch, navigate]);

  return null;
};

export default Logout;
