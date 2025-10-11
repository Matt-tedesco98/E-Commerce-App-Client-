import {useState} from 'react'

export default function Register() {
    const [form, setForm] = useState({username: '', password: ''});

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    function onSubmit() {
        console.log(form)
    }

    return (
        <div>
            <h1>Create your account</h1>
            <form onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
                <div>
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
                <div>
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
