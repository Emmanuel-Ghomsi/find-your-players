import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const API_URL = "http://localhost:4000/api/users/login";
  const backgroundImage = "background-image";
  const imageURL =
    "url('https://res.cloudinary.com/emmanuelsan/image/upload/v1646325352/fyp_czgxod.jpg')";

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) navigate("/in/dashboard");
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    try {
      axios
        .post(API_URL, {
          ...formData,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
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
                      Vous n'avez pas de compte ?
                      <Link
                        to="/register"
                        className="text-info text-gradient font-weight-bold"
                      >
                        S'inscrire
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

export default Login;
