import "./navBar.css"
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";


function NavBar() {
    const navigate = useNavigate();
    const {user, setUser, loading} = useContext(AuthContext);
    console.log("AuthContext value in NavBar:", useContext(AuthContext));
    async function handleLogout() {
        try {
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
                <Link to="/products">Products</Link>
                <span> | </span>
                {!loading && user ?
                        <>
                            <span>Welcome, {user.username.split(" ")[0]}</span>
                        </>
                    :
                        <>
                            <Link to="/login">Login</Link>
                            <span> | </span>
                            <Link to="/register">Register</Link>
                        </>

                }
            </nav>
            {user &&
                <button type="button"
                        onClick={handleLogout}
                        className="logout-btn">
                    Logout
                </button>
            }
        </header>

    )
}

export default NavBar;
