import { useEffect, useState } from "react"
import axios from "axios"

const CountryInfo = ({countries, show}) => {
    if (show === false) {
        return null
    }

    const langs = Object.values(countries.languages)

    return (
        <div>
            <h1>{countries.name.common}</h1>
            <p>Capital {countries.capital}</p>
            <p>Area {countries.area}</p>
            <h1>Languages</h1>
            <ul>
                {langs.map(language => <Languages key={language} language={language} />)}
            </ul>
            <img src={countries.flags.png} alt={countries.flags.alt} />
            <Weather countries={countries} />
        </div>
    )
}

const Weather = ({countries}) => {
    const [weather, setWeather] = useState({temp: null, icon: null, wind: null})
    const api_key = import.meta.env.VITE_SOME_KEY
    useEffect(() =>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${countries.latlng[0]}&lon=${countries.latlng[1]}&appid=${api_key}&units=metric`)
        .then(response => {
            setWeather({
                temp: response.data.main.temp,
                icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                wind: response.data.wind.speed
            })
    })
    }, [])
    return (
        <div>
            <h1>Weather in {countries.capital}</h1>
            <p>Temperature {weather.temp}</p>
            <img src={weather.icon} />
            <p>Wind {weather.wind} m/s</p>
        </div>
    )
    
}

const Languages = (props) => {
    return (
        <li>{props.language}</li>
    )
}

const Country = ({countries}) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div>
            {countries.name.common} <button onClick={handleShow}>Show</button>
            <CountryInfo countries={countries} show={show} />
        </div>
    )
}

const Countries = ({countries, search}) => {
    const searched = () => {
        return (
            countries.filter(countries =>
                countries.name.common.toLowerCase().includes(search.toLowerCase().trim()))
        )
    }

    if (search.trim().length === 0) {
        return <div>Search countries</div>
    } else if (searched().length === 0) {
        return <div>No countries match search parameters</div>
    } else if (searched().length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (searched().length < 10 && searched().length > 1) {
        return (
            <div>
            {searched().map(countries => <Country key={countries.cca2} countries={countries} />)}
            </div>
        )
    } else if (searched().length === 1) {

        const country = searched().map(country => (country))

        return (
            <div>
                {country.map(countries => <CountryInfo key={countries.cca2} countries={countries} />)}
            </div>
        )
    }
}

export default Countries