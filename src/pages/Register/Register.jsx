import {useContext, useState} from 'react'
import "./Register.css"
import {Link} from "react-router-dom";
import AuthLayout from "../../Components/AuthLayout/AuthLayout";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";


export default function Register() {
    const [form, setForm] = useState({email: '',password: '', firstname: '', lastname: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }
    console.log(form)

    async function onSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch("http://localhost:4000/api/auth/register", {
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
            setTimeout(() => {
                navigate('/')
            }, 1500)
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
                    <label>Email</label> <br/>
                    <input
                        id="signup-email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        autoComplete="email"
                        required
                    />
                </div>
                <div className="user-pass">
                    <label>First Name</label> <br/>
                    <input
                        id="signup-name"
                        name="firstname"
                        value={form.firstname}
                        onChange={onChange}
                        autoComplete="given-name"
                        required
                    />
                </div>
                <div className="user-pass">
                    <label>Last Name</label> <br/>
                    <input
                        id="signup-lastname"
                        name="lastname"
                        value={form.lastname}
                        onChange={onChange}
                        autoComplete="family-name"
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
                        required
                        minLength={6}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>
            </form>
        </AuthLayout>
    )
}
