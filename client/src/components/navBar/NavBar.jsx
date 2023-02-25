import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useLocalStorage } from "../../customHooks/UseLocalStore";
import { fetchSearch } from "../../redux/thunks/productThunk";
import Login from "../buttons/Login/Login";
import Logout from "../buttons/Logout/Logout";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();
  const [text, setText] = useLocalStorage("text", "");
  const { amountOfItems } = useSelector((state) => state.cart);
  const history = useHistory();

  function submitSearch(e) {
    e.preventDefault();
    dispatch(fetchSearch(text));
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg border-bottom">
        <div class="container-fluid d-flex justify-content-center ">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <img
            src={require("./media/logoh.png")}
            style={{ width: "50px" }}
            alt=""
          />

          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul class="navbar-nav mb-2 mb-lg-0 text-center fs-5 align-items-center">
              <li className="nav-item">
                <Link className="nav-link mt-1" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mt-1" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mt-1" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item"></li>
              <li>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-person-square"></i>
                  </button>
                  {isAuthenticated ? (
                    <ul class="dropdown-menu justify-content-center">
                      <li>
                        <Link className="nav-link mt-1" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  ) : (
                    <ul class="dropdown-menu justify-content-center">
                      <li>
                        <Login />
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            </ul>
            <div>
              <form
                class="d-flex justify-content-center"
                role="search"
                onSubmit={submitSearch}
              >
                <input
                  class="form-control me-2"
                  placeholder="Search by name"
                  value={text}
                  name="filter-by-name"
                  aria-label="Search"
                  onChange={(e) => setText(e.target.value)}
                />
                <button class="btn btn-outline-success" type="submit">
                  <Link to="/products">Search</Link>
                </button>
              </form>
            </div>
            <ul class="navbar-nav mb-2 mb-lg-0 text-center fs-5 align-items-center">
              <li>
                <div className="shoppingCart">
                  <div
                    className={
                      amountOfItems === 0 ? "negativeCounter" : "counter"
                    }
                  >
                    {amountOfItems}
                  </div>
                  <BsCart4
                    className="carIcon"
                    onClick={() => {
                      if (amountOfItems === 0) {
                        return window.alert(
                          "You dont have any products in the cart"
                        );
                      }
                      history.push("/shoppingCart");
                    }}
                  />
                </div>
              </li>
              <li>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-person-square"></i>
                  </button>
                  {isAuthenticated ? (
                    <ul class="dropdown-menu dropdown-menu-end justify-content-center">
                      <li>
                        <Link className="nav-link mt-1" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="nav-link mt-1" to="/shoppingCart">
                          Cart
                        </Link>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  ) : (
                    <ul class="dropdown-menu justify-content-center">
                      <li>
                        <Login />
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
