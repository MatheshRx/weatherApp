import axios from 'axios';

export const currentLocationData_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f35723917969d2ffdb6efed8797927b5&units=metric`;

export const cityData_URL = city =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f35723917969d2ffdb6efed8797927b5&units=metric`;

export const ApiCall = url => {
  return axios.get(url);
};
