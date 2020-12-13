import React from 'react';
import { Button, ButtonGroup, FormLabel, Grid } from '@material-ui/core';
import { useDensity } from '../context/ThemeContext';

const DensitySwitcher = (props) => {
  const [dense, setDensity] = useDensity();
  return (
    <Grid item container justify="space-between" alignItems="stretch" xs={12} sm={12} md={6}>
      <Grid item xs={2}><FormLabel>Density&nbsp;</FormLabel></Grid>
      <Grid item xs={10}>
        <ButtonGroup color="primary">
          <Button disableElevation onClick={() => setDensity(false)} variant={dense ? "outlined" : "contained"}>
            Default
          </Button>
          <Button disableElevation onClick={() => setDensity(true)} variant={!dense ? "outlined" : "contained"}>
            Dense
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
export default DensitySwitcher;