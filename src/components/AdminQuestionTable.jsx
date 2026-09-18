import {
  Edit,
  Trash2
} from "lucide-react";

function AdminQuestionTable({
  questions,
  onEdit,
  onDelete
}) {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Round</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((question, index) => (
            <tr key={question.id}>
              <td>
                {question.number ?? index + 1}
              </td>

              <td>
                <div className="admin-question-title">
                  {question.question}
                </div>
              </td>

              <td>
                <span className="admin-type">
                  {question.type}
                </span>
              </td>

              <td>
                <span
                  className={`difficulty ${question.difficulty?.toLowerCase()}`}
                >
                  {question.difficulty}
                </span>
              </td>

              <td>
                {question.category || "-"}
              </td>

              <td>
                <div className="admin-actions">
                  <button
                    className="admin-edit-btn"
                    onClick={() => onEdit(question)}
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    className="admin-delete-btn"
                    onClick={() =>
                      onDelete(question.id)
                    }
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminQuestionTable;