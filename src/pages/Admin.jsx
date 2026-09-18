import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  Code2,
  Users
} from "lucide-react";

import {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion
} from "../services/questionService";

import AdminQuestionForm from "../components/AdminQuestionForm";
import AdminQuestionTable from "../components/AdminQuestionTable";

import TableSkeleton from "../components/TableSkeleton";

import { useToast } from "../context/ToastContext";

function Admin() {
    const { showToast } = useToast();

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [editingQuestion, setEditingQuestion] =
    useState(null);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [difficultyFilter, setDifficultyFilter] =
    useState("all");

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const data = await getQuestions();

      setQuestions(data);
    } catch (error) {
      console.error(
        "Error loading questions:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        question.question
          ?.toLowerCase()
          .includes(searchText) ||
        question.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesType =
        typeFilter === "all" ||
        question.type === typeFilter;

      const matchesDifficulty =
        difficultyFilter === "all" ||
        question.difficulty ===
          difficultyFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesDifficulty
      );
    });
  }, [
    questions,
    search,
    typeFilter,
    difficultyFilter
  ]);

  const javascriptCount = questions.filter(
    (question) =>
      question.type === "javascript"
  ).length;

  const codingCount = questions.filter(
    (question) =>
      question.type === "coding"
  ).length;
  const reactCount = questions.filter(
    (question) =>
      question.type === "react"
  ).length;

  const hrCount = questions.filter(
    (question) =>
      question.type === "hr"
  ).length;

  const handleAdd = async (questionData) => {
    await addQuestion(questionData);

    await loadQuestions();
    showToast( "Question added successfully")
    setShowForm(false);
  };

  const handleUpdate = async (questionData) => {
    await updateQuestion(
      editingQuestion.id,
      questionData
    );

    await loadQuestions();
    showToast("Question Updated successfully")
    setEditingQuestion(null);
    setShowForm(false);
  };

 const handleDelete = async (questionId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this question?"
  );

  if (!confirmed) return;

  try {
    await deleteQuestion(questionId);

    setQuestions((prev) =>
      prev.filter(
        (question) => question.id !== questionId
      )
    );

    showToast(
      "Question deleted successfully"
    );
  } catch (error) {
    console.error(error);

    showToast(
      "Failed to delete question",
      "error"
    );
  }
};

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleAddClick = () => {
    setEditingQuestion(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleCancel = () => {
    setEditingQuestion(null);
    setShowForm(false);
  };

  return (
    <div className="page admin-page">
      <div className="admin-header">
        <div>
          <h1>Admin Panel</h1>

          <p>
            Manage InterviewIQ questions and
            interview content.
          </p>
        </div>

        <button
          className="admin-add-btn"
          onClick={handleAddClick}
        >
          <Plus size={18} />
          Add Question
        </button>
      </div>

      {/* Statistics */}

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <BookOpen size={20} />
          </div>

          <div>
            <span>Javascript</span>
            <strong>{javascriptCount}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Code2 size={20} />
          </div>
          <div>
            <span>React</span>
            <strong>{reactCount}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Code2 size={20} />
          </div>

          <div>
            <span>Coding</span>
            <strong>{codingCount}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>HR</span>
            <strong>{hrCount}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Plus size={20} />
          </div>

          <div>
            <span>Total</span>
            <strong>{questions.length}</strong>
          </div>
        </div>
      </div>

      {/* Form */}

      {showForm && (
        <AdminQuestionForm
          editingQuestion={editingQuestion}
          onSubmit={
            editingQuestion
              ? handleUpdate
              : handleAdd
          }
          onCancel={handleCancel}
        />
      )}

      {/* Filters */}

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
        >
          <option value="all">
            All Rounds
          </option>

          <option value="javascript">
            JavaScript
          </option>

          <option value="coding">
            Coding
          </option>
          <option value="react">
           React
          </option>

          <option value="hr">
            HR
          </option>
        </select>

        <select
          value={difficultyFilter}
          onChange={(e) =>
            setDifficultyFilter(
              e.target.value
            )
          }
        >
          <option value="all">
            All Difficulty
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>
        </select>
      </div>

      {/* Table */}

      {/* {loading ? (
        <div className="loading-screen">
         <TableSkeleton rows={6} />
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="empty-state">
          <h3>No questions found</h3>

          <p>
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <AdminQuestionTable
          questions={filteredQuestions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )} */}
      {loading ? (
  <TableSkeleton rows={6} />
) : (
  <AdminQuestionTable
    questions={filteredQuestions}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
)}
    </div>
  );
}

export default Admin;