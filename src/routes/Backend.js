import { Routes, Route } from "react-router-dom";
import Aside from "../components/backend/Aside";
import Navbar from "../components/backend/Navbar";
import Footer from "../components/backend/Footer";
import Dashboard from "../pages/Dashboard";
import Statistic from "../pages/Statistic";
import Profile from "../pages/Profile";
import CreateStatisticModal from "../components/backend/modal/CreateStatisticModal";
import UpdateStatisticModal from "../components/backend/modal/UpdateStatisticModal";

function Backend() {
  return (
    <>
      <Aside />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-4">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="statistic" element={<Statistic />} />
            <Route path="create-statistic" element={<CreateStatisticModal />} />
            <Route path="update-statistic/:id" element={<UpdateStatisticModal />} />
            <Route path="profile" element={<Profile />} />
          </Routes>

          <Footer />
        </div>
      </main>
    </>
  );
}

export default Backend;
