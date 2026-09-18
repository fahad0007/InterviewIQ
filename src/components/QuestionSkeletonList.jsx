import QuestionSkeleton from "./QuestionSkeleton";

function QuestionSkeletonList({ count = 5 }) {
  return (
    <div className="question-list">
      {Array.from({ length: count }).map((_, index) => (
        <QuestionSkeleton key={index} />
      ))}
    </div>
  );
}

export default QuestionSkeletonList;