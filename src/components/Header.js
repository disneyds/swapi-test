import React from 'react'
import Theme from './Theme'
import Navigation from './Navigation'
import { AppBar, Container, Grid, Toolbar, Typography } from '@material-ui/core'

export default function Header({darkState,handleThemeChange}) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container maxWidth="md">
          <Grid
            container
            direction="row"
            justify="space-around"
              alignItems="center"
          >
            <Navigation/>
            <Typography align='center' variant='h5'>And whose side are you on?</Typography>
            <Theme darkState={darkState} handleThemeChange={handleThemeChange}/>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
    )
}
