import { Routes, Route } from "react-router-dom";
import Header from "../components/frontend/Header";
import Footer from "../components/frontend/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Activate from "../pages/Activate";

function Frontend() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="users/activate/:token" element={<Activate />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Frontend;
