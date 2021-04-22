import { Container, CssBaseline, Paper } from '@material-ui/core';
import './App.css';
import Header from './components/Header';
import Routes from './routes/Routes';
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import { useState } from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


function App() {
    const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  return <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>

        <Container>
          <Header darkState={darkState} handleThemeChange={handleThemeChange}/>
          <Routes />
        </Container>

    </ThemeProvider>
  </>
   
}

export default App;
