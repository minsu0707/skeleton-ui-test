function SkeletonCard() {
  return (
    <div className="card">
      <div className="skeleton skeleton-avatar"></div>
      <div className="card-content">
        <div className="skeleton skeleton-text skeleton-text-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text skeleton-text-short"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
