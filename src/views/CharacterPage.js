import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import {requestHomeWorld, requestFilms, requestVehicles} from '../servises/API'
import { Backdrop, Box, CircularProgress, Container, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    },
}));

export default function CharacterPage() {
        
    const [character, setCharacter] = useState({})
    const [homeworld, setHomeworld] = useState({})
    const [vehicles, setVehicles] = useState([])
    const [movies, setMovies] = useState([])
    const [open, setOpen] = useState(true)
    const { name } = useParams()
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            await axios(`https://swapi.dev/api/people/?search=${name}`).then(res => setCharacter(res.data.results[0]))
        }
        fetchData();
        
    }, [name])

    useEffect(() => {
        async function planet() {
            if(character.homeworld) await requestHomeWorld(character.homeworld).then(res=>setHomeworld(res.name))
        }
        planet();
    }, [character.homeworld])

    useEffect(() => {
        async function vehicles() {
            if (character.vehicles) await character.vehicles.map(vehicle => requestVehicles(vehicle)
                .then(res => setVehicles(prev => {
                    if(prev.name === res.name) return prev
                    return [...prev, res] 
                }))
            )
        }
        vehicles();
    }, [character.vehicles])

    useEffect(() => {
        async function films() {
            if (character.films) {
                await character.films.map(film => requestFilms(film)
                    .then(res => setMovies(prev => {
                        if (prev.includes(res.title))
                            return prev
                        return [...prev, res.title]
                    }))
                )
                setOpen(!open)
            }
        }
        films();
    }, [character.films ])
    

    return (
        <>
            <Paper elevation={3}>
                <Container>
                    <Box mt={10} p={3}>
                        <Typography>{`Name: ${character.name}`}</Typography>
                        <Typography>{`Height: ${character.height} sm`}</Typography>
                        <Typography>{`Mass: ${character.mass} kg`}</Typography>
                        <Typography>{`Hair color: ${character.hair_color}`}</Typography>
                        <Typography>{`Skin color: ${character.skin_color}`}</Typography>
                        <Typography>{`Eye color: ${character.eye_color}`}</Typography>
                        <Typography>{`Birth year: ${character.birth_year}`}</Typography>
                        <Typography>{`Gender: ${character.gender }`}</Typography>
                        {homeworld && <Typography >{`Home World: ${homeworld}`}</Typography>} 
                        {vehicles && vehicles.map(({ name, model }) => <Typography key={name} >Name: {name}, Model: {model}</Typography>)}
                        {<Typography >Фильмы: {movies.map(movie => <Typography key={movie} >{movie}</Typography>)}</Typography>}
                    </Box>
            </Container>
            </Paper>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
