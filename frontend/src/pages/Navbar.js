import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  /* =========================
     HIDE NAVBAR ON SCROLL
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar px-4 container-fluid"
        style={{
          position: "sticky",
          top: showNavbar ? "0" : "-90px",
          transition: "top 0.35s ease",
          zIndex: 1000,
          background: "rgba(28,31,34,0.75)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* BRAND */}
        <span
          className="navbar-brand d-flex align-items-center gap-2"
          style={{
            color: "#fff",
            fontSize: "24px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <i className="bi-ui-checks fs-4 text-success"></i>
          Quizora
        </span>

        {/* DESKTOP ACTIONS */}
        <div className="ms-auto d-none d-md-flex align-items-center gap-3">
          {token ? (
            <>
              <span className="text-white" style={{ fontSize: "15px" }}>
                Hi, {name ? name.split(" ")[0] : "User"}
              </span>
              <button
                className="btn btn-outline-light px-4 py-2"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <button
                className="btn btn-outline-light px-4 py-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : isHomePage ? (
            <>
              <button
                className="btn btn-outline-light px-4 py-2"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <button
                className="btn btn-success px-4 py-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          ) : (
            <button
              className="btn btn-outline-light px-4 py-2"
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="btn btn-outline-light d-md-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.6)",
            zIndex: 1100,
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="position-absolute top-0 end-0 p-4"
            style={{
              width: "260px",
              height: "100%",
              background: "rgba(28,31,34,0.95)",
              backdropFilter: "blur(12px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {token && (
              <p className="text-white mb-4">
                Hi, {name ? name.split(" ")[0] : "User"}
              </p>
            )}

            {token ? (
              <button
                className="btn btn-outline-light w-100 mb-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline-light w-100 mb-3"
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                >
                  Register
                </button>
                <button
                  className="btn btn-success w-100 mb-3"
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                >
                  Login
                </button>
              </>
            )}

            {!isHomePage && (
              <button
                className="btn btn-outline-light w-100"
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
              >
                Go to Home
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
