import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import {
  // Grid,
  Typography,
  Card,
  // CardActionArea,
  CardActions,
  CardContent,
  // CardHeader,
  // CardMedia,
  Button,
  Fab,
  // Hidden,
  // Box,
  // useMediaQuery,
  withStyles,
  withWidth,
  isWidthUp
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GitHubIcon from '@material-ui/icons/GitHub';

import Hero from '../components/Hero';

// import WaveBorder from "../components/WaveBorder2";

// import SamProfile from "../../assets/sam.png";

const styles = theme => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize
    }
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  },
  card: {
    boxShadow: theme.shadows[4],
    maxWidth: '600px',
    margin: 'auto',
    padding: theme.spacing(2),
    // [theme.breakpoints.up("xs")]: {
    //   paddingTop: theme.spacing(3),
    //   paddingBottom: theme.spacing(3)
    // },
    // [theme.breakpoints.up("sm")]: {
    //   paddingTop: theme.spacing(5),
    //   paddingBottom: theme.spacing(5),
    //   paddingLeft: theme.spacing(4),
    //   paddingRight: theme.spacing(4)
    // },
    // [theme.breakpoints.up("md")]: {
    //   paddingTop: theme.spacing(5.5),
    //   paddingBottom: theme.spacing(5.5),
    //   paddingLeft: theme.spacing(5),
    //   paddingRight: theme.spacing(5)
    // },
    // [theme.breakpoints.up("lg")]: {
    //   paddingTop: theme.spacing(6),
    //   paddingBottom: theme.spacing(6),
    //   paddingLeft: theme.spacing(6),
    //   paddingRight: theme.spacing(6)
    // },
    // [theme.breakpoints.down("lg")]: {
    //   width: "auto"
    // }
  },
  fab: {
    margin: 'auto',
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  hero: {
    width: '100%',
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4]
  },
  container: {
    // flexGrow: 2,
    // height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    // height: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3)
    }
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important"
    }
  },
  sam: {
    width: '100%',
    maxWidth: '250px',
    height: '100%',
  }
});

function HeadSection(props) {
  const {
    classes,
    // theme,
    width
  } = props;
  // const dark = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <>
      <Hero className={classes.hero}/>
      <Card
        className={classes.card}
        data-aos-delay="200"
        data-aos="zoom-in"
      >
        <CardContent>
          <Typography
            variant={isWidthUp("lg", width) ? "h6" : "body1"}
            color="textSecondary"
          >
            Welcome to my personal website! 
            I am a software engineer with a specialty in full-stack web development. I like to build things.
            Explore the rest of the site to learn more about me and my work.
            My tools of choice currently include React, Webpack, and Node.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.extraLargeButton}
            classes={{ label: classes.extraLargeButtonLabel }}
            href="https://github.com/sam-lehman"
            endIcon={<GitHubIcon/>}
          >
            Check out my GitHub
          </Button>
        </CardActions>
      </Card>
      <div className={classes.fab}>
        <Fab color="primary"><ExpandMoreIcon/></Fab>
      </div>
    </>
  );
};

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
