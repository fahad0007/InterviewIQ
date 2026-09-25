import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";

import { useProgress } from "../context/ProgressContext";
import { getQuestionsByType } from "../services/questionService";

import QuestionDetailsSkeleton
  from "../components/QuestionDetailsSkeleton";

function QuestionDetails() {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const {
    toggleFavorite,
    toggleCompleted,
    isFavorite,
    isCompleted,
  } = useProgress();

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  // Load questions
 useEffect(() => {
  const loadQuestions = async () => {
    try {
      setLoading(true);

      const data = await getQuestionsByType(type);

      // Sort questions by question number: 1, 2, 3, 4...
      const sortedData = [...data].sort(
        (a, b) => Number(a.number) - Number(b.number)
      );

      setQuestions(sortedData);

      // Find current question
      const currentQuestion = sortedData.find(
        (item) => String(item.id) === String(id)
      );

      setQuestion(currentQuestion || null);

      // Reset answer whenever question changes
      setShowAnswer(false);
    } catch (error) {
      console.error("Error loading question:", error);
      setQuestion(null);
    } finally {
      setLoading(false);
    }
  };

  loadQuestions();
}, [type, id]);

  // Loading
  if (loading) {
    return <QuestionDetailsSkeleton />;
  }

  // Question not found
  if (!question) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <span>?</span>
        </div>

        <h3>Question not found</h3>

        <p>
          The question you are looking for does not exist.
        </p>

        <button
          className="practice-btn"
          onClick={() => navigate(`/${type}`)}
        >
          <ArrowLeft size={16} />
          Back to Questions
        </button>
      </div>
    );
  }

  // Current question index
  const currentIndex = questions.findIndex(
    (item) => String(item.id) === String(id)
  );

  // Previous question
  const previousQuestion =
    currentIndex > 0
      ? questions[currentIndex - 1]
      : null;

  // Next question
  const nextQuestion =
    currentIndex < questions.length - 1
      ? questions[currentIndex + 1]
      : null;

  // Favorite status
  const favorite = isFavorite(question.id);

  // Completed status
  const completed = isCompleted(question.id);

  // Navigate to another question
  const goToQuestion = (questionId) => {
    setShowAnswer(false);

    navigate(
      `/question/${type}/${questionId}`
    );
  };

  // Previous
  const handlePrevious = () => {
    if (!previousQuestion) return;

    goToQuestion(previousQuestion.id);
  };

  // Next
  const handleNext = () => {
    if (!nextQuestion) return;

    goToQuestion(nextQuestion.id);
  };

  return (
    <div className="question-details-page">

      {/* Back */}
      <Link
        to={`/${type}`}
        className="back-link"
      >
        <ArrowLeft size={17} />

        Back to{" "}
        {type === "hr"
          ? "HR Round"
          : `${type} Round`}
      </Link>

      {/* Header */}
      <div className="details-header">

        <div className="details-header-left">

          <div className="details-number">
            #{String(question.number).padStart(2, "0")}
          </div>

          <div>
            <div className="details-meta">

              {question.difficulty && (
                <span
                  className={`difficulty ${question.difficulty.toLowerCase()}`}
                >
                  {question.difficulty}
                </span>
              )}

              {question.category && (
                <span className="category-tag">
                  {question.category}
                </span>
              )}

            </div>

            <h1>{question.question}</h1>
          </div>

        </div>

        {/* Favorite */}
        <button
          className={`favorite-btn details-favorite ${favorite ? "favorite-active" : ""
            }`}
          onClick={() =>
            toggleFavorite(question.id)
          }
        >
          <Star
            size={22}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>

      </div>

      {/* Question */}
      <section className="details-section">

        <div className="details-section-header">

          <h2>Question</h2>

          <span>
            {currentIndex + 1} / {questions.length}
          </span>

        </div>

        <div className="question-box">
          <p>{question.question}</p>
        </div>

      </section>

      {/* Answer */}
      <section className="details-section">

        <div className="details-section-header">

          <h2>Answer</h2>

          <button
            className="show-answer-btn"
            onClick={() =>
              setShowAnswer((prev) => !prev)
            }
          >
            {showAnswer ? (
              <>
                <EyeOff size={17} />
                Hide Answer
              </>
            ) : (
              <>
                <Eye size={17} />
                Show Answer
              </>
            )}
          </button>

        </div>

        {!showAnswer ? (
          <div className="hidden-answer">

            <Eye size={25} />

            <h3>Answer is hidden</h3>

            <p>
              Try answering the question yourself
              before revealing the answer.
            </p>

            <button
              className="show-answer-btn primary"
              onClick={() =>
                setShowAnswer(true)
              }
            >
              <Eye size={17} />
              Show Answer
            </button>

          </div>
        ) : (
          <div className="answer-box">

            <p>{question.answer}</p>

            {/* Coding Solution */}
            {type === "coding" &&
              question.code && (
                <div className="code-section">

                  <div className="code-header">
                    <span>Solution</span>
                    <span>JavaScript</span>
                  </div>

                  <pre>
                    <code>
                      {question.code}
                    </code>
                  </pre>

                </div>
              )}

          </div>
        )}

      </section>

      {/* Tags */}
      {question.tags?.length > 0 && (
        <section className="details-tags">

          <h3>Tags</h3>

          <div className="tags-list">

            {question.tags.map((tag) => (
              <span
                className="tag"
                key={tag}
              >
                {tag}
              </span>
            ))}

          </div>

        </section>
      )}

      {/* Complete */}
      <div className="complete-section">

        <div>

          <h3>
            {completed
              ? "Question completed!"
              : "Finished practicing?"}
          </h3>

          <p>
            {completed
              ? "You have marked this question as completed."
              : "Mark this question as completed to track your progress."}
          </p>

        </div>

        <button
          className={`complete-btn ${completed ? "completed" : ""
            }`}
          onClick={() =>
            toggleCompleted(question.id)
          }
        >
          <CheckCircle2 size={18} />

          {completed
            ? "Completed"
            : "Mark as Complete"}
        </button>

      </div>

      {/* Previous / Next */}
      <div className="question-navigation">

        {previousQuestion ? (
          <button
            className="navigation-btn previous"
            onClick={handlePrevious}
          >
            <ChevronLeft size={20} />

            <div>
              <small>Previous</small>

              <span>
                {previousQuestion.question}
              </span>
            </div>

          </button>
        ) : (
          <div />
        )}

        {nextQuestion ? (
          <button
            className="navigation-btn next"
            onClick={handleNext}
          >
            <div>
              <small>Next</small>

              <span>
                {nextQuestion.question}
              </span>
            </div>

            <ChevronRight size={20} />

          </button>
        ) : (
          <div />
        )}

      </div>

    </div>
  );
}

export default QuestionDetails;