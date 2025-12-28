import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

const RouteGuard = ({ authenticate, user, element }) => {
  const location = useLocation();

  if (!authenticate && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticate &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") || location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticate &&
    user?.role == "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  return <Fragment>{element}</Fragment>;
};

export default RouteGuard;
