import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

export interface User {
    email: string,
}
export function useAuth(): [boolean, User | null] {
    const [user, setUser] = useState<User | null>(null);
    const token = localStorage.getItem("jwt");
    const isAuthenticated = !!token;

    useEffect(() => {
        if (isAuthenticated && token) {
            try {
                const decodedJwt = jwtDecode(token);
                if (decodedJwt.sub)
                    setUser({ email: decodedJwt.sub });
            } catch (error) {
                // Handle JWT decode error, maybe log it or clear local storage
                console.error("Error decoding JWT:", error);
                localStorage.removeItem("jwt"); // Clear invalid token
                setUser(null); // Reset user state
            }
        } else {
            setUser(null); // Reset user state if not authenticated
        }
    }, [isAuthenticated, token]);

    return [isAuthenticated, user];
}