function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton">

      {/* Header */}

      <div className="skeleton dashboard-title" />
      <div className="skeleton dashboard-subtitle" />


      {/* Stats */}

      <div className="dashboard-stats-skeleton">

        <div className="dashboard-stat-skeleton">
          <div className="skeleton stat-icon" />
          <div className="skeleton stat-number" />
          <div className="skeleton stat-label" />
        </div>

        <div className="dashboard-stat-skeleton">
          <div className="skeleton stat-icon" />
          <div className="skeleton stat-number" />
          <div className="skeleton stat-label" />
        </div>

        <div className="dashboard-stat-skeleton">
          <div className="skeleton stat-icon" />
          <div className="skeleton stat-number" />
          <div className="skeleton stat-label" />
        </div>

        <div className="dashboard-stat-skeleton">
          <div className="skeleton stat-icon" />
          <div className="skeleton stat-number" />
          <div className="skeleton stat-label" />
        </div>

      </div>


      {/* Round cards */}

      <div className="round-skeleton-grid">

        <div className="round-skeleton-card">
          <div className="skeleton round-icon" />
          <div className="skeleton round-title" />
          <div className="skeleton round-text" />
          <div className="skeleton round-progress" />
        </div>

        <div className="round-skeleton-card">
          <div className="skeleton round-icon" />
          <div className="skeleton round-title" />
          <div className="skeleton round-text" />
          <div className="skeleton round-progress" />
        </div>

        <div className="round-skeleton-card">
          <div className="skeleton round-icon" />
          <div className="skeleton round-title" />
          <div className="skeleton round-text" />
          <div className="skeleton round-progress" />
        </div>

      </div>

    </div>
  );
}

export default DashboardSkeleton;