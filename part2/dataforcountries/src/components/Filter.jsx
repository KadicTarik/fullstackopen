const Filter = (props) => {
    return (
        <div>
            find countries <input value={props.search} onChange={props.handleSearchChange}/>
        </div>
    )
}

export default Filter