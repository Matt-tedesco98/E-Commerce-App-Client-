import NavBar from "./Components/NavBar/navBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            < Routes>
                < Route path="/" element={<h1>Home</h1>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
/**/
