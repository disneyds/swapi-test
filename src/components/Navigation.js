import React from 'react';
import paths from '../routes/paths';
import { useHistory, useLocation } from 'react-router';
import { Box, Button, ButtonGroup } from '@material-ui/core';

export default function Navigation() {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <Box p={3}>
      <ButtonGroup
        fullWidth
        variant="text"
        aria-label="text primary button group"
      >
        <Button
          variant={pathname === paths.HOME ? 'contained' : 'text'}
          onClick={() => {
            history.push(paths.HOME);
          }}
        >
          HomePage
        </Button>

        <Button
          onClick={() => {
            history.push(paths.FAVORITES);
          }}
          variant={pathname === paths.FAVORITES ? 'contained' : 'text'}
        >
          Favorites
        </Button>
      </ButtonGroup>
    </Box>
  );
}