import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import {  useSelector } from "react-redux";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const isValid = auth.token && new Date(auth.expiresAt) > new Date();

    if (!isValid) {
      navigate("/connexion");
    }
  }, [auth, navigate]);

  return <Outlet />;
};

export default PrivateRoute;
