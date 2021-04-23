import { Box, Checkbox, Fab, FormControlLabel, Paper, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import paths from '../routes/paths';
import { requestHomeWorld } from '../servises/API'
import defImgSW from '../img/defImgSW.jpg'
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import {getFavFromLocalStorage, setOrRemoveFavInLocalStorage} from '../servises/localStorage'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  like: {
    position: 'absolute',
        bottom: '30px',
     right: '5px',
    },
    image: {
    position: 'relative'
}
});

export default function CharacterCard({ character, avatar }) {
    const classes = useStyles();
    const [homeWorld, setHomeWorld] = useState('');
    const [checked, setChecked] = useState(false)
    const [update, setUpdate] = useState(1)
    requestHomeWorld(character.homeworld).then(res => setHomeWorld(res.name))

    useEffect(() => {
        const favData = getFavFromLocalStorage()
        setChecked(Boolean(favData.find(fav => fav === character.url)))
        console.log(update);
    }, [update])

    return <Tooltip title={character.name} arrow>
        <Box className={classes.image}>
        <Link to={{ pathname: `${paths.CHARACTER(character.name)}` }}>
        <Paper elevation={3}>
            <Box m={1} p={2} textAlign='center'>
            <img width='240px' alt='avatar' src={avatar || defImgSW} />
            <Typography>Name: {character.name}</Typography>
            <Typography>Gender: {character.gender !== "n/a" ? character.gender : 'creature'}</Typography>
            <Typography>Home World: {homeWorld}</Typography>
            </Box>
        </Paper>
        </Link>
        {/* <Fab className={classes.like} onClick={() => { setOrRemoveFavInLocalStorage(character.url) }} aria-label="like" size='small'>
             <Favorite />
        </Fab> */}
        <FormControlLabel
            className={classes.like}
            control={<Checkbox icon={<FavoriteBorder />} 
            onChange={() => { 
                setOrRemoveFavInLocalStorage(character.url)
                setUpdate(update + 1)
            }}
             checked= {checked}
            checkedIcon={<Favorite />} 
            />}
        />
        </Box>
        </Tooltip>
}
