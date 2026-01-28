import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap-icons/font/bootstrap-icons.css";

const BG = {
  hero: { background: "linear-gradient(135deg, #101213, #08111b)" },
  sectionA: { background: "linear-gradient(135deg, #11141a, #0a1420)" },
  sectionB: { background: "linear-gradient(135deg, #0e1116, #070f18)" },
  cta: { background: "linear-gradient(135deg, #101213, #08111b)" },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* GLOBAL STYLES */}
      <style>
        {`
          .fade-up {
            animation: fadeUp 0.8s ease forwards;
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Hover ONLY for buttons */
          .btn {
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }

          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0,0,0,0.35);
          }
        `}
      </style>

      {/* HERO */}
      <section
        className="px-3"
        style={{
          ...BG.hero,
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container text-white">
          <div className="row align-items-center g-5">
            <div className="col-md-6 fade-up">
              <h1 className="fw-bold display-5 mb-4">
                Quizzes that feel
                <span className="text-success"> natural</span>, not boring
              </h1>

              <p
                className="text-secondary lead mb-5"
                style={{ maxWidth: "520px" }}
              >
                Create focused quizzes, answer one question at a time, and
                instantly understand performance — without distractions.
              </p>

              <div className="d-flex gap-3 flex-column flex-sm-row">
                <button
                  className="btn btn-success btn-lg px-5"
                  onClick={() => navigate("/create")}
                >
                  Create a Quiz
                </button>

                <button
                  className="btn btn-outline-light btn-lg px-5"
                  onClick={() => navigate("/take")}
                >
                  Take a Quiz
                </button>
              </div>
            </div>

            <div className="col-md-6 d-none d-md-block fade-up">
              <div
                style={{
                  maxWidth: "420px",
                  marginLeft: "auto",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "2rem",
                }}
              >
                <small className="text-secondary">Sample question</small>
                <h5 className="fw-semibold mt-3 mb-4">
                  What does REST stand for?
                </h5>

                {[
                  "Representational State Transfer",
                  "Remote Execution State Technique",
                  "Relational State Transition",
                ].map((opt, i) => (
                  <div
                    key={i}
                    className="mb-3 px-3 py-2"
                    style={{
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#bbb",
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-3 " style={BG.sectionA}>
        <div className="container text-white py-5 py-md-7 fade-up">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4">How Quizora works</h2>
            <p className="text-secondary">
              A simple, focused flow from start to finish
            </p>
          </div>

          <div className="row g-5">
            {[
              {
                title: "Create",
                desc: "Build quizzes with validated questions and answers.",
              },
              {
                title: "Solve",
                desc: "Answer one question at a time in a distraction-free flow.",
              },
              {
                title: "Analyze",
                desc: "View score, accuracy, and insights instantly.",
              },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div
                  className="h-100 p-4 p-md-5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <h5 className="fw-semibold mb-3">{item.title}</h5>
                  <p className="text-secondary mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO QUIZ */}
      <section className="px-3" style={BG.sectionB}>
        <div className="container text-white py-5 py-md-7 fade-up ">
          <div className="row align-items-center g-5">
            <div className="col-md-5">
              <h2 className="fw-bold mb-4">Experience the quiz flow</h2>
              <p className="text-secondary mb-5">
                Questions appear one at a time, keeping users focused.
              </p>
              <button
                className="btn btn-success btn-lg px-5"
                onClick={() => navigate("/take")}
              >
                Try a real quiz
              </button>
            </div>

            <div className="col-md-7">
              <div
                className="p-4 p-md-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  maxWidth: "520px",
                  margin: "0 auto",
                }}
              >
                <small className="text-secondary">Question 1 of 5</small>
                <h5 className="fw-semibold mt-3 mb-4">
                  What does HTTP stand for?
                </h5>

                {[
                  "Hyper Text Transfer Protocol",
                  "High Transmission Text Protocol",
                  "Hyperlink Transfer Process",
                  "Host Transfer Protocol",
                ].map((opt, i) => (
                  <button
                    key={i}
                    className="btn btn-outline-light w-100 text-start mb-3"
                    disabled
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-3 text-center" style={BG.cta}>
        <div className="container text-white py-5 py-md-7 fade-up">
          <h2 className="fw-bold mb-4">Ready to try Quizora?</h2>
          <p className="text-secondary mb-5">
            Create your own quiz or start answering one instantly.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-column flex-sm-row">
            <button
              className="btn btn-success btn-lg px-5"
              onClick={() => navigate("/create")}
            >
              Create Quiz
            </button>
            <button
              className="btn btn-outline-light btn-lg px-5"
              onClick={() => navigate("/take")}
            >
              Take Quiz
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
