import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkIfAuth } from "../../app/slices/authSlice";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // All from react-redux
  const auth = useSelector((state) => state.isAuth.isAuth);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Dispach
    dispatch(checkIfAuth());
    navigate("/");
    e.preventDefault();
  };

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      navbar-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <Link
                to="/in/profile"
                className="nav-link text-body font-weight-bold px-4"
              >
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">
                  {user ? user.name : ""}
                </span>
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <a
                href="#"
                className="nav-link text-body font-weight-bold px-4"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out me-sm-1 text-danger"></i>
                <span className="d-sm-inline d-none text-danger">
                  Deconnexion
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
