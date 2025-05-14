import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const isValid = auth && new Date(auth.expiresAt) > new Date();

    if (!isValid) {
      localStorage.removeItem("auth");
      navigate("/connexion");
    }
  }, [navigate]);

  return <Outlet />;
};

export default PrivateRoute;
