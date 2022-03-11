import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHandPaper, FaRegClock, FaSquare } from "react-icons/fa";
import axios from "axios";

function Statistic() {
  const [statistics, setStatistics] = useState([]);

  const API_URL = "http://localhost:4000/api/statistics";
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleUpdate = (statistic) => {};

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get(API_URL, config).then((res) => {
      let statistic = res.data;
      setStatistics(statistic);
    });
  });

  return (
    <div className="row">
      <div className="col-12 mt-4">
        <div className="card mb-4">
          <div className="card-header pb-0 p-3">
            <h6 className="mb-1">Statistiques</h6>
            <p className="text-sm">
              Vos statistiques sur les dernières saisons
            </p>
          </div>
          <div className="card-body p-3">
            <div className="row">
              {statistics.map((statistic, i) => (
                <div key={i} className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                  <div className="card card-blog card-plain">
                    <div className="position-relative">
                      <a className="d-block shadow-xl border-radius-xl">
                        <img
                          src="../assets/img/view.jpg"
                          alt="img-blur-shadow"
                          className="img-fluid shadow border-radius-xl"
                        />
                      </a>
                    </div>
                    <div className="card-body px-1 pb-0">
                      <p className="text-gradient text-dark mb-2 text-sm">
                        Saison : {statistic.saison}
                      </p>
                      <a href="#">
                        <h5>Poste occupé : {statistic.poste}</h5>
                      </a>
                      <div className="my-4 text-sm d-flex align-items-baseline">
                        <div>
                          <a
                            href="#"
                            className="avatar avatar-xs rounded-circle mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Elena Morison"
                          >
                            <img
                              src="../assets/img/ball.png"
                              className="text-dark"
                              alt="icon-ball"
                              width="10"
                            />
                          </a>
                          {statistic.nbrBut} - but(s)
                        </div>
                        <div>
                          <a
                            href="#"
                            className="avatar avatar-xs rounded-circle mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Elena Morison"
                          >
                            <img
                              src="../assets/img/pass.png"
                              className="text-dark"
                              alt="icon-ball"
                              width="10"
                            />
                          </a>
                          {statistic.nbrPasse} - passe(s)
                        </div>
                      </div>
                      <div className="mb-4 text-sm d-flex align-items-baseline">
                        <div>
                          <a
                            href="#"
                            className="avatar avatar-xs rounded-circle mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Elena Morison"
                          >
                            <img
                              src="../assets/img/foul.png"
                              className="text-dark"
                              alt="icon-ball"
                              width="10"
                            />
                          </a>
                          {statistic.nbrTacle} - tacle(s)
                        </div>
                        <div>
                          <a
                            href="#"
                            className="avatar avatar-xs rounded-circle mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Elena Morison"
                          >
                            <FaHandPaper className="text-dark fs-5" />
                          </a>
                          {statistic.nbrArret} - arrêt(s)
                        </div>
                      </div>
                      <div className="mb-4 text-sm d-flex align-items-baseline">
                        <div>
                          <a
                            href="#"
                            className="avatar avatar-xs rounded-circle mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Elena Morison"
                          >
                            <FaRegClock className="text-dark fs-5" />
                          </a>
                          {statistic.tempsDeJeu} - temps de jeu (min)
                        </div>
                      </div>
                      <div className="mb-4 text-sm d-flex align-items-baseline">
                        <div>
                          <a
                            href="#"
                            className="avatar avatar-xs rounded-circle mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Elena Morison"
                          >
                            <FaSquare className="text-yellow fs-5" />
                          </a>
                          {statistic.cartonJaune} - carton(s)
                        </div>
                        <div>
                          <a
                            href="#"
                            className="avatar avatar-xs rounded-circle mx-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Elena Morison"
                          >
                            <FaSquare className="text-danger fs-5" />
                          </a>
                          {statistic.cartonRouge} - carton(s)
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <button
                          type="button"
                          className="btn btn-outline-info btn-sm mb-0"
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm mb-0"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                <div className="card h-100 card-plain border">
                  <div className="card-body d-flex flex-column justify-content-center text-center">
                    <Link to="/in/create-statistic">
                      <i
                        className="fa fa-plus text-secondary mb-3"
                        aria-hidden="true"
                      ></i>
                      <h5 className=" text-secondary">
                        Ajouter une nouvelle statistique
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistic;
