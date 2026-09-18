import { useEffect, useState } from "react";

const initialForm = {
  number: "",
  type: "javascript",
  number: "",
  answer: "",
  code: "",
  category: "",
  difficulty: "Easy",
  tags: ""
};

function AdminQuestionForm({
  editingQuestion,
  onSubmit,
  onCancel
}) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingQuestion) {
      setForm({
        number: editingQuestion.number || "",
        type: editingQuestion.type || "javascript",
        question: editingQuestion.question || "",
        answer: editingQuestion.answer || "",
        code: editingQuestion.code || "",
        category: editingQuestion.category || "",
        difficulty:
          editingQuestion.difficulty || "Easy",
        tags: editingQuestion.tags?.join(", ") || ""
      });
    } else {
      setForm(initialForm);
    }
  }, [editingQuestion]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.question.trim()) {
      alert("Question is required.");
      return;
    }

    if (!form.answer.trim()) {
      alert("Answer is required.");
      return;
    }

    try {
      setSaving(true);

      const questionData = {
        number: form.number
          ? Number(form.number)
          : null,

        type: form.type,

        question: form.question.trim(),

        answer: form.answer.trim(),

        code: form.code.trim(),

        category: form.category.trim(),

        difficulty: form.difficulty,

        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      };

      await onSubmit(questionData);

      if (!editingQuestion) {
        setForm(initialForm);
      }
    } catch (error) {
      console.error("Error saving question:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      className="admin-question-form"
      onSubmit={handleSubmit}
    >
      <div className="admin-form-header">
        <div>
          <h2>
            {editingQuestion
              ? "Edit Question"
              : "Add Question"}
          </h2>

          <p>
            {editingQuestion
              ? "Update the question details."
              : "Create a new interview question."}
          </p>
        </div>
      </div>

      <div className="admin-form-grid">
        <div className="form-group">
          <label>Question Number</label>

          <input
            type="number"
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="Example: 6"
          />
        </div>

        <div className="form-group">
          <label>Round</label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="javascript">Javascript</option>
            <option value="coding">Coding</option>
            <option value="react">React</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div className="form-group">
          <label>Difficulty</label>

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="React / JavaScript/ React / HR"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Question *</label>

        <textarea
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Enter interview question..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Answer *</label>

        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          placeholder="Enter answer..."
          rows="7"
        />
      </div>

      <div className="form-group">
        <label>Code</label>

        <textarea
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Optional coding solution..."
          rows="8"
        />
      </div>

      <div className="form-group">
        <label>Tags</label>

        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="react, hooks, javascript"
        />

        <small>
          Separate tags with commas.
        </small>
      </div>

      <div className="admin-form-actions">
        {editingQuestion && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="admin-submit-btn"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : editingQuestion
              ? "Update Question"
              : "Add Question"}
        </button>
      </div>
    </form>
  );
}

export default AdminQuestionForm;