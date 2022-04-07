import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../../Toast";
import { APP_URL } from "../../../config/config";

function CreateStatisticModal() {
  // Hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    poste: "",
    nbrBut: "",
    nbrPasse: "",
    nbrTacle: "",
    nbrArret: "",
    tempsDeJeu: "",
    cartonJaune: "",
    cartonRouge: "",
    saison: "",
  });

  // API URL
  const API_URL = APP_URL + "statistics";

  // From localStorage
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    poste,
    nbrBut,
    nbrPasse,
    nbrTacle,
    nbrArret,
    tempsDeJeu,
    cartonJaune,
    cartonRouge,
    saison,
  } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    // header for authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      axios
        .post(
          API_URL,
          {
            poste: poste,
            nbrBut: nbrBut,
            nbrPasse: nbrPasse,
            nbrTacle: nbrTacle,
            nbrArret: nbrArret,
            tempsDeJeu: tempsDeJeu,
            cartonJaune: cartonJaune,
            cartonRouge: cartonRouge,
            saison: saison,
            user: user._id,
          },
          config
        )
        .then((res) => {
          Toast("success", "Success!");
          navigate("/in/statistic");
        })
        .catch((err) => {
          Toast("error", JSON.stringify(err.response.data));
        });
    } catch (error) {
      Toast("error", JSON.stringify(error.response.data));
    }
    e.preventDefault();
  };

  return (
    <>
      <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
        <li className="breadcrumb-item text-sm">
          <Link className="opacity-5 text-dark" to="/in/dashboard">
            FYPL
          </Link>
        </li>
        <li className="breadcrumb-item text-sm">
          <Link className="opacity-5 text-dark" to="/in/statistic">
            Statistique
          </Link>
        </li>
        <li
          className="breadcrumb-item text-sm text-dark active"
          aria-current="page"
        >
          Ajouter une statistique
        </li>
      </ol>
      <div className="row">
        <div className="col-12 mt-4">
          <div className="card mb-4">
            <div className="card-header pb-0 p-3">
              <h6 className="mb-1">Statistique</h6>
              <p className="text-sm">Ajouter des statistiques</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">Poste occupé</label>
                    <select
                      className="form-select"
                      name="poste"
                      onChange={handleChange}
                    >
                      <option value="">Choisir un poste</option>
                      <option value="Avant centre">Avant centre</option>
                      <option value="Ailier gauche">Ailier gauche</option>
                      <option value="Ailier droit">Ailier droit</option>
                      <option value="Milieu droit">Milieu droit</option>
                      <option value="Milieu gauche">Milieu gauche</option>
                      <option value="Milieu central">Milieu central</option>
                      <option value="Milieu defensif">Milieu defensif</option>
                      <option value="Milieu offensif">Milieu offensif</option>
                      <option value="Arrière droit">Arrière droit</option>
                      <option value="Arrière gauche">Arrière gauche</option>
                      <option value="Arrière latéral">Arrière latéral</option>
                      <option value="Défenseur central">
                        Défenseur central
                      </option>
                      <option value="Gardien">Gardien</option>
                    </select>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">
                      Nombre de but marqué
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="nbrBut"
                      onChange={handleChange}
                      value={nbrBut}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">
                      Nombre de passe effectuée
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="nbrPasse"
                      onChange={handleChange}
                      value={nbrPasse}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">
                      Nombre de tacle effectué
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="nbrTacle"
                      onChange={handleChange}
                      value={nbrTacle}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">
                      Nombre d'arrêt effectué
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="nbrArret"
                      onChange={handleChange}
                      value={nbrArret}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">Temps de jeu</label>
                    <input
                      type="number"
                      className="form-control"
                      name="tempsDeJeu"
                      onChange={handleChange}
                      value={tempsDeJeu}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">
                      Nombre de carton jaune reçu
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="cartonJaune"
                      onChange={handleChange}
                      value={cartonJaune}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">
                      Nombre de carton rouge reçu
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="cartonRouge"
                      onChange={handleChange}
                      value={cartonRouge}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-3">
                    <label className="col-form-label">Saison</label>
                    <select
                      className="form-select"
                      name="saison"
                      onChange={handleChange}
                    >
                      <option value="">Choisir une saison</option>
                      <option value="2021/2022">2021/2022</option>
                      <option value="2020/2021">2020/2021</option>
                      <option value="2019/2020">2019/2020</option>
                      <option value="2018/2019">2018/2019</option>
                      <option value="2017/2018">2017/2018</option>
                      <option value="2016/2017">2016/2017</option>
                      <option value="2015/2016">2015/2016</option>
                      <option value="2014/2015">2014/2015</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="cart-footer p-3">
                <button type="submit" className="btn btn-primary">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateStatisticModal;
