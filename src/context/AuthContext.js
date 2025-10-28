import React, {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            (async () => {
                try {
                    const res = await fetch('http://localhost:4000/auth/me', {
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    const ct = res.headers.get('content-type');
                    if (!ct.includes('application/json')) {
                        const msg = await res.text();
                        console.error('expected JSON from /auth/me, got:', msg.slice(0, 200));
                        return;
                    }

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
        },[setUser, setLoading]);

    return(
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
}
