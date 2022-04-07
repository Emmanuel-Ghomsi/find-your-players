import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import { useSelector } from "react-redux";
import axios from "axios";
import { APP_URL } from "../config/config";

function Dashboard() {
  // API URL
  const API_URL = APP_URL + "users/profile/";
  const API_URL_STATS = APP_URL + "statistics/user/";

  // Hook
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [percentage, setPercentage] = useState(5);
  const [classProgress, setClassProgress] = useState(
    "progress-bar bg-gradient-danger"
  );
  const [stat, setStat] = useState({});

  // Image URL
  const imageURL =
    "url('https://res.cloudinary.com/emmanuelsan/image/upload/v1646325352/fyp_czgxod.jpg')";

  // All from react-redux
  const auth = useSelector((state) => state.isAuth.isAuth);

  // From localStorage
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    // if (!auth) navigate("/");

    axios.get(API_URL + user._id, config).then((res) => {
      const userData = res.data;
      setUserDetails(userData);

      axios.get(API_URL_STATS + user._id, config).then((res) => {
        const statData = res.data;
        setStat(statData);
        calculateThePercentageOfTheProfile(userData, statData);
      });
    });
  }, []);

  const calculateThePercentageOfTheProfile = (user, stat) => {
    if (
      user.address &&
      user.avatar &&
      user.firstname &&
      user.lastname &&
      user.profileInformation &&
      user.telephone &&
      stat.length === 0
    ) {
      setPercentage(50);
      setClassProgress("progress-bar bg-gradient-info");
    } else if (
      user.address &&
      user.avatar &&
      user.firstname &&
      user.lastname &&
      !user.profileInformation &&
      user.telephone &&
      stat.length === 0
    ) {
      setPercentage(25);
      setClassProgress("progress-bar bg-gradient-warning");
    } else if (
      user.address &&
      user.avatar &&
      user.firstname &&
      user.lastname &&
      user.profileInformation &&
      user.telephone &&
      stat.length !== 0
    ) {
      setPercentage(80);
      setClassProgress("progress-bar bg-gradient-success");
    } else if (
      user.address &&
      user.avatar &&
      user.firstname &&
      user.lastname &&
      !user.profileInformation &&
      user.telephone &&
      stat.length !== 0
    ) {
      setPercentage(60);
      setClassProgress("progress-bar bg-gradient-info");
    }
  };
  return (
    <>
      <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
        <li className="breadcrumb-item text-sm">
          <Link className="opacity-5 text-dark" to="/in/dashboard">
            FYPL
          </Link>
        </li>
        <li
          className="breadcrumb-item text-sm text-dark active"
          aria-current="page"
        >
          Tableau de bord
        </li>
      </ol>
      <div className="row mt-4">
        <div className="col-lg-5">
          <div className="card h-100 p-3">
            <div
              className="overflow-hidden position-relative border-radius-lg bg-cover h-100"
              style={{ backgroundImage: imageURL }}
            >
              <span className="mask bg-gradient-dark"></span>
              <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                <h5 className="text-white font-weight-bolder mb-4 pt-2">
                  État de votre profil
                </h5>
                <p className="text-white">
                  Passer votre profil au pourcentage maximum vous aidera à
                  attirer plus de visibilité. Pensez à le completer 😉
                </p>
                <div className="d-flex text-white align-items-center justify-content-center my-3">
                  <span className="me-2 text-xs font-weight-bold">
                    {percentage}%
                  </span>
                  <div>
                    <div className="progress">
                      <div
                        className={classProgress}
                        role="progressbar"
                        aria-valuenow={percentage}
                        aria-valuemin="0"
                        aria-valuemax={percentage}
                        style={{ width: percentage }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <Link
                    className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                    to="/in/profile"
                  >
                    Votre profil
                    <i
                      className="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <Link
                    className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                    to="/in/statistic"
                  >
                    Renseigner vos statistiques
                    <i
                      className="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
