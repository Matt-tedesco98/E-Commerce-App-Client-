import './User.css'
import {AuthContext} from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useCart from "../../context/useCart";

export default function User() {
    const {user, loading, setUser} = useContext(AuthContext);
    console.log("User:", user);
    const {error} = useCart(user)
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const res = await fetch("http://localhost:4000/api/auth/logout", {
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

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, navigate, user])

    if (loading) return <div>Loading...</div>;
    if (!user) return null;
    if (error) return <div>Error: {error.message}</div>

    if (user.userid !== user.userid) return (<div>User ID mismatch</div>)

    return (
        <div className="user-page">
            <h1 className="user-heading">Welcome, {user.firstname || 'Guest'}</h1>
            <button onClick={() => navigate("/cart")}>View Cart</button>
            <button onClick={() => navigate("/orders")}>View Orders</button>
            <button className="logout-btn" onClick={() => handleLogout()}>Logout</button>
        </div>
    )
}
