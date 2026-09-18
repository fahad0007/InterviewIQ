import { useEffect, useState } from "react";
import {
  BookOpen,
  Code2,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
  Trophy
} from "lucide-react";

import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";

import { getQuestions } from "../services/questionService";
import { useProgress } from "../context/ProgressContext";

import DashboardSkeleton from "../components/DashboardSkeleton";

function Dashboard() {
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
      <DashboardSkeleton />
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
    total > 0
      ? Math.round((completed / total) * 100)
      : 0;

  const getRoundData = (type) => {
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

  const javascript = getRoundData("javascript");
  const coding = getRoundData("coding");
  const hr = getRoundData("hr");
  const react = getRoundData("react");

  return (
    <div className="page">

         <section className="hero-section">

        <div>
  <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Track your interview preparation and keep
            improving every day.
          </p>
        </div>
      </div>
          <span className="hero-badge">
            🚀 Your interview journey starts here
          </span>

          <h1>
            Prepare smarter.
            <br />
            <span>Interview better.</span>
          </h1>

          <p>
            Practice javascript, coding , React and HR questions
            in one organized workspace.
          </p>

        </div>

        <div className="hero-trophy">
          <Trophy size={80} strokeWidth={1.5} />
        </div>


      </section>

      
     

      {/* Overall Progress */}

      <div className="dashboard-progress-card">
        <div className="progress-card-content">
          <div>
            <span className="progress-label">
              Overall Progress
            </span>

            <h2>{percentage}%</h2>

            <p>
              {completed} of {total} questions completed
            </p>
          </div>

          {/* <div className="dashboard-progress-circle">
            <span>{percentage}%</span>
          </div> */}
          <div
            className="progress-circle"
            style={{
              "--progress": `${percentage}%`
            }}
          >
            <span>{percentage}%</span>
          </div>
        </div>

        <div className="dashboard-progress-bar">
          <div
            style={{
              width: `${percentage}%`
            }}
          />
        </div>
      </div>

      {/* Stats */}

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <BookOpen size={20} />
          </div>

          <div>
            <span>Total Questions</span>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">
            <Star size={20} />
          </div>

          <div>
            <span>Favorites</span>
            <strong>{favorites}</strong>
          </div>
        </div>
      </div>

      {/* Rounds */}

      <div className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Interview Rounds</h2>
            <p>Continue your preparation.</p>
          </div>
        </div>

        <div className="round-grid">
          <RoundCard
            title="JavaScript Round"
            description="JavaScript concepts"
            icon={<BookOpen size={22} />}
            stats={javascript}
            path="/javascript"
          />

          <RoundCard
            title="Coding Round"
            description="Practice coding problems"
            icon={<Code2 size={22} />}
            stats={coding}
            path="/coding"
          />
          <RoundCard
            title="React Round"
            description="React concepts"
            icon={<FaReact size={22} />}
            stats={react}
            path="/react"
          />

          <RoundCard
            title="HR Round"
            description="Prepare HR interview questions"
            icon={<Users size={22} />}
            stats={hr}
            path="/hr"
          />
        </div>
      </div>
    </div>
  );
}

function RoundCard({
  title,
  description,
  icon,
  stats,
  path
}) {
  return (
    <div className="round-card">
      <div className="round-card-top">
        <div className="round-icon">
          {icon}
        </div>

        <span>{stats.percentage}%</span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="round-progress">
        <div
          style={{
            width: `${stats.percentage}%`
          }}
        />
      </div>

      <div className="round-card-bottom">
        <span>
          {stats.completed} / {stats.total} completed
        </span>

        <Link to={path}>
          Practice
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;