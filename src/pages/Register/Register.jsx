import {useState} from 'react'
import "./Register.css"
import {Link} from "react-router-dom";
import AuthLayout from "../../Components/AuthLayout/AuthLayout";


export default function Register() {
    const [form, setForm] = useState({username: '', password: ''});

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function onSubmit(e) {
        e.preventDefault()
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
            if (!res.ok) throw new Error(data.error || "Register failed.");
            console.log("Registered as:", data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthLayout title="Create your account"
                    footer={<p><Link to="/login">Already have an account? Log in</Link></p>}>
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
                <button type="submit">Sign Up</button>
            </form>
        </AuthLayout>
    )
}
