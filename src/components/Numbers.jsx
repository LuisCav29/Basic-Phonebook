const Numbers = ({ personasToShow, deletePersona }) => {
    return (
      <ul>
        {personasToShow.map(persona => (
          <li 
            key={persona.id} 
            style={{ marginBottom: '10px' }} 
          >
            {persona.name} {persona.number}
            <button 
              style={{ marginLeft: '10px' }}
              onClick={() => deletePersona(persona.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
  }
  
  export default Numbers;
  