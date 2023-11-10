import React, { useEffect, useState } from "react";
import "./App.css";
import quizQuestions from "./questions";

interface UserResponse {
  questionId: number;
  selectedAnswer: string;
  correct: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

function App(): JSX.Element {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const questions: QuizQuestion[] = quizQuestions;

  const currentQuestion: QuizQuestion = questions[currentQuestionIndex];

  function getNextQuestion() {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setCompleted(true);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedAnswer) {
      getNextQuestion();
      setSelectedAnswer(null);
    } else {
      alert("Please select an answer.");
    }
  }

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, []);

  function handleAnswerSelect(answer: string) {
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      correct: answer === currentQuestion.correctAnswer,
    };

    setUserResponses(updatedResponses);
    setSelectedAnswer(answer);
  }

  function resetGame() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswersCount(0);
    setCompleted(false);
    setUserResponses([]);
  }

  function answersScreen() {
    return (
      <>
        <div className="answers-top-bar">
          <h1>
            You have answered {correctAnswersCount} questions correctly from{" "}
            {questions.length}
          </h1>
          <button className="reset-game" onClick={() => resetGame()}>
            Reset
          </button>
        </div>

        <div className="answers">
          {questions.map((question, index) => (
            <div key={question.id} className="question-container">
              <h4>Question: {question.question}</h4>
              <ul>
                {question.answers.map((answer, answerIndex) => {
                  const userResponse = userResponses[index];

                  return (
                    <li
                      key={answerIndex}
                      className={`answer-item ${
                        userResponse &&
                        userResponse.selectedAnswer === answer &&
                        userResponse.correct
                          ? "correct"
                          : userResponse &&
                            userResponse.selectedAnswer === answer &&
                            !userResponse.correct
                          ? "wrong"
                          : ""
                      }`}
                    >
                      {answer}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="quiz-container">
      {completed ? (
        <>{answersScreen()}</>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            {currentQuestion && (
              <div className="quiz-content">
                <p className="question-index">
                  {`Question ${currentQuestionIndex + 1} / ${questions.length}`}
                </p>
                <h2>Question: {currentQuestion.question}</h2>
                <ul>
                  {currentQuestion.answers.map((answer, index) => (
                    <li
                      key={index}
                      className={`answer-item ${
                        selectedAnswer === answer ? "selected" : ""
                      }`}
                      onClick={() => handleAnswerSelect(answer)}
                    >
                      {answer}
                    </li>
                  ))}
                </ul>
                {selectedAnswer && (
                  <button>
                    {currentQuestionIndex === questions.length - 1
                      ? "Finish"
                      : "Next question"}
                  </button>
                )}
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default App;
