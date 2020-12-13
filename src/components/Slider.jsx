// import React from 'react';
// import PropTypes from 'prop-types';
import {
  withStyles,
  // makeStyles
} from '@material-ui/core/styles';
import { Slider as DefaultSlider } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import Tooltip from '@material-ui/core/Tooltip';


export const Slider = withStyles(({ palette, spacing }) => ({
  root: {
    color: palette.primary.main,
    height: 8,
    width: `calc(100% - ${spacing(2)}px)`,
    marginLeft: spacing(1),
    // marginLeft: 30,
    // marginRight: 30,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(DefaultSlider);
export default Slider;