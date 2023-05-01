const Message = ({ successMessage }) => {
  if (successMessage === null) {
    return null;
  }

  return <div className="message">{successMessage}</div>;
};

export default Message;
