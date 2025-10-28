import {useContext, useState} from 'react'
import "./Register.css"
import {Link} from "react-router-dom";
import AuthLayout from "../../Components/AuthLayout/AuthLayout";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";


export default function Register() {
    const [form, setForm] = useState({username: '', password: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function onSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch("http://localhost:4000/auth/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "User already exists.");
            return;
            }
            console.log("Registered as:", data);
            setSuccess('Account created successfully! Redirecting....');
            setTimeout(() =>{navigate('/')}, 1500)
            setUser(data);
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthLayout title="Create your account"
                    footer={<p><Link to="/login">Already have an account? Log in</Link></p>}>
            {error && (
                <div className="error">{error}</div>
            )}
            {success && (
                <div className="success">{success}</div>
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
                        autoComplete="new-password"
                        required
                        minLength={8}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>
            </form>
        </AuthLayout>
    )
}
