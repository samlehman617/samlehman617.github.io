import React from 'react';
import clsx from 'clsx';
import { useTheme, withStyles } from '@material-ui/core';

// Images
import Sam from '../assets/images/sam.png';

const styles = (theme) => ({
    svg: {
        minWidth: '300px',
        maxHeight: '600px',
        // width: '90%',
        // maxWidth: '90%',
        margin: '0 auto',
        filter: `drop-shadow(0px 0px 10px #${theme.palette.background.default}88)`,
    },
    curvedText: {
        // fill: theme.palette.type === "dark" ? theme.palette.common.black : theme.palette.common.white,
        fill: theme.palette.primary.main,
        // stroke: theme.palette.primary.dark,
        strokeWidth: '1px',
        fontFamily: "'Baloo Bhaijaan', cursive",
        fontWeight: 'bold',
        animationName: '$grow',
        animationDuration: '2s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-out',
        // fontFamily: 'Source Sans Pro',
        
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
    }
});

function Hero(props) {
    const theme = useTheme();
    const { classes } = props;
    let text;
    if (theme.textEffect) { text = theme.textEffect("Hi, I'm Sam!"); }
    else { text = "Hi, I'm Sam!" }
    
    return (
        <svg
            className={clsx(classes.svg)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 220"
            preserveAspectRatio="xMidYMid meet"
        >
          <style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,400;1,600;1,700;1,900&display=swap');
</style>
            <defs>
                <path id="IntroPath" d="M 50,160 A 100,100 0 0,1 270,160" />
                <filter id="shadow"><feDropShadow dx="3" dy="3" stdDeviation="10" /></filter>
            </defs>

            <text id="text" 
              fontSize="5rem" 
              // stroke={theme.palette.type === "dark" ? theme.palette.common.black : theme.palette.common.white}
              stroke={theme.palette.background.paper}
              strokeWidth="1px"
              letterSpacing="-1.25"
              className={clsx(classes.curvedText, classes.shadowed)}
            >
                <textPath
                    href="#IntroPath"
                    method="align"
                    textLength="230"
                    startOffset="55"
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
            {/* <path
                className={clsx(classes.underline, classes.shadowed)}
                d="M 60,217 L 260,217"
                stroke={theme.palette.primary.main}
                strokeWidth="6"
                strokeLinecap="round"
            /> */}
        </svg>
    )
}

export default withStyles(styles)(Hero);