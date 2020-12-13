import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


// Material Components
import {
  // Box,
  // Card,
  Fab,
  // Grid, Paper, Typography,
} from '@material-ui/core';

// Styles/Theme
import { useTheme, withStyles } from '@material-ui/core/styles';

// Components
import { Typography as FancyText } from '../components/Typography';
import SocialIcons from '../components/SocialIcons';
// import ScrollToNext from '@components/ScrollToNext';
// import ScrollToPrevious from '@components/ScrollToPrevious';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Images
import Sam from '../assets/images/sam.png';

const LandingSection = (props) => {
  const { classes } = props;
  const theme = useTheme();

  const handleNextClick = (id) => {
    console.log("Scrolling to next...", id);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }

  let text;
  if (typeof theme.textEffect === "function") {
    text = theme.textEffect("Hi, I'm Sam!");
  } else {
    text = "Hi, I'm Sam!";
  }
  // const theme = useTheme();
  // const variant = theme.palette.type == 'dark' ? 'light' : 'main';
  return (
    <div className={classes.page} id="landing">
      <div className={classes.centered}>
        <svg
          className={clsx(classes.svg)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 220"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <path id="IntroPath" d="M 50,160 A 100,100 0 0,1 270,160" />
            <filter id="shadow"><feDropShadow dx="3" dy="3" stdDeviation="10" /></filter>
          </defs>

          <text id="text" fontSize="0rem" className={clsx(classes.curvedText, classes.shadowed)}>
            <textPath
              href="#IntroPath"
              method="align"
              textLength="260"
              startOffset="40"

            // filter="url(#shadow)"
            >
              {text}
            </textPath>
            {/* <animate
                id="EntranceAnimation"
                href="#text"
                attributeName="font-size"
                from="0rem"
                to="3rem"
                // repeatCount="indefinite"
                dur="1s"
              /> */}
          </text>
          <image href={Sam} x="80" y="60" height="160" width="160" />
          <path
            className={clsx(classes.underline, classes.shadowed)}
            d="M 60,217 L 260,217"
            strokeWidth="6"
            strokeLinecap="round"
          // filter="url(#shadow)"
          />
        </svg>
        <FancyText
          className={clsx(classes.tagline, classes.shadowed)}
          color="primary"
          variant="h6"
        >
          Software Engineer | Web Developer | Friend
        </FancyText>
        <SocialIcons className={clsx(classes.social)} />
      </div>

      {/* <ScrollToNext className={clsx(classes.fab, classes.centered)} pageSelector="#aboutPage" /> */}
      <Fab className={clsx(classes.fab)} color="primary" onClick={() => handleNextClick('about')}>
        <ExpandMoreIcon />
      </Fab>
    </div>
  );
};

LandingSection.propTypes = {
  user: PropTypes.string,
};
LandingSection.defaultProps = {
  user: 'samlehman617',
};
export default withStyles((theme) => {
  const variant = theme.palette.type === 'dark' ? 'light' : 'main';
  return ({
    centered: {
      // border: '3px solid yellow',
      alignSelf: 'center',
      margin: 'auto',
      width: '100%',
      maxWidth: 650,
      display: 'flex',
      flexDirection: 'column',
      // Centers content within div
      justifyContent: 'center',
      // Grows to fit page
      flexGrow: 1,
      // Centers Typography component
      textAlign: 'center',
    },
    curvedText: {
      stroke: 'none',
      fill: theme.palette.primary[variant],
      // fontSize: '3rem',
      fontWeight: 'bold',
      animationName: '$grow',
      animationDuration: '3s',
      animationFillMode: 'forwards',
      animationTimingFunction: 'ease-in',
      // animationIterationCount: 'infinite',
    },
    fab: {
      // Place at bottom of page
      alignSelf: 'flex-end',
      // Margins
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(2),
      // Bounce Animation
      animationDuration: '1.25s',
      animationFillMode: 'both',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      '&:hover': {
        animationName: '$bounce',
        '-moz-animation-name': '$bounce',
      },
    },
    page: {
      background: 'url(#background)',
      position: 'relative',
      // Flexbox
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      //alignContent: 'center',
      flexGrow: 1,
      // Sizing
      height: 'calc(100vh - 64px)',
      width: '100vw',
      // margin: '20%',
      //minHeight: '100vh',
      //paddingTop: '64px',
    },
    shadowed: {
      textShadow: '0px 2px 3px rgba(0,0,0,0.4), 0px 4px 13px rgba(0,0,0,0.1), 0px 9px 23px rgba(0,0,0,0.1)',
    },
    social: {
      border: '3px dotted red',
      minHeight: 32,
    },
    svg: {
      minWidth: '300px',
      maxHeight: '800px',
      maxWidth: '90%',
      margin: '0 auto',
      filter: `drop-shadow(0px 0px 10px #${theme.palette.background.default}88)`,
    },
    tagline: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      color: theme.palette.primary[variant],
    },
    underline: {
      stroke: theme.palette.primary[variant],
    },
    '@keyframes bounce': {
      '0%, 100%, 20%, 50%, 80%': {
        '-webkit-transform': 'translateY(0)',
        '-ms-transform': 'translateY(0)',
        transform: 'translateY(0)',
      },
      '40%': {
        '-webkit-transform': 'translateY(-10px)',
        '-ms-transform': 'translateY(-10px)',
        transform: 'translateY(-10px)',
      },
      '60%': {
        '-webkit-transform': 'translateY(-5px)',
        '-ms-transform': 'translateY(-5px)',
        transform: 'translateY(-5px)',
      },
    },
    '@keyframes rotate': {
      '0%': {
        transform: 'rotate(-90deg)',
      },
      '100%': {
        transform: 'rotate(0deg)'
      },
    },
    '@keyframes grow': {
      '0%': {
        fontSize: '0rem',
      },
      '100%': {
        fontSize: '3rem',
      },
    },
  })
})(LandingSection);
