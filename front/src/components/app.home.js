import AppNavbar from "../layouts/app.navbar";

import "../assets/scss/components/home.scss";

const home = () => {
  return (
    <>
    <AppNavbar />
    <div className="home">
      <p className="alert">
        Website in development !<br />
        don't panic and still tuned on 
        <a href="https://instagram.com/baptistemrrt/">Instagram</a>
      </p>
    </div>
    </>
  );
}

export default home;