import axios from 'axios';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${process.env.OPENWEATHER_API_KEY}`);
  return res.data;
});