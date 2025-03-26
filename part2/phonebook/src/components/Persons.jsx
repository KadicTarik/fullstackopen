const Person = (props) => {
  return (
    <div>
      {props.persons.name} {props.persons.number} <button onClick={props.handleRemove}>delete</button>
    </div>
  )
}

const Persons = (props) => {
  const searched = () => {
    return (
      props.persons.filter(persons => 
        persons.name.toLowerCase().includes(props.search.toLowerCase().trim()))
    )
  }
  
  const toShow = props.search.trim().length === 0 ? props.persons : searched()
  
  return (
      <div>
          {toShow.map(persons => <Person persons={persons} key={persons.id} handleRemove={() => props.handleRemove(persons.id)}/>)}
      </div>
  )
}

export default Persons 