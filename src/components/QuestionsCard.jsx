import { Link } from "react-router-dom";

import {
  Star,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

import { useProgress } from "../context/ProgressContext";

function QuestionCard({
  question,
  type,
}) {
  const {
    toggleFavorite,
    isFavorite,
    isCompleted
  } = useProgress();

  const favorite = isFavorite(question.id);
  const completed = isCompleted(question.id);

  return (
    <div className="question-card">

      <div className="question-card-header">

        <div className="question-number">
          #{String(question.number ).padStart(2, "0")}
        </div>

        <div className="question-actions">

          <span
            className={`difficulty ${question.difficulty?.toLowerCase()}`}
          >
            {question.difficulty}
          </span>

          <button
            className={`favorite-btn ${
              favorite
                ? "favorite-active"
                : ""
            }`}
            onClick={() =>
              toggleFavorite(question.id)
            }
          >
            <Star
              size={18}
              fill={
                favorite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

        </div>
      </div>

      <Link
        to={`/question/${type}/${question.id}`}
        className="question-title"
      >
        {question.question}
      </Link>

      <p className="question-preview">
        {question.answer}
      </p>

      <div className="question-card-footer">

        <div className="question-tags">

          <span className="category-tag">
            {question.category}
          </span>

          {question.tags
            ?.slice(0, 2)
            .map((tag) => (
              <span
                className="tag"
                key={tag}
              >
                {tag}
              </span>
            ))}

        </div>

        <div className="question-footer-actions">

          {completed && (
            <span className="completed-label">
              <CheckCircle2 size={15} />
              Completed
            </span>
          )}

          <Link
            to={`/question/${type}/${question.id}`}
            className="practice-btn"
          >
            Practice
            <ArrowRight size={15} />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default QuestionCard;