import Filter from './components/Filter'
import Numbers from './components/Number'
import PersonForm from './components/PersonForm'
import { useState, useEffect } from 'react'
import People from './Services/People'

const App = () => {
  const [personas, setPersonas] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    People.getAll().then(response => {
      setPersonas(response);
      console.log(response);
    });
  }, []);

  const deletePersona = (id) => {
    const persona = personas.find(persona => persona.id === id);
    if (window.confirm(`Delete ${persona.name}?`)) {
      People.remove(id).then(response => {
        setPersonas(personas.filter(persona => persona.id !== id));
      });
    }
  };

  const addPersona = (event) => {
    event.preventDefault();
    const existingPersona = personas.find(persona => persona.name === newName);
    if (existingPersona) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const updatedPersona = { ...existingPersona, number: newNumber };
        People.update(existingPersona.id, updatedPersona).then(response => {
          setPersonas(personas.map(persona => persona.id !== existingPersona.id ? persona : response));
          setNewName('');
          setNewNumber('');
        });
      }
    } else {
      const personaObject = {
        name: newName,
        number: newNumber
      };
      People.create(personaObject).then(response => {
        setPersonas(personas.concat(response));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personasToShow = filter
    ? personas.filter(persona => persona.name.toLowerCase().includes(filter.toLowerCase()))
    : personas;

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <h3>Add a new</h3>
        <PersonForm
          addPerson={addPersona}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
       
        <h3>Numbers</h3>
        <Numbers personasToShow={personasToShow} deletePersona={deletePersona} />
      </div>
    </>
  )
}

export default App;