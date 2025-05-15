import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const isValid = auth.token && new Date(auth.expiresAt) > new Date();
    if (!isValid) {
      dispatch(logout());
      navigate("/connexion");
    }
  }, [auth, dispatch, navigate]);

  return <Outlet />;
};

export default PrivateRoute;
