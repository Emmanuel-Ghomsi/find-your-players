import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import { APP_URL } from "../config/config";

function Register() {
  // Hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verifyPassword, setVerifyPassword] = useState(false);

  // API URL
  const API_URL = APP_URL + "users";

  // Image URL
  const imageURL =
    "url('https://res.cloudinary.com/emmanuelsan/image/upload/v1646325352/fyp_czgxod.jpg')";

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    if (e.target.name === "confirmPassword") {
      if (password !== e.target.value) setVerifyPassword(true);
      else setVerifyPassword(false);
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    if (password !== confirmPassword)
      Toast("error", "Les mots de passe ne correspondent pas");
    else {
      try {
        axios
          .post(API_URL, {
            ...formData,
          })
          .then((res) => {
            Toast("success", JSON.stringify(res.data.message));
          })
          .catch((err) => {
            Toast("error", JSON.stringify(err.response.data));
          });
      } catch (error) {
        Toast("error", JSON.stringify(error.response.data));
      }
    }

    e.preventDefault();
  };

  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      Rejoindre notre communauté
                    </h3>
                    <p className="mb-0">
                      Veuillez remplir les champs pour rejoindre notre
                      communauté
                    </p>
                  </div>
                  <div className="card-body">
                    <form role="form" onSubmit={handleSubmit}>
                      <label>Identifiant</label>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={name}
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
                          value={email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                        />
                      </div>

                      <label>Mot de passe</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                          placeholder="Mot de passe"
                        />
                      </div>

                      <label>Confirmer le mot de passe</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirmer le mot de passe"
                        />
                      </div>
                      {verifyPassword ? (
                        <div className="text-gradient text-danger text-xs">
                          Les mots de passe ne correspondent pas
                        </div>
                      ) : null}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                        >
                          S'inscrire
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto">
                      Vous possedez déjà un compte ?&nbsp;
                      <Link
                        to="/"
                        className="text-info text-gradient font-weight-bold"
                      >
                        Se connecter
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div
                    className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    style={{ backgroundImage: imageURL }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
