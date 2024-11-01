const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                Name: <input value={newName} onChange={handleNameChange} />
            </div>
            <br />
            <div>
                Number <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <br/>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm;