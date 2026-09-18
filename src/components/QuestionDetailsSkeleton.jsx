function QuestionDetailsSkeleton() {
  return (
    <div className="details-skeleton">

      <div className="skeleton details-back" />

      <div className="details-header-skeleton">

        <div>
          <div className="skeleton details-category" />

          <div className="skeleton details-title" />

          <div className="skeleton details-meta" />
        </div>

        <div className="skeleton details-action" />

      </div>

      <div className="details-answer-skeleton">

        <div className="skeleton answer-title" />

        <div className="skeleton answer-line" />
        <div className="skeleton answer-line" />
        <div className="skeleton answer-line short" />

      </div>

    </div>
  );
}

export default QuestionDetailsSkeleton;