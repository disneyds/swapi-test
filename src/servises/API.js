import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api';


export async function requestCharacters(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/people?page=${page}`);
  return data;
}

export async function requestPlanets(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/planets?page=${page}`);
  return data;
}

export async function requestHomeWorld(url) {
    const { data } = await axios.get(`${url}`);
  return data;
}

export async function requestFilms(url) {
    const { data } = await axios.get(`${url}`);
  return data;
}

export async function requestVehicles (url) {
    const { data } = await axios.get(`${url}`);
  return data;
}

export async function requestFavorites(url) {
    const { data } = await axios.get(`${url}`);
  return data;
}

