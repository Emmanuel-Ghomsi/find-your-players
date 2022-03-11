function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-8 mx-auto text-center mt-1">
            <p className="mb-0 text-secondary">
              Copyright © {new Date().getFullYear()} fait avec&nbsp;
              <i className="fa fa-heart text-danger"></i> par Emmanuel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
