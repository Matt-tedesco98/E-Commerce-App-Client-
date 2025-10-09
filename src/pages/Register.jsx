import {useState} from 'react'

export default function Register() {
    const [form, setForm] = useState({username: '', password: ''});

    function onChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    return (
        <h1>Register</h1>
    )
}
