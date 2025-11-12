function Card({ avatar, title, content, small }) {
  return (
    <div className="card">
      <div className="avatar">{avatar}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{content}</p>
        {small && <p className="small">{small}</p>}
      </div>
    </div>
  );
}

export default Card;
