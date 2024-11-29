import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import TodayDeals from './components/TodaysDeals/TodayDeals';

import Products from './components/Products/Products';
import CartMain from './components/Cart/CartMain';
import DetailedProduct from './components/Products/DetailedProduct';
import LoginMain from './components/Login/LoginMain';
import RegisterMain from './components/Login/RegisterMain';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginContextProvider } from './components/Context/LoginContext';
import Orders from './components/Orders/Orders';
import Settings from './components/Settings/Settings';
import ProductsLayout from './components/Products/ProductsLayout';

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <LoginContextProvider>
        <Router>
          <Routes>
            <Route element={<Layout/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/cart' element={<CartMain/>}/>
              <Route path='/card' element={<TodayDeals/>}/>
              <Route element={<ProductsLayout/>}>
                <Route path='/products' element={<Products/>}/>
              </Route>
              <Route path='/product-detail' element={<DetailedProduct/>}/>
              <Route path='/profile' element={<Settings/>}/>
              <Route path='/orders' element={<Orders/>}/>
            </Route>
            <Route path='/login' element={<LoginMain/>}/>
            <Route path='/register' element={<RegisterMain/>}/>
          </Routes>
        </Router>
      </LoginContextProvider>
    </GoogleOAuthProvider>
  )
}

export default App