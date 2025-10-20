import {useState} from 'react'
import "./Login.css"
import AuthLayout from "../../Components/AuthLayout/AuthLayout";
import {Link, useNavigate} from "react-router-dom";


export default function Login() {
    const [form, setForm] = useState({username: '', password: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function onSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Login failed.");
                return;
            }
            console.log("Logged in as:", data.username);
            navigate("/");
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthLayout title="Login to your account" footer={<p>
            <Link to="/register">Dont Have an Account Yet?</Link>
        </p>}>
            {error && (
                <div className="error">{error}</div>
            )}
            <form onSubmit={onSubmit}>
                <div className="user-pass">
                    <label>Username</label> <br/>
                    <input
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={onChange}
                        autoComplete="username"
                        required
                    />
                </div>
                <div className="user-pass">
                    <label>Password</label> <br/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        autoComplete="current-password"
                        required
                        minLength={8}
                    />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>
            <div className="external_login">
                <button type="button" onClick={() => {
                    window.location.href = 'http://localhost:4000/auth/facebook'
                }}>Sign In With Facebook
                </button>
                <button type="button" onClick={() => {
                    window.location.href = 'http://localhost:4000/auth/google'
                }}>Sign In With Google
                </button>
            </div>
        </AuthLayout>
    )
}
