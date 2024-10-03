
const Numbers = ({ personasToShow, deletePersona}) => {
    return (
        <ul>
            {personasToShow.map((persona) => (
                <li key={persona.id}>
                    {persona.name} {persona.number}
                    <button onClick={() => deletePersona(persona.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

export default Numbers;
