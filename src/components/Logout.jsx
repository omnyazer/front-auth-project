import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fetch("https://offers-api.digistos.com/api/auth/logout", {
          method: "POST",
          credentials: "include", 
        });
      } catch (err) {
        console.error("Erreur lors de la déconnexion :", err);
      } finally {
        localStorage.removeItem("expiresAt"); 
        navigate("/connexion"); 
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
