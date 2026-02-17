import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import ProductPage from "./pages/products/ProductPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import OrderHistory from "./pages/Orders/OrderHistory";
import OrderConfirmation from "./pages/Orders/OrderConfirmation";
import Home from "./pages/Home/Home";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import User from "./pages/User/User";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            < Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/auth/callback' element={<AuthCallback/>}/>
                <Route path='/products' element={<ProductPage/>}/>
                <Route path='/products/:productid' element={<ProductDetails/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/checkout' element={<CheckOut/>}/>
                <Route path='/orders' element={<OrderHistory/>}/>
                <Route path='/orders/conformation/:orderid' element={<OrderConfirmation/>}/>
                <Route path='/orders/details/:orderid' element={<OrderDetails/>}/>
                <Route path='/user/:userid' element={<User/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
/**/
