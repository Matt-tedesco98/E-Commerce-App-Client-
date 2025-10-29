import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import ProductPage from "./pages/products/ProductPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            < Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/auth/callback' element={<AuthCallback/>}/>
                <Route path='/products' element={<ProductPage/>}/>
                <Route path='/products/:id' element={<ProductDetails/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
/**/
