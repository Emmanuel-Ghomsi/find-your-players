import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userDetails, setUserDetails] = useState({});
  const API_URL = "http://localhost:4000/api/users/profile/";
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get(API_URL + user._id, config).then((res) => {
      const userData = res.data;
      setUserDetails(userData);
    });
  });
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
                    CEO / Co-Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
