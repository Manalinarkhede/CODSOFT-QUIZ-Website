import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "rgba(255,255,255,0.03)",
        color: "#9aa0a6",
        padding: "22px 0",
        fontSize: "13px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container text-center">
        <div className="d-flex justify-content-center flex-wrap gap-2">
          <span>
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "#fff", fontWeight: "500" }}>Quizora</span>
          </span>

          <span className="d-none d-sm-inline">•</span>

          <span style={{ cursor: "pointer" }} className="footer-link">
            Terms
          </span>

          <span className="d-none d-sm-inline">•</span>

          <span style={{ cursor: "pointer" }} className="footer-link">
            Privacy Policy
          </span>
        </div>
      </div>

      {/* Footer hover styles */}
      <style>
        {`
          .footer-link:hover {
            text-decoration: underline;
            color: #fff;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
