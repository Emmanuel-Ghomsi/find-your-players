import { Routes, Route } from "react-router-dom";
import Header from "../components/frontend/Header";
import Footer from "../components/frontend/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Frontend() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Frontend;
