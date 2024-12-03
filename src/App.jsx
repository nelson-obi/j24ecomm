import About from "./components/About";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import FeaturedTrends from "./components/FeaturedTrends";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { EcomProvider } from "./context/EcomContext";
import Products from "./components/pages/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/pages/ProductDetails";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import ThankYou from "./components/pages/ThankYou";
import Alert from "./components/shared/Alert";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import {AuthProvider} from "./context/AuthContext";

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem("auth-token");
  const authInitalToken = { accessToken: tcoken ?? null };
  return (
    <>
    {/* <Router>
      <Routes>
          <Route path="" element={""} />
      </Routes>
    </Router> */}
    <AuthProvider defaultState={authInitalToken}>
      <EcomProvider>
        <Router>
          <Header />
          <Alert />
          <Banner />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <About />
                  <FeaturedTrends />
                  <Contact />
                </>
              }
            />
            <Route path="/products" element={<Products /> } />
            <Route path="/register" element={<Register /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thankyou" element={<ThankYou />} />
            {/* <Route path="/details/:name" element={<ProductDetails />} /> */}
          </Routes>
          <Footer />
        </Router>
      </EcomProvider>
      </AuthProvider>
    </>
  );
}

export default App;
