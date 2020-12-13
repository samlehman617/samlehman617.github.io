import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Radio,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import CheckIcon from '@material-ui/icons/Check';
import * as colors from '@material-ui/core/colors';
import ColorBar from './ColorBar';

import { usePrimaryColor, useSecondaryColor } from '../context/ThemeContext';

const globalHues = Object.keys(colors);
const globalShades = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 'A700', 'A400', 'A200', 'A100'];

const pickerStyles = (theme) => ({
  picker: {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    padding: '10px',
  },
  huePicker: {
    position: 'relative',
    display: 'grid',
    gridGap: '0px',
    gridTemplateColumns: 'repeat(7, minmax(20px, 1fr))',
    gridTemplateRows: 'repeat(3, minmax(20px, 1fr))',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    marginBottom: theme.spacing(1),
    width: '100%',
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
    '& > div:nth-of-type(15)': {
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
  },
  shadePicker: {
    position: 'relative',
    display: 'grid',
    gridGap: '0px',
    gridTemplateColumns: 'repeat(7, minmax(20px, 1fr))',
    gridTemplateRows: 'repeat(2, minmax(20px, 1fr))',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    overflow: 'hidden',
    width: '100%',
    boxShadow: theme.shadows[3],
    '& > div:nth-of-type(8)': {
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
    '& > div:nth-of-type(14)': {
      borderBottomRightRadius: theme.shape.borderRadius,
    },
  },
  radio: {
    padding: 0,
    margin: 0,
    borderRadius: 0,
    '&::before': {
      content: '""',
      display: 'block',
      paddingBottom: '100%',
      gridArea: '1 / 1 / 2 / 2',
    },
  },
  radioIcon: {
  },
  button: {
    display: 'grid',
    placeItems: 'center',
    verticalAlign: 'bottom',
    borderStyle: 'solid',
    fontSize: '8px',
    '&::before': {
      content: '""',
      display: 'block',
      paddingBottom: '100%',
      gridArea: '1 / 1 / 2 / 2',
    },
    '&:nth-of-type(1)': {
      borderTopLeftRadius: theme.shape.borderRadius,
    },
    '&:nth-of-type(7)': {
      borderTopRightRadius: theme.shape.borderRadius,
    },
  },
});

const ColorSelector = (props) => {
  // const { classes, variant, state, dispatch } = props;
  const { classes, variant, } = props;
  // eslint-disable-next-line no-unused-vars
  const [color, setColor, setColorHue, setColorShade] = variant === 'primary' ?
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePrimaryColor() :
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSecondaryColor();
  
  const hues   = props.hues   ? props.hues   : globalHues;
  const shades = props.shades ? props.shades : globalShades;

  const [hue,   setHue  ] = useState(hues.indexOf(color.hue));
  const [shade, setShade] = useState(shades.indexOf(color.shade));

  useEffect(() => setColorHue(hues[hue]),       [setColorHue,   hues,   hue  ]);
  useEffect(() => setColorShade(shades[shade]), [setColorShade, shades, shade]);

  const hueSquares = hues.map((hueName, i) => (
      <Tooltip placement="right" title={capitalize(hueName)} key={i}>
        <Radio className={classes.radio}
          style={{ backgroundColor: colors[hues[i]][shades[shade]] }}
          checked={hue === i}
          onChange={()=>setHue(i)}
          aria-labelledby={`tooltip-${variant}-${hue}`}
          icon={<div/>}
          checkedIcon={<CheckIcon style={{ color: '#ffffff', fontSize: 28 }} />}
        />
      </Tooltip>
  ));
  const shadeSquares = shades.map((shadeName, i) => (
      <Tooltip placement="right" title={capitalize(shadeName.toString())} key={i}>
        <Radio className={classes.radio}
          style={{ backgroundColor: colors[hues[hue]][shades[i]] }}
          checked={i === shade}
          onChange={()=>setShade(i)}
          aria-labelledby={`tooltip-${variant}-${shade}`}
          icon={<div/>}
          checkedIcon={<CheckIcon style={{ color: '#ffffff', fontSize: 28 }} />}
        />
      </Tooltip>
  ));

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Typography variant="subtitle2">{capitalize(props.variant)}</Typography>
      <div className={classes.picker}>
        <Typography variant="body2">Hue</Typography>
        <div className={classes.huePicker}>{hueSquares}</div>
        <Typography variant="body2">Shade</Typography>
        <div className={classes.shadePicker}>{shadeSquares}</div>
        <ColorBar />
      </div>
    </Grid>
  );
};
ColorSelector.propTypes = {
  hues: PropTypes.array,
  shades: PropTypes.array,
  variant: PropTypes.oneOf(["primary", "secondary", "paper"]),
};
ColorSelector.defaultProps = {
  hues: globalHues.slice(1),
  variant: "primary",
};
export default withStyles(pickerStyles)(ColorSelector);