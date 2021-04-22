import { AppBar, Container, Switch, Toolbar } from '@material-ui/core'
import React from 'react'

export default function Header({darkState,handleThemeChange}) {
    return (
        <AppBar position="absolute">
            <Toolbar>
              <Container maxWidth="md">
                    <Switch checked={darkState} onChange={handleThemeChange} />
                </Container>
            </Toolbar>
        </AppBar>
    )
}
