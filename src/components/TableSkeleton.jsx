function TableSkeleton({ rows = 6 }) {
  return (
    <div className="table-skeleton">

      {Array.from({ length: rows }).map(
        (_, index) => (
          <div
            className="table-skeleton-row"
            key={index}
          >
            <div className="skeleton table-cell small" />

            <div className="skeleton table-cell question" />

            <div className="skeleton table-cell round" />

            <div className="skeleton table-cell difficulty" />

            <div className="skeleton table-cell category" />

            <div className="skeleton table-cell actions" />
          </div>
        )
      )}

    </div>
  );
}

export default TableSkeleton;