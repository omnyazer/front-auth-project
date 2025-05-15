import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const expiresAt = localStorage.getItem("expiresAt");
    const isValid = expiresAt && new Date(expiresAt) > new Date();

    if (!isValid) {
      navigate("/connexion");
    } else {
      setChecking(false);
    }
  }, [navigate]);

  if (checking) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
