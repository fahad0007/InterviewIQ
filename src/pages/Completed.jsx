import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import QuestionCard from "../components/QuestionsCard";
import EmptyState from "../components/EmptyState";

import { getQuestions } from "../services/questionService";
import { useProgress } from "../context/ProgressContext";
import QuestionSkeletonList from "../components/QuestionSkeletonList";

function Completed() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { progress } = useProgress();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const completedQuestions = questions.filter(
    (question) => progress[question.id]?.completed
  );

   if (loading) {
  return (
    <div className="page-container">
      <QuestionSkeletonList count={5} />
    </div>
  );
}

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title-row">
            <CheckCircle2 size={25} />
            <h1>Completed Questions</h1>
          </div>

          <p>
            Questions you have successfully completed.
          </p>
        </div>
      </div>

      {completedQuestions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="question-list">
          {completedQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              type={question.type}
              // number={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Completed;