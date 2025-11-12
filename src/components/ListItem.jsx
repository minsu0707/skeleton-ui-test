function ListItem({ avatar, name, content }) {
  return (
    <div className="list-item">
      <div className="avatar-small">{avatar}</div>
      <div className="list-content">
        <strong>{name}</strong>
        <p className="small">{content}</p>
      </div>
    </div>
  );
}

export default ListItem;
