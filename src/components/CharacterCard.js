import { Box, Fab, Paper, Tooltip, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import paths from '../routes/paths';
import { requestHomeWorld } from '../servises/API'
import defImgSW from '../img/defImgSW.jpg'
import { Favorite } from '@material-ui/icons';
import {setOrRemoveFavInLocalStorage} from '../servises/localStorage'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  like: {
    position: 'absolute',
        bottom: '100px',
     right: '25px',
    },
    image: {
    position: 'relative'
}
});

export default function CharacterCard({ character, avatar }) {
    const classes = useStyles();
    const [homeWorld, setHomeWorld] = useState('');
    requestHomeWorld(character.homeworld).then(res => setHomeWorld(res.name))
    return <Tooltip title={character.name} arrow>
        <Box className={classes.image}>
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
        <Fab className={classes.like} onClick={() => { setOrRemoveFavInLocalStorage(character.url) }} aria-label="like" size='small'>
             <Favorite />
        </Fab>
        </Box>
        </Tooltip>
}
