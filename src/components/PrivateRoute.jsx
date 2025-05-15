import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isValid = auth.token && new Date(auth.expiresAt) > new Date();

    if (!isValid) {
      navigate("/connexion");
    } else {
      setChecking(false);
    }
  }, [auth, navigate]);

  if (checking) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;