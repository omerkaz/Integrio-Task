import {useRef} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserFilter from "../UserFilter/UserFilter";
import UniversityFilter from "../UniversityFilter/UniversityFilter";
import Home from "../Home/Home";
import UserCreateForm from "../UserCreateForm/UserCreateForm";
import "./NavBar.css"
import NavBarİcon from "../../assets/icon.svg"

function NavBar() {

  
  return (
    <Router>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <img
              src={NavBarİcon}
              width="30"
              height="30"
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav ">
              <Link className="nav-link btn fw-semibold mx-1" to="/">
                Home
              </Link>

              <Link
                className="nav-link btn fw-semibold mx-1"
                to="/universityFilter"
              >
                University Search
              </Link>

              <Link className="nav-link btn fw-semibold mx-1" to="/userFilter">
                User Search
              </Link>

              <Link className="nav-link btn fw-semibold mx-1" to="/createUser">
                Create User
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/universityFilter" element={<UniversityFilter />}></Route>
        <Route path="/userFilter" element={<UserFilter />}></Route>
        <Route path="/createUser" element={<UserCreateForm />}></Route>
      </Routes>
    </Router>
  );
}

export default NavBar;
