import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const Result = () => {
  const navigate = useNavigate();
  const stored = sessionStorage.getItem("quizResult");

  /* ================= FALLBACK ================= */
  if (!stored) {
    return (
      <>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
          <div className="text-center">
            <h4>OOPPSS ! No Result Data Found</h4>
            <p className="text-secondary">
              Please complete a quiz to view results.
            </p>
            <button
              className="btn btn-success mt-3"
              onClick={() => navigate("/take")}
            >
              Go to Quizzes
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ================= DATA ================= */
  const { selectedQuiz, score, answers } = JSON.parse(stored);

  const total = selectedQuiz.questions.length;
  const percent = Math.round((score / total) * 100);

  const incorrect = answers.filter(
    (ans, i) => ans && ans !== selectedQuiz.questions[i].correctAnswer,
  ).length;

  const skipped = answers.filter((ans) => !ans).length;

  return (
    <>
      <Navbar />

      {/* PRINT STYLES (kept, harmless) */}
      <style>
        {`
          @media print {
            button, nav, footer {
              display: none !important;
            }
            body {
              background: #fff !important;
              color: #000 !important;
            }
          }
        `}
      </style>

      <div
        className="container-fluid"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #101213, #08111b)",
          paddingTop: "3rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="container text-white">
          {/* HEADER */}
          <div className="text-center mb-5">
            <h2 className="fw-bold">{selectedQuiz.title}</h2>
            <p className="text-secondary">Quiz Result Summary</p>
          </div>

          {/* DONUT CHART */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-4 text-center">
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: `conic-gradient(
                    #198754 ${percent * 3.6}deg,
                    rgba(255,255,255,0.15) 0deg
                  )`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    background: "#1f2328",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3 className="mb-0">{percent}%</h3>
                  <small className="text-secondary">Accuracy</small>
                </div>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="row text-center mb-5">
            {[
              { label: "Correct", value: score, color: "#198754" },
              { label: "Incorrect", value: incorrect, color: "#dc3545" },
              { label: "Skipped", value: skipped, color: "#6c757d" },
            ].map((item, i) => (
              <div key={i} className="col-md-4 mb-3">
                <div
                  className="p-4 h-100"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <h3 style={{ color: item.color }}>{item.value}</h3>
                  <p className="text-secondary mb-0">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* BAR CHARTS */}
          <div className="mx-auto mb-5" style={{ maxWidth: "520px" }}>
            <p className="text-secondary mb-1">Correct</p>
            <div className="progress mb-3" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${(score / total) * 100}%` }}
              />
            </div>

            <p className="text-secondary mb-1">Incorrect</p>
            <div className="progress mb-3" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-danger"
                style={{ width: `${(incorrect / total) * 100}%` }}
              />
            </div>

            <p className="text-secondary mb-1">Skipped</p>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-secondary"
                style={{ width: `${(skipped / total) * 100}%` }}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="text-center">
            <button
              className="btn btn-success px-4 me-3"
              onClick={() => navigate("/take")}
            >
              Back to Quizzes
            </button>

            <button
              className="btn btn-outline-light px-4"
              onClick={() => navigate("/take")}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Result;
