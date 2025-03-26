import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({name: "", number: ""})
  const [search, setSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewPerson(newPerson => ({
      ...newPerson,
      name: event.target.value
    }))
  }

  const handleNumberChange = (event) => {
    setNewPerson(newPerson => ({
      ...newPerson,
      number: event.target.value
    }))
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const oldPerson = persons.find(person => person.name === newPerson.name)
    if (persons.some(e => e.name === newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(oldPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === oldPerson.id ? returnedPerson : person))
            setNewPerson({name: "", number: ""})
          })
          .then(success => {
            setSuccessMessage(`${newPerson.name} has been updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information for ${newPerson.name} was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
  }
  personService
    .create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewPerson({name: "", number: ""})
    })
    .then(message => {
      setSuccessMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
    
  }

  const handleRemoveOf = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .remove(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
      .then(message => {
        setSuccessMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })}
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter search={search}  handleSearchChange={handleSearchChange}/>
      <h1>add a new</h1>
      <PersonForm newPerson={newPerson} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons search={search} persons={persons} handleRemove={handleRemoveOf}/>
    </div>
  )
}

export default App