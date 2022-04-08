import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "../components/Toast";
import { APP_URL } from "../config/config";

function Profile() {
  // Hook
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [formData, setFormData] = useState({});
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [presetImg, setPresetImg] = useState("");
  const [password, setPassword] = useState("");

  // API URL
  const API_URL = APP_URL + "users/profile/";
  const API_URL_PWD = APP_URL + "users/change/password/";

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
    //if (!auth) navigate("/");

    axios.get(API_URL + user._id, config).then((res) => {
      const userData = res.data;
      setUserDetails(userData);
      setFormData(userData);
    });
  }, []);

  const editProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleChange = (e) => {
    // je récupère la cible de l'évènement et sa valeur
    let name = e.target.name;
    let value = e.target.value;

    // s'il s'agit d'une image alors je copie son chemin dans mon tableau d'image
    // sinon je modifie le state avec les valeurs qui me sont passées
    if (name === "avatar") {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPresetImg(imageUrl);

      setFormData((prevState) => ({
        ...prevState,
        avatar: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitChangePassword = (e) => {
    try {
      axios
        .put(
          API_URL_PWD + user._id,
          {
            password: password,
          },
          config
        )
        .then((res) => {
          setUserDetails(res.data.user);
          Toast("success", JSON.stringify(res.data.message));
          setShowEditProfile(!showEditProfile);
        })
        .catch((err) => {
          Toast("error", JSON.stringify(err.response.data));
        });
    } catch (error) {
      Toast("error", JSON.stringify(error));
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    try {
      const imgData = new FormData();
      imgData.append("file", formData.avatar);
      imgData.append("upload_preset", "emmanuel");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/emmanuelsan/image/upload",
          imgData
        )
        .then((res) => {
          setFormData((prevState) => ({
            ...prevState,
            avatar: res.data.secure_url,
          }));

          axios
            .put(
              API_URL + user._id,
              {
                ...formData,
              },
              config
            )
            .then((res) => {
              setUserDetails(res.data.user);
              Toast("success", JSON.stringify(res.data.message));
              setShowEditProfile(!showEditProfile);
            })
            .catch((err) => {
              Toast("error", JSON.stringify(err.response.data));
            });
        })
        .catch((erreur) => {
          Toast("error", JSON.stringify(erreur));
        });
    } catch (error) {
      Toast("error", JSON.stringify(error.response.data));
    }

    e.preventDefault();
  };

  return (
    <>
      <div className="row">
        <div className="col-12 mt-4">
          <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
            <div className="row gx-4">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src={
                      userDetails.avatar
                        ? userDetails.avatar
                        : "../assets/img/bruce-mars.jpg"
                    }
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
      <ol className="breadcrumb bg-transparent mt-3 mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
        <li className="breadcrumb-item text-sm">
          <Link className="opacity-5 text-dark" to="/in/dashboard">
            FYPL
          </Link>
        </li>
        <li
          className="breadcrumb-item text-sm text-dark active"
          aria-current="page"
        >
          Profile
        </li>
      </ol>
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
                    <a href="#" onClick={editProfile}>
                      <i className="fas fa-user-edit text-secondary text-sm"></i>
                      <span className="sr-only">Editer le profil</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <p className="text-sm">
                  {userDetails.profileInformation !== ""
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
                    <strong className="text-dark">Localisation:</strong> &nbsp;
                    {userDetails.address
                      ? userDetails.address
                      : "Pas d'informations actuellement..."}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {showEditProfile ? (
            <div className="col-12 col-xl-5">
              <div className="card h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">
                        Modifier les informations personnelles
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <form role="form" onSubmit={handleSubmit}>
                    <label>Choisir l'image de profil</label>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-4">
                          <div className="card">
                            <div className="card-img-top">
                              <img src={presetImg} with="100" height="100" />
                            </div>
                          </div>
                        </div>
                        <div className="col-8">
                          <input
                            type="file"
                            className="form-control"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleChange}
                            name="avatar"
                          />
                        </div>
                      </div>
                    </div>
                    <label>Identifiant</label>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Identifiant"
                      />
                    </div>

                    <label>Email</label>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        disabled
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                      />
                    </div>

                    <label>Nom</label>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Votre nom"
                      />
                    </div>

                    <label>Prénom</label>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                      />
                    </div>

                    <label>Adresse</label>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Votre adresse"
                      />
                    </div>

                    <label>Téléphone</label>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="Votre contact"
                      />
                    </div>

                    <label>Résumé</label>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        id="profileInformation"
                        name="profileInformation"
                        value={formData.profileInformation}
                        onChange={handleChange}
                        placeholder="Résumé de votre profil"
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn bg-gradient-info w-100 mt-4 mb-0"
                      >
                        Soumettre
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
          {showEditProfile ? (
            <div className="col-12 col-xl-3">
              <div className="card h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">Modifier le mot de passe</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <form role="form" onSubmit={handleSubmitChangePassword}>
                    <label>Nouveau mot de passe</label>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChangePassword}
                        placeholder="*****"
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn bg-gradient-info w-100 mt-4 mb-0"
                      >
                        Soumettre
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Profile;
