import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [rolePermission, setRolePermission] = useState({});
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const fetchPermission = async () => {
            try {
                const response = await axios.get("/api/roles/user-permissions");
                // Assuming the response has a `permissions` object
                setRolePermission(response.data.permissions || {});
                console.log(response.data.permissions);
            } catch (error) {
                console.error("Failed to fetch permissions:", error);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchPermission();
    }, []);

    return (
        <AuthContext.Provider value={{  rolePermission , loadingUser }}>
            {children}
        </AuthContext.Provider>
    );
};
