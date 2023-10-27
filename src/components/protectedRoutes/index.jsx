import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("userToken") === null) {
    return <Navigate to={"/signin"} />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
