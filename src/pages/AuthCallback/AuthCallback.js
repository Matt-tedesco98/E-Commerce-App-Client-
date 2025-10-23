import { useEffect, useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AuthCallback.css";

export default function AuthCallback() {
    const {setUser} = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/auth/me",
                    {
                        credentials: "include",
                    })
                if (!res.ok) {
                    const msg = (await res.json().catch(()=>{})).error || "Not Signed in";
                    setError(msg);
                    setTimeout(()=>{navigate("/login?error=oauth_failed")}, 600)
                    return;
                }
                const user = await res.json();
                setUser(user);
            } catch (e) {
                setError("Network Error");
                setTimeout(()=>{navigate("/login?error=network")}, 600)
            }
        })()
        }, [navigate, setUser]);

        return(
            <div className="auth-callback">
                <h2>Authenticating...</h2>
                {error && <p>{error}</p>}
            </div>
    )
};
