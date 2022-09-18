import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

const LayaoutRequireAuth = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};
export default LayaoutRequireAuth;
