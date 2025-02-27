import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRole } from "../../services/AuthService";
import { auth } from "../../services/firebase.js";

const PrivateRoute = ({ allowedRoles }) => {
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const user = auth.currentUser;
            if (user) {
                const role = await getUserRole(user.uid);
                setUserRole(role);
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    if (loading) return <p>Cargando...</p>;

    if (!auth.currentUser) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(userRole)) return <Navigate to="/" />;

    return <Outlet />;
};

export default PrivateRoute;
