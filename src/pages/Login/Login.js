import {useState} from 'react'
import "./Login.css"
import {Link} from "react-router-dom";


export default function Login() {
    const [form, setForm] = useState({username: '', password: ''});

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function onSubmit(e) {
    }

    return (
        <div className="head">
            <h1>Sign In</h1>
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
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        autoComplete="new-password"
                        required
                        minLength={8}
                    />
                </div>
                <button type="submit">Sign In</button>
            <div>
                <p>
                    <Link to="/register">Dont Have an Account Yet?</Link>
                </p>
            </div>
            <div className="external_login">
                <button>Sign In With Facebook</button>
                <button>Sign In With Google</button>
            </div>

            </form>
        </div>
    )
}
