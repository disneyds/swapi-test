import React, { useEffect, useState } from 'react'
import paths from '../routes/paths';
import { Link } from 'react-router-dom';
import { requestHomeWorld } from '../servises/API'
import {getFavFromLocalStorage, setOrRemoveFavInLocalStorage} from '../servises/localStorage'
import { Box, Checkbox, FormControlLabel, IconButton, Paper, Tooltip, Typography } from '@material-ui/core'
import { Favorite, FavoriteBorder, PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import defImgSW from '../img/defImgSW.jpg'

const useStyles = makeStyles({
  like: {
    position: 'absolute',
    bottom: '30px',
    right: '5px',
  },
  avatar: {
    position: 'absolute',
    bottom: '28px',
    left: '15px',
  },
  card: {
    position: 'relative',
    },
  image: {
      width: '240px',
  },
  input: {
    display: 'none',
  },
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
        <Box className={classes.card}>
        <Link to={{ pathname: `${paths.CHARACTER(character.name)}` }}>
            <Paper elevation={3}>
                <Box m={1} p={2} textAlign='center'>
                <img className={classes.image} alt='avatar' src={avatar || defImgSW} />
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
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
        <IconButton className={classes.avatar} color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        </label>   
        </Box>
    </Tooltip>
}
