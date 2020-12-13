import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';

// Material Components
import {
  Card, CardContent,
  // Chip,
  Grid,
  // Link, List, ListItem,
  // Paper,
  Typography,
} from '@material-ui/core';
import {
  withStyles,
  // useTheme
} from '@material-ui/core/styles';

// Components
import { Typography as FancyText } from '../components/Typography';
import TechChip from '../components/TechChip';

const About = (props) => {
  const { classes } = props;
  // const theme = useTheme();
  return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography
                className={classes.subheader}
                component="div"
                variant="h5"
              >
                Hi, my name is
                {' '}
                <FancyText className={classes.name} color="primary" variant="h4">Sam Lehman!</FancyText>
              </Typography>
              <Typography className={classes.paragraph} variant="body1" component="div">
                I am a
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="software engineer"
                  size="small"
                />
                with an intense love of
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="mathematics"
                  size="small"
                />
                and theoretical
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="computer science"
                  size="small"
                />
                . A born creator, I live to create interesting things for both myself and others. Whether explicitly amusement or problem solving, I
                always enjoy challenging myself. I am extraordinariily passionate about what I do, and I am always seeking a new project or
                challenge. I am a lifelong student, picking up various technologies as I learn. I am obsessed with
                {' '}
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="open source software"
                  size="small"
                />
                and using it to enhance the applications I create. My medium of choice for building applications has been the web, and I tend to build
                {' '}
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="SPAs"
                  size="small"
                />
                as the frontend for the tools I create. I am constantly working on something interesting, so ask me about it!
              </Typography>
              <br />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Typography
                className={classes.listDescription}
                gutterBottom
                variant="subtitle1"
              >
                These are the languages I use:
              </Typography>
              <Grid item container spacing={1} direction="row">
                {
                  ['Python', 'Javascript', 'Java', 'C', 'C++', 'Scheme', 'Matlab', 'Visual Basic', 'Bash', 'Vimscript']
                    .map((item) => (
                      <Grid item key={item}>
                        <TechChip className={classes.listChip} label={item} />
                      </Grid>
                    ))
                }
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Typography
                className={classes.listDescription}
                variant="subtitle1"
                gutterBottom
              >
                Here are some of the technologies I use:
              </Typography>
              <Grid item container spacing={1} direction="row">
                {
                  ['Django', 'Flask', 'Keras', 'Tensorflow', 'Node.js', 'React', 'Webpack', 'Sass']
                    .map((item) => (
                      <Grid item key={item}>
                        <TechChip className={classes.listChip} label={item} />
                      </Grid>
                    ))
                }
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Typography
                className={classes.listDescription}
                gutterBottom
                variant="subtitle1"
              >
                Here are some of my favorite tools:
              </Typography>
              <Grid item container spacing={1} direction="row">
                {
                  ['Zsh', 'VSCode', 'Vim', 'Travis CI', 'git', 'Docker', 'Webpack', 'GitHub']
                    .map((item) => (
                      <Grid item key={item}>
                        <TechChip className={classes.listChip} label={item} />
                      </Grid>
                    ))
                }
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Typography
                className={classes.listDescription}
                gutterBottom
                variant="subtitle1"
              >
                Here's what's next to learn:
              </Typography>
              <Grid item container spacing={1} direction="row">
                {
                  ['Rust', 'Web Assembly', 'Vue.js', 'Kubernetes', 'Typescript']
                    .map((item) => (
                      <Grid item key={item}>
                        <TechChip className={classes.listChip} label={item} />
                      </Grid>
                    ))
                }
              </Grid>
            </Grid>
            <br />
            <Grid item xs={!2}>
              <br />
              <Typography className={classes.paragraph} variant="body1" component="div">
                Problem solving and automation do not stop when I get home! In my
                free time, I am a home automation extraordinairre, seeking to
                eliminate any and all repetitive tasks. I use and extend
                <TechChip className={classes.inlineChip} size="small" label="Home Assistant" />
                , an open source automation platform. I am currently working on creating my own
                                                                                            custom components, addons, and interfaces for the platform. I have various
                <TechChip className={classes.inlineChip} size="small" label="Raspberry Pi" />
                ,
                <TechChip className={classes.inlineChip} size="small" label="Arduino" />
                {' '}
                and
                <TechChip className={classes.inlineChip} size="small" label="ESP32/8266" />
                {' '}
                boards, and accompanying hardware projects! Ask my about what I am currently
                                                                                                                                                        automating! I also enjoy optimizing my development environment. I am an avid
                <TechChip className={classes.inlineChip} size="small" label="Vim" />
                {' '}
                user, and I love to work from the terminal! If there's a CLI for it, you can bet I'll have used it! I use
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="ZSH"
                  size="small"
                />
                {' '}
                as my shell running the
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="zplug"
                  size="small"
                />                {' '}
                framework. Feel free to check out and use my
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="dotfiles on GitHub!"
                  size="small"
                />                I am always tweaking my config, ask me about what new, cool things I'm doing with Vim!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.paragraph} variant="body1" component="div">
                &emsp;When I am not writing code, you can find me in the gym
                {' '}
                <TechChip className={classes.inlineChip} size="small" label="strength training" />
                {' '}
                or practicing
                {' '}
                <TechChip
                  className={classes.inlineChip}
                  hasIcon={false}
                  label="martial arts"
                  size="small"
                />                , on the field
                                  playing baseball, at a friend's place playing
                {' '}
                <TechChip className={classes.inlineChip} size="small" label="Super Smash Bros." />
                , or at home
                {' '}
                <TechChip className={classes.inlineChip} size="small" label="woodworking" />
                ,
                {' '}
                <TechChip className={classes.inlineChip} size="small" label="soldering" />
                , or
                {' '}
                <TechChip className={classes.inlineChip} size="small" label="drawing" />
                .
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.footer}>
              <Typography color="primary" variant="h5">
                ᕙ (•◡•) ᕗ
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
};
export default withStyles((theme) => {
  const variant = theme.palette.type === 'dark' ? 'light' : 'main';
  return ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: theme.shape.borderRadius,
      height: 'min-content',
      padding: theme.spacing(4),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      marginLeft: 'auto',
      marginRight: 'auto',
      flexGrow: 2,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
    },
    fab: {
      zIndex: 99,
      // Place at bottom of page
      position: 'relative',
      top: -28,
      // alignSelf: 'flex-end',
      // Margins
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(2),
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
    inlineChip: {
      // Display: BASELINE??? for inline chips
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
    item: {
      // border: '5px solid yellow',
    },
    grid: {
      height: '100%',
      // border: '5px solid purple',
    },
    header: {
      fontWeight: 'bold',
      fontSize: '4rem',
      alignSelf: 'flex-start',
      color: theme.palette.primary[variant],
      [theme.breakpoints.down('xs')]: {
        fontSize: '3rem',
      },
    },
    subheader: {
      display: 'inline-block',
      float: 'left',
      marginRight: theme.spacing(4),
    },
    name: {
      color: theme.palette.primary[variant],

    },
    highlight: {
      display: 'inline-block',
      backgroundColor: theme.palette.primary[theme.palette.type],
      color: 'white',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      margin: theme.spacing(0.5),
      borderRadius: theme.spacing(1),
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
      '&:hover': {

      },
    },
    listChip: {
      marginRight: theme.spacing(0.25),
      marginBottom: theme.spacing(0.25),
    },
    listDescription: {
    },
    paragraph: {
      lineHeight: 2,
      // Display: BASELINE??? for inline chips
    },
    shadow: {
      textShadow: '0px 2px 3px rgba(0,0,0,0.4), 0px 4px 13px rgba(0,0,0,0.1), 0px 9px 23px rgba(0,0,0,0.1)',
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
      // width: '100%',
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
  })
})(About);
