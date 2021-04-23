import { Backdrop, Box, Button, CircularProgress, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import CharacterList from '../components/CharacterList';
import { requestCharacters } from '../servises/API'

const useStyles = makeStyles((theme) => ({
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));

export default function HomePage() {
    
    const classes = useStyles();
    const [characters, setCharacters] = useState([]);
    const [open, setOpen] = useState(true);
    const [page, setPage] = useState(1);

    const loadMore = () => {
        setPage(page + 1)
        setOpen(!open)
    } 

    useEffect(() => {
        async function fatch ()  {
            await requestCharacters(page).then(res => (setCharacters([...characters, ...res.results])))
            setOpen(!open)
        }
        fatch()
    }, [page])   
    
    return (
        <>
            <Paper  elevation={3}>
                <Box mt={9} p={3}>
                    <CharacterList characters={characters} />
                    {!open && <Button
                        fullWidth
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={loadMore}
                    >
                        Load More
                    </Button>}
                </Box>
                
            </Paper>
            
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
        </>
    )
}
