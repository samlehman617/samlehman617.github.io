import React from 'react';
import {
    Grid,
} from '@material-ui/core';

import DensitySwitcher from '../components/theming/DensitySwitcher';
import SpacingSwitcher from '../components/theming/SpacingSwitcher';
import BorderRadiusSwitcher from '../components/theming/ShapeSwitcher';

const DensityTool = (props) => {
  return (
    <Grid container item alignItems="center" spacing={2}>
      <DensitySwitcher />
      <SpacingSwitcher />
      <BorderRadiusSwitcher />
    </Grid>
  );
}
export default DensityTool;