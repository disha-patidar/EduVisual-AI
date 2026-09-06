import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz({ topic, questions = [] }) {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  /* =========================
     NO QUESTIONS
  ========================= */

  if (!questions.length) {
    return (
      <div className="quiz-empty">
        <div className="quiz-empty-icon">📝</div>

        <h2>Quiz coming soon</h2>

        <p>
          No questions are available for this topic yet.
        </p>
      </div>
    );
  }

  const question = questions[current];

  /* =========================
     ANSWER
  ========================= */

  const handleAnswer = (index) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  /* =========================
     NEXT QUESTION
  ========================= */

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
  };

  /* =========================
     RESTART
  ========================= */

  const restartQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  /* =========================
     RESULT
  ========================= */

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    let resultTitle;
    let resultMessage;
    let resultIcon;

    if (percentage === 100) {
      resultTitle = "Perfect Score!";
      resultMessage =
        "Outstanding! You have completely mastered this topic.";
      resultIcon = "🏆";
    } else if (percentage >= 80) {
      resultTitle = "Excellent!";
      resultMessage =
        "You have a strong understanding of this topic.";
      resultIcon = "🎉";
    } else if (percentage >= 60) {
      resultTitle = "Good Job!";
      resultMessage =
        "You understand most of the key concepts. A little more practice will make you even stronger.";
      resultIcon = "👍";
    } else {
      resultTitle = "Keep Learning!";
      resultMessage =
        "Review the visualization and explanation, then try the quiz again.";
      resultIcon = "📚";
    }

    return (
      <>
        <style>{`
          /* =========================
             QUIZ RESULT
          ========================= */

          .quiz-container {
            width: 100%;
            max-width: 900px;
            margin: 40px auto;
            padding: 30px;
            box-sizing: border-box;
          }

          .quiz-result {
            position: relative;
            overflow: hidden;

            padding: 55px 35px;

            text-align: center;

            border-radius: 24px;

            background:
              radial-gradient(
                circle at 50% -20%,
                rgba(80, 191, 255, 0.18),
                transparent 45%
              ),
              linear-gradient(
                145deg,
                rgba(255, 255, 255, 0.055),
                rgba(255, 255, 255, 0.025)
              );

            border: 1px solid rgba(255, 255, 255, 0.09);

            box-shadow:
              0 25px 70px rgba(0, 0, 0, 0.30),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }

          /* Decorative glow */

          .quiz-result::before {
            content: "";

            position: absolute;

            width: 240px;
            height: 240px;

            top: -160px;
            left: 50%;

            transform: translateX(-50%);

            background: rgba(80, 191, 255, 0.13);

            border-radius: 50%;

            filter: blur(50px);

            pointer-events: none;
          }

          .quiz-result::after {
            content: "";

            position: absolute;

            width: 160px;
            height: 160px;

            bottom: -120px;
            right: -70px;

            background: rgba(99, 102, 241, 0.10);

            border-radius: 50%;

            filter: blur(45px);

            pointer-events: none;
          }

          /* Everything above decorations */

          .quiz-result > * {
            position: relative;
            z-index: 2;
          }

          /* =========================
             TROPHY
          ========================= */

          .quiz-result-icon {
            width: 86px;
            height: 86px;

            margin: 0 auto 22px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background:
              radial-gradient(
                circle,
                rgba(80, 191, 255, 0.16),
                rgba(80, 191, 255, 0.04)
              );

            border: 1px solid rgba(80, 191, 255, 0.22);

            font-size: 42px;

            box-shadow:
              0 0 35px rgba(80, 191, 255, 0.10);
          }

          /* =========================
             COMPLETED LABEL
          ========================= */

          .quiz-result-label {
            display: block;

            color: #50bfff;

            font-size: 11px;
            font-weight: 800;

            letter-spacing: 2px;

            text-transform: uppercase;
          }

          /* =========================
             RESULT TITLE
          ========================= */

          .quiz-result-title {
            margin: 12px 0 0;

            color: white;

            font-size: 25px;
            font-weight: 700;
          }

          /* =========================
             SCORE
          ========================= */

          .quiz-result h1 {
            margin: 8px 0 0;

            color: white;

            font-size: 64px;
            line-height: 1;

            font-weight: 800;

            letter-spacing: -3px;
          }

          /* =========================
             SCORE LINE
          ========================= */

          .quiz-result-score-text {
            margin: 14px 0 0;

            color: rgba(255, 255, 255, 0.60);

            font-size: 14px;
            line-height: 1.6;
          }

          .quiz-result-score-text strong {
            color: #50bfff;
            font-weight: 700;
          }

          /* =========================
             RESULT MESSAGE
          ========================= */

          .quiz-result-message {
            max-width: 540px;

            margin: 24px auto 0;

            padding: 16px 20px;

            border-radius: 13px;

            background: rgba(255, 255, 255, 0.035);

            border: 1px solid rgba(255, 255, 255, 0.07);

            color: rgba(255, 255, 255, 0.65);

            font-size: 13px;
            line-height: 1.7;
          }

          /* =========================
             SCORE BAR
          ========================= */

          .quiz-result-progress {
            width: 100%;
            max-width: 420px;

            height: 7px;

            margin: 24px auto 0;

            overflow: hidden;

            border-radius: 20px;

            background: rgba(255, 255, 255, 0.08);
          }

          .quiz-result-progress-fill {
            height: 100%;

            border-radius: inherit;

            background: linear-gradient(
              90deg,
              #50bfff,
              #7dd3fc
            );

            transition: width 0.8s ease;
          }

          /* =========================
             BUTTONS
          ========================= */

          .quiz-result-actions {
            display: flex;

            justify-content: center;
            align-items: center;

            gap: 12px;

            margin-top: 30px;
          }

          .quiz-retry-btn,
          .quiz-back-btn {
            min-width: 150px;

            padding: 13px 21px;

            border-radius: 11px;

            font-size: 12px;
            font-weight: 700;

            cursor: pointer;

            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease,
              background 0.2s ease,
              border-color 0.2s ease;
          }

          /* Try Again */

          .quiz-retry-btn {
            border: none;

            background: #50bfff;

            color: #06101d;

            box-shadow:
              0 8px 25px rgba(80, 191, 255, 0.18);
          }

          .quiz-retry-btn:hover {
            transform: translateY(-2px);

            background: #69c8ff;

            box-shadow:
              0 12px 32px rgba(80, 191, 255, 0.28);
          }

          /* Explore More */

          .quiz-back-btn {
            border: 1px solid rgba(255, 255, 255, 0.12);

            background: rgba(255, 255, 255, 0.055);

            color: rgba(255, 255, 255, 0.88);
          }

          .quiz-back-btn:hover {
            transform: translateY(-2px);

            background: rgba(255, 255, 255, 0.09);

            border-color: rgba(255, 255, 255, 0.20);
          }

          /* =========================
             QUIZ EMPTY
          ========================= */

          .quiz-empty {
            width: 100%;
            max-width: 900px;

            margin: 40px auto;

            padding: 50px 30px;

            box-sizing: border-box;

            text-align: center;

            border-radius: 20px;

            background: rgba(255, 255, 255, 0.045);

            border: 1px solid rgba(255, 255, 255, 0.08);
          }

          .quiz-empty-icon {
            font-size: 40px;

            margin-bottom: 12px;
          }

          .quiz-empty h2 {
            margin: 0;

            color: white;

            font-size: 24px;
          }

          .quiz-empty p {
            margin-top: 10px;

            color: rgba(255, 255, 255, 0.5);

            font-size: 13px;
          }

          /* =========================
             MOBILE
          ========================= */

          @media (max-width: 600px) {

            .quiz-container {
              padding: 20px 10px;
            }

            .quiz-result {
              padding: 42px 20px;
              border-radius: 20px;
            }

            .quiz-result-icon {
              width: 70px;
              height: 70px;

              font-size: 34px;
            }

            .quiz-result-title {
              font-size: 21px;
            }

            .quiz-result h1 {
              font-size: 50px;
            }

            .quiz-result-score-text {
              font-size: 13px;
            }

            .quiz-result-message {
              font-size: 12px;
              padding: 14px;
            }

            .quiz-result-actions {
              flex-direction: column;

              width: 100%;
            }

            .quiz-retry-btn,
            .quiz-back-btn {
              width: 100%;
            }
          }
        `}</style>

        <div className="quiz-container">
          <div className="quiz-result">

            {/* TROPHY */}

            <div className="quiz-result-icon">
              {resultIcon}
            </div>

            {/* LABEL */}

            <span className="quiz-result-label">
              QUIZ COMPLETED
            </span>

            {/* RESULT TITLE */}

            <div className="quiz-result-title">
              {resultTitle}
            </div>

            {/* SCORE */}

            <h1>
              {score} / {questions.length}
            </h1>

            {/* PERCENTAGE */}

            <p className="quiz-result-score-text">
              You scored{" "}
              <strong>{percentage}%</strong>{" "}
              in {topic}.
            </p>

            {/* SCORE BAR */}

            <div className="quiz-result-progress">
              <div
                className="quiz-result-progress-fill"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            {/* MESSAGE */}

            <div className="quiz-result-message">
              {resultMessage}
            </div>

            {/* ACTIONS */}

            <div className="quiz-result-actions">

              <button
                className="quiz-retry-btn"
                onClick={restartQuiz}
              >
                Try Again
              </button>

              <button
                className="quiz-back-btn"
                onClick={() => navigate("/")}
              >
                Explore More Topics
              </button>

            </div>

          </div>
        </div>
      </>
    );
  }

  /* =========================
     PROGRESS
  ========================= */

  const progress =
    ((current + 1) / questions.length) * 100;

  /* =========================
     QUIZ
  ========================= */

  return (
    <>
      <style>{`

        .quiz-container {
          width: 100%;
          max-width: 900px;
          margin: 40px auto;
          padding: 30px;
          box-sizing: border-box;
        }

        /* =========================
           HEADER
        ========================= */

        .quiz-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
        }

        .quiz-eyebrow {
          color: #50bfff;

          font-size: 10px;
          font-weight: 800;

          letter-spacing: 1.5px;
        }

        .quiz-header h2 {
          margin: 7px 0 5px;

          color: white;

          font-size: 30px;
        }

        .quiz-header p {
          margin: 0;

          color: rgba(255,255,255,0.5);

          font-size: 13px;
        }

        .quiz-counter {
          min-width: 65px;

          padding: 10px 14px;

          text-align: center;

          border-radius: 10px;

          background: rgba(70,180,255,0.1);

          border: 1px solid rgba(70,180,255,0.2);

          color: #70caff;

          font-size: 12px;
          font-weight: 700;
        }

        /* =========================
           PROGRESS
        ========================= */

        .quiz-progress {
          width: 100%;

          height: 5px;

          margin: 25px 0;

          overflow: hidden;

          border-radius: 10px;

          background: rgba(255,255,255,0.08);
        }

        .quiz-progress-fill {
          height: 100%;

          border-radius: inherit;

          background: #50bfff;

          transition: width 0.3s ease;
        }

        /* =========================
           QUESTION CARD
        ========================= */

        .quiz-question-card {
          padding: 30px;

          border-radius: 20px;

          background: rgba(255,255,255,0.045);

          border: 1px solid rgba(255,255,255,0.08);
        }

        .quiz-question-number {
          margin-bottom: 12px;

          color: rgba(255,255,255,0.4);

          font-size: 10px;
          font-weight: 800;

          letter-spacing: 1px;
        }

        .quiz-question-card h3 {
          margin: 0 0 25px;

          color: white;

          font-size: 21px;

          line-height: 1.5;
        }

        /* =========================
           OPTIONS
        ========================= */

        .quiz-options {
          display: flex;

          flex-direction: column;

          gap: 12px;
        }

        .quiz-option {
          width: 100%;

          display: flex;

          align-items: center;

          gap: 15px;

          padding: 16px;

          text-align: left;

          border-radius: 13px;

          border: 1px solid rgba(255,255,255,0.09);

          background: rgba(255,255,255,0.035);

          color: rgba(255,255,255,0.8);

          cursor: pointer;

          transition: all 0.2s ease;

          box-sizing: border-box;
        }

        .quiz-option:hover:not(:disabled) {
          transform: translateY(-1px);

          border-color: rgba(80,190,255,0.5);

          background: rgba(80,190,255,0.07);
        }

        .quiz-option:disabled {
          cursor: default;
        }

        /* =========================
           OPTION LETTER
        ========================= */

        .option-letter {
          width: 34px;
          height: 34px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 9px;

          background: rgba(255,255,255,0.07);

          color: white;

          font-size: 12px;
          font-weight: 800;
        }

        .option-text {
          flex: 1;

          font-size: 13px;

          line-height: 1.4;
        }

        .option-status {
          font-size: 18px;

          font-weight: 800;
        }

        /* =========================
           CORRECT / WRONG
        ========================= */

        .quiz-option.correct {
          border-color: rgba(60,210,140,0.7);

          background: rgba(60,210,140,0.1);
        }

        .quiz-option.correct .option-letter {
          background: rgba(60,210,140,0.2);
        }

        .quiz-option.wrong {
          border-color: rgba(255,80,100,0.7);

          background: rgba(255,80,100,0.08);
        }

        .quiz-option.wrong .option-letter {
          background: rgba(255,80,100,0.2);
        }

        /* =========================
           FEEDBACK
        ========================= */

        .quiz-feedback {
          margin-top: 20px;

          padding: 17px;

          border-radius: 13px;
        }

        .feedback-correct {
          background: rgba(60,210,140,0.08);

          border: 1px solid rgba(60,210,140,0.2);
        }

        .feedback-wrong {
          background: rgba(255,80,100,0.08);

          border: 1px solid rgba(255,80,100,0.2);
        }

        .quiz-feedback strong {
          color: white;

          font-size: 13px;
        }

        .quiz-feedback p {
          margin: 6px 0 0;

          color: rgba(255,255,255,0.6);

          font-size: 12px;

          line-height: 1.6;
        }

        /* =========================
           NEXT BUTTON
        ========================= */

        .quiz-next-btn {
          display: block;

          margin: 20px 0 0 auto;

          padding: 13px 22px;

          border: none;

          border-radius: 10px;

          background: #50bfff;

          color: #06101d;

          font-size: 12px;

          font-weight: 800;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .quiz-next-btn:hover {
          opacity: 0.9;

          transform: translateY(-1px);

          box-shadow:
            0 8px 20px rgba(80, 191, 255, 0.18);
        }

        /* =========================
           EMPTY STATE
        ========================= */

        .quiz-empty {
          margin: 30px 0;

          padding: 40px;

          text-align: center;

          border-radius: 18px;

          background: rgba(255,255,255,0.04);

          border: 1px solid rgba(255,255,255,0.08);
        }

        .quiz-empty-icon {
          font-size: 40px;

          margin-bottom: 10px;
        }

        .quiz-empty h2 {
          color: white;
        }

        .quiz-empty p {
          color: rgba(255,255,255,0.5);
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {

          .quiz-container {
            padding: 20px 10px;
          }

          .quiz-header {
            align-items: flex-start;
          }

          .quiz-header h2 {
            font-size: 23px;
          }

          .quiz-question-card {
            padding: 20px;
          }

          .quiz-question-card h3 {
            font-size: 17px;
          }

          .quiz-result-actions {
            flex-direction: column;
          }

          .quiz-result {
            padding: 40px 20px;
          }
        }

      `}</style>

      <div className="quiz-container">

        {/* =========================
            HEADER
        ========================= */}

        <div className="quiz-header">

          <div>
            <span className="quiz-eyebrow">
              KNOWLEDGE CHECK
            </span>

            <h2>
              Test Your Understanding
            </h2>

            <p>
              {topic}
            </p>
          </div>

          <div className="quiz-counter">
            {current + 1} / {questions.length}
          </div>

        </div>

        {/* =========================
            PROGRESS
        ========================= */}

        <div className="quiz-progress">

          <div
            className="quiz-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        {/* =========================
            QUESTION
        ========================= */}

        <div className="quiz-question-card">

          <div className="quiz-question-number">
            QUESTION {current + 1}
          </div>

          <h3>
            {question.question}
          </h3>

          {/* OPTIONS */}

          <div className="quiz-options">

            {question.options.map(
              (option, index) => {

                let className = "quiz-option";

                if (selected !== null) {

                  if (index === question.answer) {
                    className += " correct";
                  } else if (
                    index === selected
                  ) {
                    className += " wrong";
                  }
                }

                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() =>
                      handleAnswer(index)
                    }
                    disabled={
                      selected !== null
                    }
                  >

                    <span className="option-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span className="option-text">
                      {option}
                    </span>

                    {selected !== null &&
                      index === question.answer && (
                        <span className="option-status">
                          ✓
                        </span>
                      )}

                    {selected !== null &&
                      index === selected &&
                      index !== question.answer && (
                        <span className="option-status">
                          ✕
                        </span>
                      )}

                  </button>
                );
              }
            )}

          </div>

          {/* =========================
              EXPLANATION
          ========================= */}

          {selected !== null && (

            <div
              className={`quiz-feedback ${
                selected === question.answer
                  ? "feedback-correct"
                  : "feedback-wrong"
              }`}
            >

              <strong>
                {selected === question.answer
                  ? "✓ Correct!"
                  : "✕ Not quite!"}
              </strong>

              <p>
                {question.explanation}
              </p>

            </div>

          )}

        </div>

        {/* =========================
            NEXT
        ========================= */}

        {selected !== null && (

          <button
            className="quiz-next-btn"
            onClick={nextQuestion}
          >
            {current === questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>

        )}

      </div>
    </>
  );
}

export default Quiz;