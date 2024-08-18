import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
    const [isAuth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true); // Added loading state to handle async checks

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log('Checking tokens:', { accessToken, refreshToken });

            if (!accessToken || !refreshToken) {
                setAuth(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://ao3-chrome-extension-backend.onrender.com/auth/validate', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Tokens': JSON.stringify({ accessToken, refreshToken }),
                    },
                });

                if (response.ok) {
                    // Tokens are valid
                    setAuth(true);
                } else {
                    // Tokens are invalid
                    console.log('Token validation failed:', response.status);
                    setAuth(false);
                }
            } catch (error) {
                console.error('Error during token validation:', error);
                setAuth(false);
            } finally {
                setLoading(false); // Update loading state
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while checking
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
