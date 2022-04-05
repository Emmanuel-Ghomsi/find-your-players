import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Toast from "../components/Toast";

function Activate() {
  // Hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    token: "",
  });
  const [email, setEmail] = useState("");
  const { token } = useParams();

  // API URL
  const API_URL = "http://localhost:4000/api/users/activate";
  const API_URL_RESEND =
    "http://localhost:4000/api/users/resent/verify-account";

  // Image URL
  const imageURL =
    "url('https://res.cloudinary.com/emmanuelsan/image/upload/v1646325352/fyp_czgxod.jpg')";

  useEffect(() => {
    /*const state = store.getState();
    if (state.isAuth) {
      navigate("/in/dashboard");
    }*/

    if (token) {
      setFormData({ ...formData, token });
    }
  }, [formData.token]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitResend = (e) => {
    try {
      axios
        .post(API_URL_RESEND, {
          email,
        })
        .then((res) => {
          Toast("success", JSON.stringify(res.data.message));
        })
        .catch((err) => {
          console.log(err.response);
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
          localStorage.setItem("user", JSON.stringify(res.data));
          Toast("success", "Success!");
          navigate("/in/dashboard");
        })
        .catch((err) => {
          Toast("error", JSON.stringify(err.response.data.error));
        });
    } catch (error) {
      Toast("error", JSON.stringify(error.response.data.error));
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
                      Veuillez activer votre compte
                    </h3>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn bg-gradient-info w-100 mt-4 mb-0"
                        onClick={handleSubmit}
                      >
                        Activer le compte
                      </button>
                    </div>
                  </div>

                  <div className="card-footer text-center pt-3 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto text-dark fw-bold">
                      - OU -
                    </p>
                    <p className="mb-4 text-sm mx-auto">
                      <Link
                        to="/register"
                        className="text-info text-gradient font-weight-bold"
                      >
                        S'inscrire
                      </Link>
                    </p>
                  </div>

                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      Renvoyer le lien de vérification
                    </h3>

                    <div className="card-body">
                      <form role="form" onSubmit={handleSubmitResend}>
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

export default Activate;
