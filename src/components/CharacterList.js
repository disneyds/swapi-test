import { Grid } from '@material-ui/core'
import CharacterCard from './CharacterCard'

export default function CharacterList({ characters }) {
    return<>
        <Grid container spacing={2} justify="center" alignItems="center">
            {characters.map((character) => {
                return <Grid key={character.url} item xs={3}>
                            <CharacterCard character={character}/>
                        </Grid>
                })
            }
        </Grid>
        </>
}
