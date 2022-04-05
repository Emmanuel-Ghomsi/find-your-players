import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Toast from "../components/Toast";
import { useSelector } from "react-redux";

function Dashboard() {
  // Hook
  const navigate = useNavigate();

  // Image URL
  const imageURL =
    "url('https://res.cloudinary.com/emmanuelsan/image/upload/v1646325352/fyp_czgxod.jpg')";

  // All from react-redux
  const auth = useSelector((state) => state.isAuth.isAuth);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, []);

  return (
    <div className="row mt-4">
      <div className="col-lg-7 mb-lg-0 mb-4">
        <div className="card">
          <div className="card-body p-3">
            <div className="row">
              <div className="col-lg-6">
                <div className="d-flex flex-column h-100">
                  <p className="mb-1 pt-2 text-bold">Built by developers</p>
                  <h5 className="font-weight-bolder">Soft UI Dashboard</h5>
                  <p className="mb-5">
                    From colors, cards, typography to complex elements, you will
                    find the full documentation.
                  </p>
                  <a
                    className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                    href="#"
                  >
                    Read More
                    <i
                      className="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                <div className="bg-gradient-primary border-radius-lg h-100">
                  <img
                    src="../assets/img/shapes/waves-white.svg"
                    className="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                    alt="waves"
                  />
                  <div className="position-relative d-flex align-items-center justify-content-center h-100">
                    <img
                      className="w-100 position-relative z-index-2 pt-4"
                      src="../assets/img/illustrations/rocket-white.png"
                      alt="rocket"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="card h-100 p-3">
          <div
            className="overflow-hidden position-relative border-radius-lg bg-cover h-100"
            style={{ backgroundImage: imageURL }}
          >
            <span className="mask bg-gradient-dark"></span>
            <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
              <h5 className="text-white font-weight-bolder mb-4 pt-2">
                Work with the rockets
              </h5>
              <p className="text-white">
                Wealth creation is an evolutionarily recent positive-sum game.
                It is all about who take the opportunity first.
              </p>
              <a
                className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                href="#"
              >
                Read More
                <i
                  className="fas fa-arrow-right text-sm ms-1"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
