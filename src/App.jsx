import Filter from './components/Filter';
import Numbers from './components/Numbers';
import PersonForm from './components/PersonForm';
import { useState, useEffect } from 'react';
import People from './Services/People';
import './styles.css';

const App = () => {
  const [personas, setPersonas] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(null); // Mensaje de error
  const [deleteMessage, setDeleteMessage] = useState(null); // Mensaje de eliminación

  useEffect(() => {
    People.getAll().then(response => {
      setPersonas(response);
      console.log(response);
    });
  }, []);

  const deletePersona = (id) => {
    const persona = personas.find(persona => persona.id === id);
    if (window.confirm(`Delete ${persona.name}?`)) {
      People.remove(id)
        .then(response => {
          setPersonas(personas.filter(persona => persona.id !== id));
          setDeleteMessage(`${persona.name} deleted`); // Mensaje de eliminación
          setTimeout(() => setDeleteMessage(null), 5000); // Limpiar el mensaje después de 5 segundos
        })
        .catch(error => {
          setErrorMessage(`Information of ${persona.name} has already been removed from server`); // Mensaje de error
          setTimeout(() => setErrorMessage(null), 5000); // Limpiar el mensaje después de 5 segundos
        });
    }
  };

  const addPersona = (event) => {
    event.preventDefault();
    const existingPersona = personas.find(persona => persona.name === newName);
    
    if (existingPersona) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const updatedPersona = { ...existingPersona, number: newNumber };
        People.update(existingPersona.id, updatedPersona)
          .then(response => {
            setPersonas(personas.map(persona => persona.id !== existingPersona.id ? persona : response));
            setNewName('');
            setNewNumber('');
            setSuccessMessage(`Information of ${newName} has been updated.`); // Mensaje de éxito
            setTimeout(() => setSuccessMessage(null), 5000); // Limpiar el mensaje después de 5 segundos
          })
          .catch(error => {
            setErrorMessage(`Failed to update the number of ${newName}. The person may have been deleted.`); // Mensaje de error
            setTimeout(() => setErrorMessage(null), 5000); // Limpiar el mensaje después de 5 segundos
          });
      }
    } else {
      if (newNumber.trim() === '') {
        setErrorMessage('Please enter a valid number'); // Mensaje de error si el número está vacío
        return;
      }
      const personaObject = { name: newName, number: newNumber };
      People.create(personaObject).then(response => {
        setPersonas(personas.concat(response));
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`${newName} added`); // Mensaje de éxito
        setTimeout(() => setSuccessMessage(null), 5000); // Limpiar el mensaje después de 5 segundos
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
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Mostrar mensaje de éxito */}
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar mensaje de error */}
        {deleteMessage && <div className="delete-message">{deleteMessage}</div>} {/* Mostrar mensaje de eliminación */}
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
  );  
}

export default App;