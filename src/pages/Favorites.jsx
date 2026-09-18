import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import QuestionCard from "../components/QuestionsCard";
import EmptyState from "../components/EmptyState";

import { getQuestions } from "../services/questionService";
import { useProgress } from "../context/ProgressContext";


import QuestionSkeletonList from "../components/QuestionSkeletonList";


function Favorites() {
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

  const favoriteQuestions = questions.filter(
    (question) => progress[question.id]?.favorite
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
            <Star size={25} />
            <h1>Favorites</h1>
          </div>

          <p>
            Questions you have marked as favorite.
          </p>
        </div>
      </div>

      {favoriteQuestions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="question-list">
          {favoriteQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              type={question.type}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;