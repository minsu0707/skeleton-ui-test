function SkeletonImageCard() {
  return (
    <div className="image-card">
      <div className="skeleton skeleton-image"></div>
      <div className="image-card-content">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text skeleton-text-short"></div>
      </div>
    </div>
  );
}

export default SkeletonImageCard;
