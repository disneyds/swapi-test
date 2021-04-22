import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles'
import React, { useState } from 'react'

export default function Theme({childrens}) {
    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    // const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
    // const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
    const darkTheme = createMuiTheme({
        palette: {
        type: palletType,
        primary: {
            // main: mainPrimaryColor
        },
        secondary: {
            // main: mainSecondaryColor
        }
        }
    });

    // const handleThemeChange = () => {
    //     setDarkState(!darkState);
    // };
    
    return <>
        <ThemeProvider theme={darkTheme}>
{childrens}
        </ThemeProvider>
    </>
}
