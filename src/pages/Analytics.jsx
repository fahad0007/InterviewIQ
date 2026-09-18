import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

import { getQuestions } from "../services/questionService";
import { useProgress } from "../context/ProgressContext";
import DashboardSkeleton from "../components/DashboardSkeleton"


function Analytics() {
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

  if (loading) {
  return (
    <div className="page-container">
      <DashboardSkeleton/>
    </div>
  );
}

  const total = questions.length;

  const completed = questions.filter(
    (question) => progress[question.id]?.completed
  ).length;

  const favorites = questions.filter(
    (question) => progress[question.id]?.favorite
  ).length;

  const percentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const getRoundStats = (type) => {
    const roundQuestions = questions.filter(
      (question) => question.type === type
    );

    const roundCompleted = roundQuestions.filter(
      (question) => progress[question.id]?.completed
    ).length;

    const roundPercentage =
      roundQuestions.length > 0
        ? Math.round(
            (roundCompleted / roundQuestions.length) * 100
          )
        : 0;

    return {
      total: roundQuestions.length,
      completed: roundCompleted,
      percentage: roundPercentage
    };
  };

  const javascript = getRoundStats("javascript");
  const coding = getRoundStats("coding");
  const hr = getRoundStats("hr");
  const react = getRoundStats("react");

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title-row">
            <BarChart3 size={25} />
            <h1>Analytics</h1>
          </div>

          <p>
            Track your interview preparation progress.
          </p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <span>Total Questions</span>
          <strong>{total}</strong>
        </div>

        <div className="analytics-card">
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>

        <div className="analytics-card">
          <span>Favorites</span>
          <strong>{favorites}</strong>
        </div>

        <div className="analytics-card">
          <span>Overall Progress</span>
          <strong>{percentage}%</strong>
        </div>
      </div>

      <div className="analytics-section">
        <h2>Round Progress</h2>

        <AnalyticsRow
          title="javascript"
          stats={javascript}
        />

        <AnalyticsRow
          title="Coding"
          stats={coding}
        />
        <AnalyticsRow
          title="React"
          stats={react}
        />

        <AnalyticsRow
          title="HR"
          stats={hr}
        />
      </div>
    </div>
  );
}

function AnalyticsRow({ title, stats }) {
  return (
    <div className="analytics-row">
      <div className="analytics-row-top">
        <div>
          <strong>{title}</strong>
          <span>
            {stats.completed} / {stats.total} completed
          </span>
        </div>

        <strong>{stats.percentage}%</strong>
      </div>

      <div className="analytics-progress">
        <div
          className="analytics-progress-fill"
          style={{
            width: `${stats.percentage}%`
          }}
        />
      </div>
    </div>
  );
}

export default Analytics;