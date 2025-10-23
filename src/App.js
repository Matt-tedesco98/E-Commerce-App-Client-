import NavBar from "./Components/NavBar/navBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthCallback from "./pages/AuthCallback/AuthCallback";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            < Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/auth/callback' element={<AuthCallback/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
/**/
