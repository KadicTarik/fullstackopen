const PersonList = (props) => {
    //console.log(props.persons[0].name)
    const allPerson = props.persons.map(person => {return <Person key={person.name} person={person}/>})
    //console.log(allPerson)
    return (
      <div>
        {allPerson}
      </div>
    )
  }
  
  const Person = (props) => {
    //console.log(props)
    return (
      <div>
        <p>{props.person.name} {props.person.number}</p>
      </div>
    )
  }

export default PersonList