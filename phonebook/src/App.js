import { useState, useEffect } from "react";
import contactsServices from "./services/contactsServices";

import Filter from "./components/filter";
import ContactForm from "./components/contactform";
import Contacts from "./components/contacts";
import Message from "./components/message";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    contactsServices.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addNewName = (event) => {
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const personToChange = persons.find((person) => person.name === newName);
    const changedPerson = { ...personToChange, number: newNumber };
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName) === true) {
      if (
        window.confirm(
          newName +
            " is already added to the phonebook, replace the old number with a new one?"
        ) === true
      ) {
        contactsServices
          .update(personToChange.id, changedPerson)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            setSuccessMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          });
        contactsServices.getAll().then((response) => {
          setPersons(response.data);
        });
        setSuccessMessage(`Updated the details of ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        return;
      }
    } else {
      setPersons(persons.concat(newPerson));
      setSuccessMessage(`Added ${newName}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");

      contactsServices.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
      });
    }
  };

  const filtered = persons.filter((person) => {
    if (person.name === undefined || filter === undefined) {
      return;
    } else {
      return person.name.toLowerCase().includes(filter.toLowerCase());
    }
  });

  const handleDelete = (event) => {
    const idDelete = event.target.id;
    const nameDelete = event.target.name;
    console.log(nameDelete);

    if (window.confirm(`Are you sure you want to delete "${nameDelete}"?`)) {
      contactsServices.deletePerson(idDelete).then((response) => {
        return response.data;
      });
      contactsServices.getAll().then((response) => {
        setPersons(response.data);
      });
      setSuccessMessage(`Deleted ${nameDelete}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message successMessage={successMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <ContactForm
        addNewName={addNewName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Contacts
        persons={persons}
        filtered={filtered}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
