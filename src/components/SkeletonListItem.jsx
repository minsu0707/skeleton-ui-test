function SkeletonListItem() {
  return (
    <div className="list-item">
      <div className="skeleton skeleton-avatar-small"></div>
      <div className="list-content">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text skeleton-text-short"></div>
      </div>
    </div>
  );
}

export default SkeletonListItem;
