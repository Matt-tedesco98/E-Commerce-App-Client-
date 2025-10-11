import "./App.css"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <span> | </span>
                <Link to="/register">Register</Link>
            </nav>

            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>

        </BrowserRouter>)
}

export default App;
