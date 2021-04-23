import { Box, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import CharacterList from '../components/CharacterList';
import { requestFavorites } from '../servises/API';
import { getFavFromLocalStorage } from '../servises/localStorage';

export default function Favorits() {
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
    }
    favoritesCharacters()
    }, [characters])
    return (
        <>
        {characters.length === 0 
        ? <Paper  elevation={3}>
            <Box mt={13} p={3}>
                <Typography align='center' variant='h4'> There is no one here yet! </Typography>
            </Box>
          </Paper>
        :<Paper  elevation={3}>
            <Box mt={9} p={3}>
                <CharacterList characters={characters} />
            </Box>
        </Paper>}
    </>
    )
}