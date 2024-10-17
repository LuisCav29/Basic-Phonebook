const filter = (props) => {
    return (
        <div>
            Filter shown with <input value={props.filter} onChange={props.handleFilterChange} />
        </div>
    )
}

export default filter;