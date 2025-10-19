import React, {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            (async () => {
                try {
                    const res = await fetch('/auth/me', {
                        credentials: 'include',
                    });
                    if (!res.ok) return;
                    const data = await res.json();
                    setUser(data);
                    console.log("User:", data.username);
                } catch (e) {
                    console.error("Auth check failed", e);
                } finally {
                    setLoading(false);
                }
            })();
        },[]);

    return(
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
}
