import { useState, useEffect, use } from 'react'
import Countries from './components/Countries'
import axios from 'axios'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <Countries search={search} countries={countries} />
    </div>
  )
}

export default App
