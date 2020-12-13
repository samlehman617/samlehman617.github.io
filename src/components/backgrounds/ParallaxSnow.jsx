import React, { Component } from 'react';

// Theme
import { withStyles } from '@material-ui/core/styles';
import AcUnitIcon from '@material-ui/icons/AcUnit';

import { debug } from '../../App';

function multipleBoxShadow(n, color) {
  let boxShadow = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px ${color}`;
  // let boxShadow = '';
  for (let i = 0; i < n; i++) {
    const offsetX = Math.floor(Math.random() * 2000);
    const offsetY = Math.floor(Math.random() * 2000);
    const value = `${offsetX}px ${offsetY}px ${color}`;
    boxShadow = `${boxShadow}, ${value}`;
  }
  console.debug('Shadow', boxShadow);
  return boxShadow;
}

class ParallaxSnow extends Component {
  constructor(props) {
    super(props);
    if (debug) console.group("Parallax Snow");
    if (debug) console.log(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div id="flakes1" className={classes.flakes1} />
        <div id="flakes2" className={classes.flakes2} />
        <div id="flakes3" className={classes.flakes3} />
      </>
    );
  }
}
ParallaxSnow.shortname = "snow";
ParallaxSnow.icon = AcUnitIcon;
ParallaxSnow.args = {
  color: {
    description: "Color of the snow",
    values: ["primary", "secondary", "paper", "white"],
  },
  speed: {
    description: "Rate of snowfall",
    values: [10],
    min: 5,
    max: 100,
    step: 5,
  },
};
export default withStyles((theme) => ({
  flakes1: {
    width: 2,
    height: 2,
    borderRadius: '50%',
    background: 'transparent',
    boxShadow: multipleBoxShadow(700, theme.palette.primary.main),
    animation: '$snowfall 150s linear infinite',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 2000,
      width: 2,
      height: 2,
      borderRadius: '50%',
      boxShadow: multipleBoxShadow(700, theme.palette.primary.main),
      background: 'transparent',
    },
  },
  flakes2: {
    width: 3,
    height: 3,
    borderRadius: '50%',
    background: 'transparent',
    boxShadow: multipleBoxShadow(200, theme.palette.primary.main),
    animation: '$snowfall 100s linear infinite',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 2000,
      width: 3,
      height: 3,
      borderRadius: '50%',
      boxShadow: multipleBoxShadow(200, theme.palette.primary.main),
      background: 'transparent',
    },
  },
  flakes3: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    background: 'transparent',
    boxShadow: multipleBoxShadow(100, theme.palette.primary.main),
    animation: '$snowfall 50s linear infinite',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 2000,
      width: 4,
      height: 4,
      borderRadius: '50%',
      boxShadow: multipleBoxShadow(100, theme.palette.primary.main),
      background: 'transparent',
    },
  },
  '@keyframes snowfall': {
    from: {
      transform: 'translateY(-2000px)',
    },
    to: {
      transform: 'translateY(0px)',
    },
  },
}))(ParallaxSnow);
