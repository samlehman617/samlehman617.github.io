import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTheme, withStyles } from "@material-ui/core";
import WavesIcon from '@material-ui/icons/Waves';

const styles = {
  waves: {
    position: "relative",
    width: "100%",
    marginBottom: -7,
    height: "7vw",
    minHeight: "7vw"
  },
  "@keyframes moveForeverLeft": {
    from: { transform: "translate3d(85px, 0, 0)" },
    to: { transform: "translate3d(-90px, 0, 0)" }
  },
  "@keyframes moveForever": {
    from: { transform: "translate3d(-90px, 0, 0)" },
    to: { transform: "translate3d(85px, 0, 0)" }
  },
  parallaxLeft: {
    "& > use": {
      animation: "$moveForeverLeft 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite",
      animationDelay: props => `-${props.animationNegativeDelay}s`
    }
  },
  parallax: {
    "& > use": {
      animation: "$moveForever 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite",
      animationDelay: props => `-${props.animationNegativeDelay}s`
    }
  }
};

/**
 *  https://codepen.io/csspoints/pen/WNeOEqd
 */
function WaveFooter(props) {
  const id = String(Math.random());
  const {
    className,
    lowerColor,
    upperColor,
    color,
    classes,
    animationNegativeDelay,
    padding,
    waveCount,
    leftToRight,
    ...rest
  } = props;
  const theme = useTheme();
  let wavecolor;
  switch (color) {
    case 'primary':
      wavecolor = theme.palette.primary.main;
      break;
    case 'secondary':
      wavecolor = theme.palette.secondary.main;
      break;
    case 'background':
      wavecolor = theme.palette.background.default;
      break;
    default:
      wavecolor = color;
      break;
  }

  return (
    <div className={className} {...rest}>
      <svg
        className={classes.waves}
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id={id}
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={clsx({
          [classes.parallaxLeft]: leftToRight,
          [classes.parallax]: !leftToRight
        })}>
          <use href={`#${id}`} x="48" y="0" fill={wavecolor} />
        </g>
      </svg>
      <div className={classes.padding} style={{ background: wavecolor, height: `${padding}px` }} />
    </div>
  );
}
WaveFooter.shortname = 'Wave';
WaveFooter.icon = WavesIcon;
WaveFooter.args = {
  color: {
    description: "Color of the footer",
    values: ['primary', 'secondary', 'paper'],
  },
  ltr: {
    description: "Move wave(s) left-to-right or right-to-left.",
    values: [true],
  },
  waves: {
    description: "Number of waves",
    values: [1],
    min: 1,
    max: 5,
    step: 1,
  },
  padding: {
    description: "How much extra space above/below the wave",
    values: [0],
    min: 0,
    max: 300,
    step: 50,
  },
  delay: {
    description: "How many miliseconds to offset the animation by",
    values: [0],
    min: 0,
    max: 1000,
    step: 50,
  },
};
WaveFooter.propTypes = {
  lowerColor: PropTypes.string.isRequired,
  upperColor: PropTypes.string,
  color: PropTypes.string,
  classes: PropTypes.object.isRequired,
  animationNegativeDelay: PropTypes.number,
  leftToRight: PropTypes.bool,
  padding: PropTypes.number,
  waveCount: PropTypes.number
};
WaveFooter.defaultProps = {
  lowerColor: "#533ab7",
  upperColor: "#ffffff",
  color: "secondary",
  animationNegativeDelay: 4,
  leftToRight: true,
  padding: 0,
  waveCount: 1
};
const Wave = withStyles(styles)(WaveFooter);

export { Wave };
export default Wave;
