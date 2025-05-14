import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;

        if (token) {
          await fetch("https://offers-api.digistos.com/api/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }

        localStorage.removeItem("auth");
        navigate("/connexion");
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
