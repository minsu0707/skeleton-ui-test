function ImageCard({ image, title, content }) {
  return (
    <div className="image-card">
      <div className="image-placeholder">{image}</div>
      <div className="image-card-content">
        <strong>{title}</strong>
        <p className="small">{content}</p>
      </div>
    </div>
  );
}

export default ImageCard;
