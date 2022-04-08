import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { checkIfAuth } from "../app/slices/authSlice";
import { APP_URL } from "../config/config";

function Login() {
  // Hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailResend, setEmailResend] = useState("");

  // API URL
  const API_URL = APP_URL + "users/login";
  const API_URL_RESEND = APP_URL + "users/resent/verify-account";

  // Image URL
  const imageURL =
    "url('https://res.cloudinary.com/emmanuelsan/image/upload/v1646325352/fyp_czgxod.jpg')";

  // All from react-redux
  const auth = useSelector((state) => state.isAuth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      navigate("/in/dashboard");
    }
  }, []);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeResend = (event) => {
    setEmailResend(event.target.value);
  };

  const handleSubmitResend = (e) => {
    let email = emailResend;
    try {
      axios
        .post(API_URL_RESEND, {
          email,
        })
        .then((res) => {
          Toast("success", JSON.stringify(res.data.message));
        })
        .catch((err) => {
          Toast("error", JSON.stringify(err.response.data.error));
        });
    } catch (error) {
      Toast("error", JSON.stringify(error.response.data.error));
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    try {
      axios
        .post(API_URL, {
          ...formData,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", JSON.stringify(res.data.token));
          dispatch(checkIfAuth());
          Toast("success", "Success!");
          navigate("/in/dashboard");
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
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      De retour parmi nous
                    </h3>
                    <p className="mb-0">
                      Entrer votre adresse mail et votre mot de passe pour vous
                      connecter
                    </p>
                  </div>
                  <div className="card-body">
                    <form role="form" onSubmit={handleSubmit}>
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

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                        >
                          Se connecter
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto">
                      Vous n'avez pas de compte ?&nbsp;
                      <Link
                        to="/register"
                        className="text-info text-gradient font-weight-bold"
                      >
                        S'inscrire
                      </Link>
                    </p>
                  </div>

                  <div className="card-header pb-0 text-left bg-transparent">
                    <h6 className="font-weight-bolder text-info text-gradient">
                      Vous n'avez pas reçu de mail de vérification ?
                    </h6>

                    <div className="card-body">
                      <form role="form" onSubmit={handleSubmitResend}>
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={emailResend}
                            onChange={handleChangeResend}
                            placeholder="name@example.com"
                          />
                        </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-info w-100 mt-4 mb-0"
                          >
                            Renvoyer le lien de vérification
                          </button>
                        </div>
                      </form>
                    </div>
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

export default Login;
