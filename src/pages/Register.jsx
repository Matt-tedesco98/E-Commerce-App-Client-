import {useState} from 'react'
import "./Register.css"

export default function Register() {
    const [form, setForm] = useState({username: '', password: ''});

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function onSubmit() {
        try {
            const res = await fetch("http://localhost:4000/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Register failed.");
            console.log("Registered as:", data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="head">
            <h1>Create your account</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
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
        </div>
    )
}
