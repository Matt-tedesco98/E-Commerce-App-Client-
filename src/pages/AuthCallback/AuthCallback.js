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
                const res = await fetch("http://localhost:4000/auth/me",
                    {
                        credentials: "include",
                        headers: {
                            "Accept": "application/json"
                        },
                    })

                const ct = res.headers.get("content-type");
                if (!ct.includes("application/json")) {
                    const msg = await res.text();
                    console.error("expected JSON from /auth/me, got:", msg.slice(0, 200));
                    setError('Auth endpoint returned HTML. Check your API URL / proxy.');
                    setTimeout(()=>{navigate("/login?error=oauth_failed")}, 800)
                    return;
                }
                if (!res.ok) {
                    const msg = (await res.json().catch(()=>{})).error || "Not Signed in";
                    setError(msg);
                    setTimeout(()=>{navigate("/login?error=oauth_failed")}, 600)
                    return;
                }
                const user = await res.json();
                setUser(user);
                console.log("User:", user.username);
                setTimeout(()=>{navigate("/")}, 600)
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
