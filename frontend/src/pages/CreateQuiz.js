import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const STORAGE_KEY = "quiz_draft";

/* ================= PREVIEW MODAL ================= */
const PreviewModal = ({ title, questions, onClose }) => (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{ background: "rgba(0,0,0,0.8)", zIndex: 3000 }}
  >
    <div
      className="text-white p-4"
      style={{
        width: "90%",
        maxWidth: "700px",
        maxHeight: "85vh",
        overflowY: "auto",
        background: "rgba(16,18,19,0.95)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <h4 className="fw-bold mb-4">{title}</h4>

      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="fw-semibold">
            {i + 1}. {q.question}
          </p>

          <ul className="ps-3">
            {q.options.map((o, j) => (
              <li
                key={j}
                className={
                  o === q.correctAnswer
                    ? "text-success fw-semibold"
                    : "text-secondary"
                }
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="text-end">
        <button className="btn btn-outline-light" onClick={onClose}>
          Close Preview
        </button>
      </div>
    </div>
  </div>
);

/* ================= AUTH MODAL ================= */
const AuthPrompt = ({ onClose, onLogin, onRegister }) => (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{ background: "rgba(0,0,0,0.75)", zIndex: 3000 }}
  >
    <div
      className="text-white p-4 text-center"
      style={{
        maxWidth: "420px",
        background: "rgba(16,18,19,0.95)",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h4 className="fw-bold mb-3">Login required</h4>
      <p className="text-secondary mb-4">
        Please login or create an account to submit your quiz.
      </p>

      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-success px-4" onClick={onLogin}>
          Login
        </button>
        <button className="btn btn-outline-light px-4" onClick={onRegister}>
          Register
        </button>
      </div>

      <button className="btn btn-link text-secondary mt-3" onClick={onClose}>
        Cancel
      </button>
    </div>
  </div>
);

/* ================= SUCCESS CARD ================= */
const SuccessCard = ({ onTakeQuiz, onHome }) => (
  <div
    className="mx-auto text-white p-5 text-center"
    style={{
      maxWidth: "520px",
      background: "rgba(255,255,255,0.06)",
      borderRadius: "22px",
      border: "1px solid rgba(255,255,255,0.12)",
    }}
  >
    <h3 className="fw-bold mb-3">Quiz created successfully</h3>
    <p className="text-secondary mb-4">
      Your quiz has been added and is ready to be attempted.
    </p>

    <div className="d-flex justify-content-center gap-3">
      <button className="btn btn-success px-4" onClick={onTakeQuiz}>
        Take Quiz
      </button>
      <button className="btn btn-outline-light px-4" onClick={onHome}>
        Go Home
      </button>
    </div>
  </div>
);

/* ================= MAIN ================= */
const CreateQuiz = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [openIndex, setOpenIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  /* LOAD DRAFT */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTitle(parsed.title || "");
      setQuestions(parsed.questions || []);
    }
  }, []);

  /* AUTOSAVE */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, questions }));
  }, [title, questions]);

  const isQuestionComplete = (q) =>
    q.question.trim() &&
    q.correctAnswer.trim() &&
    !q.options.some((o) => !o.trim());

  const allQuestionsFilled = () =>
    title.trim() && questions.every(isQuestionComplete);

  const handleQuestionChange = (index, field, value, optIndex = null) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (field === "question" || field === "correctAnswer") {
        updated[index][field] = value;
      } else {
        updated[index].options[optIndex] = value;
      }
      return updated;
    });
  };

  const addQuestion = () => {
    if (!isQuestionComplete(questions[questions.length - 1])) {
      setError("Complete the current question first.");
      return;
    }
    setError("");
    setQuestions((prev) => [
      ...prev,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
    setOpenIndex(questions.length);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    setOpenIndex(0);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowAuthPrompt(true);
      return;
    }

    if (!allQuestionsFilled()) return;

    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/quizzes/create`,
        { title, questions },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      localStorage.removeItem(STORAGE_KEY);
      setShowSuccess(true);
    } catch {
      alert("Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar showHomeButton />

      <div
        className="container-fluid py-5 d-flex justify-content-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #101213, #08111b)",
        }}
      >
        <div style={{ maxWidth: "650px", width: "100%" }}>
          {!showSuccess ? (
            <>
              <div className="text-center mb-4">
                <h2 className="text-white fw-bold">Create Your Own Quiz</h2>
                <p className="text-secondary">
                  Build a custom quiz with questions and answers
                </p>
              </div>

              <div className="p-4 mb-4 bg-dark rounded text-white">
                <label className="fw-semibold mb-2">Quiz Title</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {questions.map((q, index) => (
                <div key={index} className="mb-3 p-3 bg-dark rounded">
                  <div
                    className="d-flex justify-content-between align-items-center text-white"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                  >
                    <strong>Question {index + 1}</strong>
                    <span className="text-success fw-bold fs-4">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>

                  {openIndex === index && (
                    <div className="mt-3">
                      <input
                        className="form-control mb-2"
                        placeholder="Enter question"
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "question",
                            e.target.value,
                          )
                        }
                      />

                      {q.options.map((opt, i) => (
                        <input
                          key={i}
                          className="form-control mb-2"
                          placeholder={`Option ${i + 1}`}
                          value={opt}
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              "option",
                              e.target.value,
                              i,
                            )
                          }
                        />
                      ))}

                      <select
                        className="form-select mb-2"
                        value={q.correctAnswer}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "correctAnswer",
                            e.target.value,
                          )
                        }
                      >
                        <option value="">Select correct option</option>
                        {q.options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>

                      {questions.length > 1 && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeQuestion(index)}
                        >
                          Remove Question
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {error && <p className="text-warning text-center">{error}</p>}

              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-outline-light" onClick={addQuestion}>
                  Add Question
                </button>
                <button
                  className="btn btn-outline-light"
                  disabled={!allQuestionsFilled()}
                  onClick={() => setShowPreview(true)}
                >
                  Preview Quiz
                </button>
                <button
                  className="btn btn-success flex-fill"
                  disabled={loading || !allQuestionsFilled()}
                  onClick={handleSubmit}
                >
                  Submit Quiz
                </button>
              </div>
            </>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "80vh" }}
            >
              <SuccessCard
                onTakeQuiz={() => navigate("/take")}
                onHome={() => navigate("/")}
              />
            </div>
          )}
        </div>
      </div>

      {showPreview && (
        <PreviewModal
          title={title}
          questions={questions}
          onClose={() => setShowPreview(false)}
        />
      )}

      {showAuthPrompt && (
        <AuthPrompt
          onClose={() => setShowAuthPrompt(false)}
          onLogin={() => navigate("/login")}
          onRegister={() => navigate("/register")}
        />
      )}

      <Footer />
    </>
  );
};

export default CreateQuiz;
