import { Box, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import paths from '../routes/paths';
import { requestHomeWorld } from '../servises/API'
import defImgSW from '../img/defImgSW.jpg'


export default function CharacterCard({ character, avatar }) {
    const [homeWorld, setHomeWorld] = useState('');
    requestHomeWorld(character.homeworld).then(res => setHomeWorld(res.name))
    return (
        <Link to={{ pathname: `${paths.CHARACTER(character.name)}` }}>
        <Paper elevation={3}>
                <Box m={1} p={2} textAlign='center'>
                <img width='240px' alt='avatar' src={avatar || defImgSW} />
                <Typography>Name: {character.name}</Typography>
                <Typography>Gender: {character.gender !== "n/a" ? character.gender : 'creature'}</Typography>
                <Typography> Home World: {homeWorld}</Typography>
            </Box>
        </Paper>
        </Link>
    )
}
