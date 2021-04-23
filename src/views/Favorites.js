import { Backdrop, Box, CircularProgress, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import CharacterList from '../components/CharacterList';
import { requestFavorites } from '../servises/API';
import { getFavFromLocalStorage } from '../servises/localStorage';

const useStyles = makeStyles((theme) => ({
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));

export default function Favorits() {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
        async function favoritesCharacters() {
        const localFav = getFavFromLocalStorage()
        const favorites = localFav === null ? [] : localFav
        await favorites.map(favChar => requestFavorites(favChar)
            .then(char => setCharacters(prev=>{
                const isInPrev = prev.find(({name})=>name===char.name)
                if (isInPrev) return prev
                return [...prev, char]
            })
        ))
        setOpen(!open)
    }
    favoritesCharacters()
    }, [characters])
    return (
        <>
        <Paper  elevation={3}>
            <Box mt={9} p={3}>
                <CharacterList characters={characters} />
            </Box>
        </Paper>
        <Backdrop className={classes.backdrop} open={open} >
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
    )
}
