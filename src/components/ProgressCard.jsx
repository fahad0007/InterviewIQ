import { CheckCircle2, Target } from "lucide-react";

function ProgressCard({ total, completed }) {

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="progress-card">

      <div className="progress-info">

        <div className="progress-icon">
          <Target size={20} />
        </div>

        <div>
          <h4>Your Progress</h4>

          <p>
            {completed} of {total} questions completed
          </p>
        </div>

      </div>


      <div className="progress-percentage">
        {percentage}%
      </div>


      <div className="progress-track">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>


      {percentage === 100 && (
        <div className="progress-complete">
          <CheckCircle2 size={15} />
          Round completed!
        </div>
      )}

    </div>
  );
}

export default ProgressCard;