import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  path: string | string[];
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, ...props }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

export default PrivateRoute;
