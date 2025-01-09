import './WeatherApp.css'
import { useState } from 'react'
import nube from './assets/nube.png'
export const WeatherApp = () => {

    const [city, setCity] = useState('') // estado para almacenar la ciudad
    const [weatherData, setWeatherData] = useState(null) // estado para almacenar los datos del clima

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'  // URL base de OpenWeatherMap
    const API_KEY = 'f0bc42a467c6864af1baa488a3f30922' // API Key de OpenWeatherMap 
    const difKelvin = 273.15 // para convertir de Kelvin a grados Celsius, restamos 273.15 a la temperatura en Kelvin
    
    
    const fetchWeatherData = async() => {
        try{
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`) // hacemos una peticion a la API de OpenWeatherMap
            const data = await response.json()
            console.log(data)
            setWeatherData(data) // actualizamos el estado weatherData con los datos obtenidos
        }catch(error){
            console.error("Error al obtener los datos del clima", error)
        }
    }
    
    const handleCityChange = (event) => { // esta funcion es un manejador de eventos que se ejecuta cuando cambia el valor del input
        setCity(event.target.value) // actualizamos el estado city con el valor del input
    }

    const handleSubmit = (event) => { //esta funcion es un manejador de eventos que se ejecuta cuando se envia el formulario
        event.preventDefault() // evitamos que se recargue la pagina
        fetchWeatherData() // llamamos a la funcion fetchWeatherData
    }


    return (
        <div className="container">
            <h1>SKAY<img src={nube} alt="Solecito"></img>BLUE</h1>
            <p>Consulta el clima en tu ciudad</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ciudad" value={city} onChange={handleCityChange}/>
                <button type="submit">buscar</button>
            </form>
            {weatherData &&(
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <img className="ico" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
                    <p>Temperatura: {Math.floor(weatherData.main.temp - difKelvin)}°C - {weatherData.weather[0].description}</p>
                    <p>Humedad: {weatherData.main.humidity}%</p>
                    <p>Viento: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    )
}
