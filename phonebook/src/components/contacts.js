const Contacts = ({ persons, filtered, handleDelete }) => {
  return (
    <div>
      <ul>
        {filtered.map((person) => {
          return (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button name={person.name} id={person.id} onClick={handleDelete}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contacts;
