
import { SearchX } from "lucide-react";

function EmptyState() {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        <SearchX size={35} />
      </div>

      <h3>
        No questions found
      </h3>

      <p>
        Try changing your search or filters.
      </p>

    </div>
  );
}

export default EmptyState;
