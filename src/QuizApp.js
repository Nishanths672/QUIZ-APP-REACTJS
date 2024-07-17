import React, { useState, useEffect } from 'react';
import './QuizApp.css';

const questions = [
  // Your questions array
  {
    question: "1. What is 2 + 2?",
    type: "text",
    answer: "4"
  },
  {
    question: "2. Select the primary colors.",
    type: "checkbox",
    options: ["Red", "Green", "Blue", "Yellow"],
    answer: ["Red", "Blue", "Yellow"]
  },
  {
    question: "3. What is the capital of France?",
    type: "text",
    answer: "Paris"
  },
  {
    question: "4. Which is the largest planet?",
    type: "radio",
    options: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter"
  },
  {
    question: "5. Select the odd one out",
    type: "dropdown",
    options: [" 1", " 2", "a"],
    answer: "a"
  },
  {
    question: "6. What is 5 * 6?",
    type: "text",
    answer: "30"
  },
  {
    question: "7. Select the colors of the rainbow.",
    type: "checkbox",
    options: ["Red", "Green", "Blue", "Yellow", "Pink", "Violet"],
    answer: ["Red", "Green", "Blue", "Yellow", "Violet"]
  },
  {
    question: "8. What is the capital of Japan?",
    type: "text",
    answer: "Tokyo"
  },
  {
    question: "9.Which is the smallest planet?",
    type: "radio",
    options: ["Earth", "Jupiter", "Mars", "Mercury"],
    answer: "Mercury"
  },
  {
    question: "10.Select the correct number",
    type: "dropdown",
    options: ["One", "Two", "Three", "Four"],
    answer: "Three"
  }
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(300); // Set the timer for 5 minutes (300 seconds)

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      handleSubmit();
    }
  }, [timer]);

  const handleInputChange = (event, questionIndex) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      let newAnswers = userAnswers[questionIndex] || [];
      if (checked) {
        newAnswers.push(value);
      } else {
        newAnswers = newAnswers.filter(answer => answer !== value);
      }
      setUserAnswers({ ...userAnswers, [questionIndex]: newAnswers });
    } else {
      setUserAnswers({ ...userAnswers, [questionIndex]: value });
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (Array.isArray(question.answer)) {
        const userAnswer = userAnswers[index] || [];
        if (JSON.stringify(userAnswer.sort()) === JSON.stringify(question.answer.sort())) {
          calculatedScore++;
        }
      } else {
        if (userAnswers[index] === question.answer) {
          calculatedScore++;
        }
      }
    });
    setScore(calculatedScore);
    setShowScore(true);
    setTimer(0); // Stop the timer
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    switch (question.type) {
      case "text":
        return (
          <div className="input-section">
            <input
              type="text"
              name={`question-${currentQuestion}`}
              onChange={(event) => handleInputChange(event, currentQuestion)}
            />
          </div>
        );
      case "checkbox":
        return (
          <div className="input-section">
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name={`question-${currentQuestion}`}
                  value={option}
                  onChange={(event) => handleInputChange(event, currentQuestion)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case "radio":
        return (
          <div className="input-section">
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  onChange={(event) => handleInputChange(event, currentQuestion)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <div className="input-section">
            <select
              name={`question-${currentQuestion}`}
              onChange={(event) => handleInputChange(event, currentQuestion)}
            >
              <option value="">Select an option</option>
              {question.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="timer-section">
            Time Remaining: {formatTime(timer)}
          </div>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          {renderQuestion()}
          <div className="navigation-buttons">
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                Next
              </button>
            ) : (
              <button onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizApp;
