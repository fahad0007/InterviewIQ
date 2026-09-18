function QuestionSkeleton() {
  return (
    <div className="question-card skeleton-card">

      <div className="question-card-header">
        <div className="skeleton skeleton-number" />

        <div className="skeleton-actions">
          <div className="skeleton skeleton-difficulty" />
          <div className="skeleton skeleton-icon" />
        </div>
      </div>

      <div className="skeleton skeleton-title" />

      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text short" />

      <div className="question-card-footer">

        <div className="skeleton-tags">
          <div className="skeleton skeleton-tag" />
          <div className="skeleton skeleton-tag small" />
        </div>

        <div className="skeleton skeleton-button" />

      </div>

    </div>
  );
}

export default QuestionSkeleton;