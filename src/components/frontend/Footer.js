import {Link} from 'react-router-dom'
function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-8 mx-auto text-center mt-1">
            <p className="mb-0 text-secondary text-xs">
              Copyright © <Link to="/" className="text-gradient text-dark">Find Your players</Link> {new Date().getFullYear()} fait avec&nbsp;
              <i className="fa fa-heart text-danger"></i> par Emmanuel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
