import { Navigate } from "react-router-dom";
import React from "react";
import useAuthStore from "../useStore";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  return isAuthorized() ? <Component /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
