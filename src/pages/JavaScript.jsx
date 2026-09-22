import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FilterBar from "../components/FilterBar";
import ProgressCard from "../components/ProgressCard";
import QuestionCard from "../components/QuestionsCard";
import EmptyState from "../components/EmptyState";

import { getQuestionsByType } from "../services/questionService";
import { useProgress } from "../context/ProgressContext";

import QuestionSkeletonList from "../components/QuestionSkeletonList";

function JavaScript() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const { progress } = useProgress();
useEffect(() => {
  const loadQuestions = async () => {
    try {
      const data = await getQuestionsByType("javascript");

      const sortedData = [...data].sort(
        (a, b) => Number(a.number) - Number(b.number)
      );

      setQuestions(sortedData);
    } catch (error) {
      console.error(
        "Error loading javascript questions:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  loadQuestions();
}, []);

  const categories = [
    "All",
    ...new Set(
      questions
        .map((question) => question.category)
        .filter(Boolean)
    )
  ];

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.question
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      question.category === category;

    const matchesDifficulty =
      difficulty === "All" ||
      question.difficulty === difficulty;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty
    );
  });

  const completed = questions.filter(
    (question) =>
      progress[question.id]?.completed
  ).length;

  const handleRandomQuestion = () => {
    if (!questions.length) return;

    const randomIndex = Math.floor(
      Math.random() * questions.length
    );

    const randomQuestion = questions[randomIndex];

    navigate(
      `/question/javascript/${randomQuestion.id}`
    );
  };

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
          <h1>Javascript Round</h1>

          <p>
            Practice React and JavaScript interview
            concepts.
          </p>
        </div>

        <button
          className="random-btn"
          onClick={handleRandomQuestion}
        >
          Random Question
        </button>
      </div>

      <ProgressCard
        total={questions.length}
        completed={completed}
      />

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        categories={categories}
      />

      {filteredQuestions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="question-list">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              type="javascript"
              // number={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default JavaScript;