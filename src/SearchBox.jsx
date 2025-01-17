import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox(){
    let[city,setCity] =useState("");

    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY= "9e9350d3da8b9f4c19631abaf30bf6fd"

    let getWeatherInfo = async () => {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        // console.log(jsonResponse);
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        }
        console.log(result);
    }

    let handleChange =(evt) =>{
            setCity(evt.target.value);
        };

    let handleSubmit =(evt) => {
        evt.preventDefault();
        console.log(city);
        setCity("");
        getWeatherInfo();
    };
    return(
        
        <div className='SearchBox'>
            <form action='get' onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required  value={city} onChange={handleChange}/>
            <br /><br />
            <Button variant="contained" type='submit' >Search</Button>
            </form>
        </div>
    )
}