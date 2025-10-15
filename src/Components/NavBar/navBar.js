import "./navBar.css"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function NavBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:4000/auth/me', {
                    credentials: 'include',
                });
                if (!res.ok) return;
                const data = await res.json();
                setUser(data);
                console.log("User:", data.username);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })()
    }, [])

   async function handleLogout() {
        try{
            const res = await fetch("http://localhost:4000/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) return;
            setUser(null);
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
   }

    return (
        <header className="navbar-container">
            <nav className="navbar">
                <Link to="/">Home</Link>
                <span> | </span>
                {!loading && (user ? (
                        <>
                            <span>Welcome, {user.username}</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <span> | </span>
                            <Link to="/register">Register</Link>
                        </>
                    )
                )}
            </nav>
            {user (
                <button type="button"
                        onClick={handleLogout}
                        className="logout-btn">
                    Logout
                </button>
            )}
        </header>

    )
}

export default NavBar;
