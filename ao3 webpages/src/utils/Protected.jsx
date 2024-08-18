import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function Protect() {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Correctly parse cookies
            const cookies = document.cookie.split('; ').reduce((prev, current) => {
                const [name, value] = current.split('=');
                prev[name] = value;
                return prev;
            }, {});

            const accessToken = cookies.accessToken;
            const refreshToken = cookies.refreshToken;
            console.log(accessToken, refreshToken);

            try {
                const response = await fetch('https://ao3-chrome-extension-backend.onrender.com/auth/validate', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Tokens': JSON.stringify({ accessToken, refreshToken }),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    // Store new tokens in cookies
                    document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;
                    document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; samesite=strict`;
                    
                    setAuth(true);
                } else {
                    console.log("Error: " + response.status);
                    setAuth(false);
                }
            } catch (error) {
                console.log(error);
                setAuth(false);
            }
        };

        checkAuth();
    }, []);

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}