import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Profile() {
  // Hook
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  // API URL
  const API_URL = "http://localhost:4000/api/users/profile/";

  // All from react-redux
  const auth = useSelector((state) => state.isAuth.isAuth);

  // From localStorage
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    //if (!auth) navigate("/");
    console.log(user);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(API_URL + user._id, config).then((res) => {
      const userData = res.data;
      setUserDetails(userData);
    });
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-12 mt-4">
          <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
            <div className="row gx-4">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src="../assets/img/bruce-mars.jpg"
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">{userDetails.name}</h5>
                  <p className="mb-0 font-weight-bold text-sm">
                    {userDetails.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12 col-xl-4">
            <div className="card h-100">
              <div className="card-header pb-0 p-3">
                <div className="row">
                  <div className="col-md-8 d-flex align-items-center">
                    <h6 className="mb-0">Informations Personnelles</h6>
                  </div>
                  <div className="col-md-4 text-end">
                    <a href="#">
                      <i className="fas fa-user-edit text-secondary text-sm"></i>
                      <span className="sr-only">Editer le profil</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <p className="text-sm">
                  {userDetails.profileInformation == ""
                    ? userDetails.profileInformation
                    : "Pas d'informations actuellement..."}
                </p>
                <hr className="horizontal dark my-2" />
                <ul className="list-group">
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Nom complet:</strong> &nbsp;
                    {(userDetails.firstname ? userDetails.firstname : "-//-") +
                      " " +
                      (userDetails.lastname ? userDetails.lastname : "-//-")}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Telephone:</strong> &nbsp;
                    {userDetails.telephone
                    ? userDetails.telephone
                    : "Pas d'informations actuellement..."}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Email:</strong> &nbsp;
                    {userDetails.email}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Location:</strong> &nbsp;
                    {userDetails.address
                    ? userDetails.address
                    : "Pas d'informations actuellement..."}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
