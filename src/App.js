import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>;
                <Link to="/register">register</Link>;
            </nav>

            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App;
