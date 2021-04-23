import React, { useEffect, useState } from 'react'
import paths from '../routes/paths';
import { Link } from 'react-router-dom';
import { requestHomeWorld } from '../servises/API'
import {getFavFromLocalStorage, setOrRemoveFavInLocalStorage} from '../servises/localStorage'
import { Box, Checkbox, FormControlLabel, Paper, Tooltip, Typography } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import defImgSW from '../img/defImgSW.jpg'

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
