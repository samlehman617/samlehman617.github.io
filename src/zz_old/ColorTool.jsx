import React, { 
  // useCallback,
  // useContext, 
  // useEffect, 
  // useState 
} from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  withStyles,
} from '@material-ui/core';

import * as colors from '@material-ui/core/colors';

// import ColorDemo from './ColorDemo';
import { 
//   DispatchContext, 
  // useChangeTheme,
  // useChangePrimaryColor,
  // useChangeSecondaryColor,
  // useChangePaperColor,
  // useChangeBackgroundColor
} from './ThemeContext3';

// import { usePaletteColors } from './ThemeContext';
import ColorBar from '../components/theming/ColorBar';
// import ColorPicker, {
//   // ColorSelector
// } from './ColorPicker';

import { debug } from '../App';

const hues = Object.keys(colors)
  // .slice(1, 17);
const shades = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 'A700', 'A400', 'A200', 'A100'];
const greys = colors['grey'];
// if (debug) console.log (Object.keys(colors), Object.keys(colors).length);

const debugColors = () => {
  console.group("COLORTOOL");
  console.group("Colors:");
  console.log("All   :", Object.keys(colors), colors);
  console.log("Used  :", hues);
  console.log("Shades:", shades);
  console.log("Grays: ", greys);
  console.groupEnd();
}
if (debug) debugColors();

const styles = (theme) => ({
  radio: {
    padding: 0,
    margin: 0,
    // overflow: 'hidden', // Makes color radios round for some reason?
  },
  radioIcon: {
    width: 32,
    height: 32,
    maxHeight: 32,
    margin: 0,
  },
  radioIconSelected: {
    width: 32,
    height: 32,
    border: '1px solid white',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatch: {
    // width: 200,
    width: 'fit-content',
    border: `1px solid ${theme.palette.background.paperSolid}`,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
});


// const PrimaryColorPicker = () => {
//   return (
//     <ColorPicker hues={hues} shades={shades} variant="primary" handleChange={useChangePrimaryColor}/>
//   );
// };
// const SecondaryColorPicker = () => {
//   return (
//     <ColorPicker hues={hues} shades={shades} variant="secondary" handleChange={useChangeSecondaryColor}/>
//   );
// };
// const PaperColorPicker = () => {
//   return (
//     <ColorPicker hues={Object.keys(colors)} shades={shades} variant="paper" handleChange={useChangePaperColor}/>
//   );
// };

function ColorTool(props) {
  const { classes } = props;

  return (
    <Grid container spacing={5} className={classes.root}>
      {/* <ColorSelector /> */}
      {/* <PrimaryColorPicker /> */}
      {/* <SecondaryColorPicker /> */}
      {/* <PaperColorPicker /> */}
    </Grid>
  );
}
ColorTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export {
  ColorTool,
  ColorBar,
  // PrimaryColorPicker,
  // SecondaryColorPicker,
  // PaperColorPicker,
};
export default withStyles(styles)(ColorTool);