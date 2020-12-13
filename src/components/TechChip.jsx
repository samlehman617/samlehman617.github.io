import React, {
  // Component,
  useState
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Material Components
import {
  // Avatar, Button,
  Chip,
  // Icon, IconButton, SvgIcon,
  // Typography,
  // Slide, Zoom,
} from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';

// Returns icon for topic. Checks if each topic string is in category.
const getIconUrl = (topic) => {
  const baseUrl = 'https://icongr.am/';
  let iconSet = 'devicon';
  const icons = [
    // ["vr-cardboard", "aframe", "cardboard", "daydream", "vr"],
    ['amazonaws', 'aws', 'Amazon Web Services'],
    ['android'],
    ['arduino'],
    ['babel', 'babeljs', 'babel.js'],
    ['bootstrap', 'mdbootstrap'],
    ['cplusplus', 'c++', 'C++', 'Cpp', 'cpp'],
    ['chrome'],
    ['css3', 'css'],
    ['creativecommons', 'creative-commons'],
    ['django'],
    ['docker'],
    ['electron'],
    ['eslint'],
    ['flask'],
    ['flutter', 'flutter-sdk'],
    ['firebase', 'firestore'],
    ['github', 'github-actions'],
    ['go', 'golang'],
    ['google'],
    ['googleanalytics', 'google-analytics'],
    ['googlecloud', 'google-cloud'],
    ['gnu'],
    ['graphql', 'graph-ql'],
    ['html5', 'html'],
    ['java'],
    ['javascript', 'js'],
    ['jenkins'],
    // ['json'],
    ['jupyter', 'jupyter-notebook', 'jupyter-notebooks'],
    ['kotlin', 'kotlin-lang'],
    ['linux', 'ubuntu', 'debian', 'archlinux'],
    ['net', 'dotnet', 'dotNET', '.NET', '.net'],
    ['nodejs', 'node', 'npm'],
    ['php'],
    ['powershell'],
    ['python'],
    ['raspberrypi', 'raspberry-pi', 'raspi'],
    ['react', 'reactjs', 'react.js', 'react-js', 'react-native'],
    ['readthedocs'],
    ['redux'],
    ['redis'],
    ['rss'],
    ['ruby'],
    ['rust'],
    ['sass', 'scss', 'sass/scss'],
    ['tensorflow', 'tensorflow.js', 'keras'],
    ['travisci', 'travis', 'travis.ci', 'travis-ci'],
    ['typescript'],
    ['vim', 'vi', 'vimscript', 'viml'],
    ['webcomponent', 'webcomponents', 'web-component', 'webcomponents'],
    ['webpack'],
    ['windows8', 'windows'],
    ['wordpress'],
  ];
  const devicons = [
    ['c'],
    ['cplusplus', 'cpp', 'c++'],
    ['csharp', 'c-sharp', 'c#'],
    ['chrome', 'googlechrome', 'chromeextensions'],
    ['git'],
    ['linux'],
    ['nodejs', 'node', 'node.js', 'node-js'],
    ['php'],
    ['ruby'],

  ];
  const fontawesome = [
    ['link'],
    ['terminal', 'bash', 'zsh', 'sh', 'shell'],
  ];
  const material = [
    ['animation-play', 'animation', 'animated'],
    ['api'],
    ['azure'],
    ['blender-software', 'blender'],
    ['charity'],
    ['console-line', 'zsh'],
    ['draw', 'drawing'],
    ['gate-nor', 'electronics'],
    ['google-cardboard', 'cardboard', 'vr', 'webvr', 'webxr', 'webvr-aframe', 'aframe', 'aframe-vr'],
    ['google-chrome', 'chrome', 'chromium'],
    ['google-controller', 'gamepad-variant', 'game'],
    ['google-assistant', 'assistant', 'google-assistant-sdk', 'google-actions', 'custom-conversations'],
    ['graph', 'graph-theory', 'binary-tree', 'tree'],
    ['chart-bell-curve', 'classification'],
    ['graphql'],
    ['guy-fawkes-mask', 'privacy'],
    ['home-assistant', 'homeassistant', 'hass', 'hassio', 'hass.io', 'hassio-addon', 'hassio-addons'],
    ['image-filter-center-focus-strong', 'image-recognition', 'image-classification', 'mobilenet'],
    ['json'],
    ['kubernetes', 'k8es'],
    ['vector-line', 'lsystem'],
    ['markdown'],
    ['square-root', 'mathematics', 'math'],
    ['memory', 'esp32', 'esp32/8266'],
    ['matrix', 'ml', 'machine-learning', 'machine learning', 'neural-network'],
    ['nintendo-switch', 'supersmashbros.'],
    ['powershell'],
    ['unity'],
    ['unreal'],
    ['variable', 'fractal'],
    ['microsoft-visual-studio', 'visual-studio', 'visual-basic', 'visualbasic', 'vba', 'vba.net'],
    ['microsoft-visual-studio-code', 'visual-studio-code', 'vscode', 'vs-code'],
    ['vuejs', 'vue', 'vue.js', 'vue-js'],
    ['arm-flex', 'weight-lifter', 'lifting', 'strength-training', 'strengthtraining'],
    ['circular-saw', 'woodworking'],
    ['soldering-iron', 'soldering'],
    ['text-recognition', 'dialogflow'],
    ['cpu-64-bit', 'webassembly', 'web-assembly'],
  ];
  for (let catI = 0; catI < icons.length; catI++) {
    if (icons[catI].includes(topic)) {
      iconSet = 'simple';
      return `${baseUrl + iconSet}/${icons[catI][0]}.svg`;
    }
  }
  for (let catI = 0; catI < devicons.length; catI++) {
    if (devicons[catI].includes(topic)) {
      iconSet = 'devicon';
      return `${baseUrl + iconSet}/${devicons[catI][0]}-plain.svg`;
    }
  }
  for (let catI = 0; catI < fontawesome.length; catI++) {
    if (fontawesome[catI].includes(topic)) {
      iconSet = 'fontawesome';
      return `${baseUrl + iconSet}/${fontawesome[catI][0]}.svg`;
    }
  }
  for (let catI = 0; catI < material.length; catI++) {
    if (material[catI].includes(topic)) {
      iconSet = 'material';
      return `${baseUrl + iconSet}/${material[catI][0]}.svg`;
    }
  }
  return `${baseUrl}fontawesome/code.svg`;
};

function TechChip(props) {
  const { classes } = props;
  const theme = useTheme();
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const variant = theme.palette.type === 'dark' ? 'light' : 'main';
  let iconColor;
  let primary = theme.palette.primary[variant].slice(1);
  let secondary = theme.palette.secondary[theme.palette.type].slice(1);
  let contrastText = theme.palette.primary.contrastText.slice(1).repeat(2);


  if (props.color === "primary") {
    if (props.variant === "outlined") iconColor = primary;
    else iconColor = contrastText;
  } else if (props.color === "secondary") {
    if (props.variant === "outlined") iconColor = secondary;
    else iconColor = contrastText;
  } else if (theme.palette.type === 'dark') {
    iconColor = "FFFFFF";
    iconColor = contrastText;
  } else {
    iconColor = primary;
  }

  if (props.iconColor != null && props.iconColor !== undefined) {
    iconColor = props.iconColor.slice(1);
  }

  let color = props.color;
  if (props.color === "default" || props.color === null) color = "primary"
  if (props.color === "primary" || props.color === "secondary") color = "default";

  const query = props.label.replace(/ /g, '').toLowerCase();

  const icon = (
    <img
      alt={query}
      src={`${getIconUrl(query)}?size=${props.iconSize}&color=${iconColor}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://icongr.am/fontawesome/code.svg?size=${props.iconSize}&color=${iconColor}`;
      }}
      style={{
        paddingLeft: 4,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: 4,
      }}
    />
  );


  return (
    <Chip
      className={clsx(props.className, classes.chip, {
        [classes.hoverChip]: (props.hover && hover),
      })}
      color={props.hover ? hover ? color : props.color : props.color}
      icon={props.hasIcon ? icon : null}
      label={theme.textEffect ? theme.textEffect(props.label) : props.label}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      size={props.size}
      variant={props.variant}
    />
  );
};

TechChip.propTypes = {
  // customIcon: PropTypes.bool,
  hasIcon: PropTypes.bool,
  hover: PropTypes.bool,
  iconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  variant: PropTypes.string,
  iconSize: PropTypes.number,
};

TechChip.defaultProps = {
  // customIcon: true,
  hasIcon: true,
  hover: true,
  label: '',
  size: "medium",
  iconSize: 20,
};

export default withStyles((theme) => ({
  chip: {
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[4],
      '& img': {
        filter: 'brightness(0) invert(1)',
      },
    },
  },
  // hoverChip: {
  //   transition: 'all 0.2s',
  //   // boxShadow: theme.shadows[4],
  //   // transform: 'scale(1.05)',
  //   // '& img': {
  //   //   filter: 'brightness(0) invert(1)',
  //   // },
  // },
}))(TechChip);
