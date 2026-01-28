import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const QUESTION_TIME = 15;

const TakeQuiz = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [quizFinished, setQuizFinished] = useState(false);

  /* ================= FETCH QUIZZES ================= */

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/quizzes`
        );
        setQuizzes(res.data.reverse());
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizzes();
  }, []);

  /* ================= SAVE ANSWER ================= */

  const saveAnswer = () => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = selectedOption || null;
      return updated;
    });
  };

  /* ================= FINISH QUIZ ================= */

  const handleFinish = () => {
    const finalAnswers = [...answers];
    finalAnswers[currentIndex] = selectedOption;

    let score = 0;

    selectedQuiz.questions.forEach((q, i) => {
      if (finalAnswers[i] === q.correctAnswer) score++;
    });

    const resultData = {
      selectedQuiz,
      score,
      answers: finalAnswers,
      totalTime: `${selectedQuiz.questions.length * QUESTION_TIME}s`,
    };

    sessionStorage.setItem("quizResult", JSON.stringify(resultData));

    setQuizFinished(true);
    navigate("/result");
  };

  /* ================= TIMER ================= */

  useEffect(() => {
    if (!selectedQuiz || quizFinished) return;

    if (timeLeft === 0) {
      saveAnswer();

      if (currentIndex < selectedQuiz.questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        handleFinish();
      }

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, selectedQuiz, quizFinished, currentIndex]);

  /* ================= RESET TIMER & RESTORE ANSWER ================= */

  useEffect(() => {
    if (!selectedQuiz || quizFinished) return;

    setTimeLeft(QUESTION_TIME);

    setSelectedOption(() => {
      return answers[currentIndex] || null;
    });
  }, [currentIndex, selectedQuiz, quizFinished, answers]);

  /* ================= BUTTON HANDLERS ================= */

  const handleNext = () => {
    saveAnswer();

    if (currentIndex < selectedQuiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    saveAnswer();

    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const selectQuiz = (quiz) => {
    if (!quiz.questions || quiz.questions.length === 0) {
      alert("Quiz has no questions");
      return;
    }

    setQuizFinished(false);
    setSelectedQuiz(quiz);
    setCurrentIndex(0);
    setAnswers(Array(quiz.questions.length).fill(null));
    setSelectedOption(null);
    setTimeLeft(QUESTION_TIME);
  };

  /* ================= QUIZ LIST UI ================= */

  if (!selectedQuiz) {
    return (
      <>
        <Navbar onlyHome />

        <div
          className="d-flex justify-content-center"
          style={{
            minHeight: "calc(100vh - 120px)",
            background: "linear-gradient(135deg, #101213, #08111b)",
            padding: "3rem 1rem",
          }}
        >
          <div className="container" style={{ maxWidth: "720px" }}>
            <h2 className="text-white fw-bold mb-4 text-center">
              Available Quizzes
            </h2>

            {/* CREATE QUIZ CARD */}
            <div
              className="card mb-4 text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "18px",
                border: "2px dashed rgba(25,135,84,0.6)",
                cursor: "pointer",
              }}
              onClick={() => navigate("/create")}
            >
              <div className="card-body py-5">
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "600",
                    color: "#198754",
                  }}
                >
                  +
                </div>
                <h5 className="text-white mt-3">Create New Quiz</h5>
                <p className="text-secondary mb-0">
                  Build a quiz with your own questions
                </p>
              </div>
            </div>

            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="card mb-4"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h5 className="text-white fw-semibold mb-2">
                        {quiz.title}
                      </h5>
                      <div className="text-secondary">
                        <div>Total Questions: {quiz.questions.length}</div>
                        <div>
                          Estimated Time: {quiz.questions.length} minutes
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <button
                        className="btn btn-success w-100"
                        onClick={() => selectQuiz(quiz)}
                      >
                        Take Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </>
    );
  }

  /* ================= QUIZ QUESTION UI ================= */

  const question = selectedQuiz.questions[currentIndex];

  return (
    <>
      <Navbar onlyHome />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #101213, #08111b)",
        }}
      >
        <div
          className="card p-4 text-white"
          style={{
            maxWidth: "520px",
            width: "100%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "16px",
          }}
        >
          <p className="text-secondary">
            Question {currentIndex + 1} of {selectedQuiz.questions.length}
          </p>

          <div className="progress mb-3">
            <div
              className="progress-bar bg-success"
              style={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
            />
          </div>

          <p className="text-end text-secondary">Time left: {timeLeft}s</p>

          <h6 className="mb-3">{question.question}</h6>

          {question.options.map((opt, idx) => (
            <button
              key={idx}
              className={`btn w-100 mb-2 text-start ${
                selectedOption === opt ? "btn-success" : "btn-outline-light"
              }`}
              onClick={() => setSelectedOption(opt)}
            >
              {opt}
            </button>
          ))}

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-light"
              disabled={currentIndex === 0}
              onClick={handlePrevious}
            >
              Previous
            </button>

            <button className="btn btn-success" onClick={handleNext}>
              {currentIndex === selectedQuiz.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeQuiz;
