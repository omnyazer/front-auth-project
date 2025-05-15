import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const isValid = auth && new Date(auth.expiresAt) > new Date();

        if (!isValid) {
          throw new Error("Token invalide");
        }
      } catch {
        localStorage.removeItem("auth");
        navigate("/connexion");
        return;
      }
    };

    checkAuth();
  }, [navigate]);

  return <Outlet />;
};

export default PrivateRoute;

