import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  Slide,
  // darken,
  // getContrastText,
  useScrollTrigger,
  // useTheme,
  withStyles
} from "@material-ui/core";

import CodeIcon from "@material-ui/icons/Code";
// import FormatPaintIcon from "@material-ui/icons/FormatPaint";
// import MenuIcon from "@material-ui/icons/Menu";
import PaletteIcon from '@material-ui/icons/Palette';
// import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
import BookIcon from "@material-ui/icons/Book";
import NavigationDrawer from "./NavigationDrawer";

import ThemeMenu from '../theming/ThemeMenu';

import SamHead from "../../assets/images/sam_head.png";

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    borderBottom: `1px solid ${theme.palette.background.paper}`,
    // boxShadow: 'none',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paperSolid),
    backdropFilter: "blur(25px)",
    transition: 'all 0.3s',
  },
  topNav: {
    // backgroundColor: 'transparent',
    // background: `linear-gradient(${darken(theme.palette.secondary.main)+"77"}, ${theme.palette.secondary.main+"00"})`,
    background: 'linear-gradient(#00000066, #00000000)',
    border: 'none',
    boxShadow: 'none',
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backdropFilter: 'none',
  },
  topBrandedLeftText: {
    color: theme.palette.primary.light,
  },
  topBrandedRightText: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
  topButton: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
  appBarTitle: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    width: '200px',
    overflow: 'visible',
    paddingLeft: theme.spacing(1),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 0,
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight
  },
  navLinks: {
    width: 'min-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: theme.spacing(0, 'auto'),
  },
  navLink: {
    minWidth: '115px',
    display: 'flex',
    justifyContent: 'center',
  },
  navLinkButton: {
    minWidth: '115px',
    width: '100%',
    margin: 'auto',
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    marginTop: 'auto',
    marginBottom: 'auto',
    // margin: 'auto',
    // marginRight: theme.spacing(0.5),
  },
  noDecoration: {
    textDecoration: "none !important"
  },
  samIcon: {
    // marginRight: theme.spacing(1),
    // marginLeft: theme.spacing(0),
  },
  rightButtonArea: {
    width: '200px',
    display: 'flex',
    justifyContent: 'flex-end',
  }
});


const DrawerButton = (props) => (
  <IconButton className={props.samIcon} display="inline-block" onClick={props.handleMobileDrawerOpen} aria-label="Open Navigation">
    <Avatar display="inline" src={SamHead} />
  </IconButton>
);

const HeaderTitle = (props) => (
  <>
    <Typography 
      variant="h5" 
      className={clsx(props.classes.brandText, {
        [props.classes.topBrandedLeftText]: !props.topTrigger
      })}
      display="inline" 
      color="primary"
    >
      Sam&nbsp;
    </Typography>
    <Typography 
      variant="h5" 
      className={clsx(props.classes.brandText, {
        [props.classes.topBrandedRightText]: !props.topTrigger
      })}
      display="inline" 
      color={!props.topTrigger ? "textPrimary" : "secondary" }
    >
      Lehman
    </Typography>
  </>
);


function NavBar(props) {
  const {
    classes,
    // openRegisterDialog,
    // openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab
  } = props;
  const menuItems = [
    // {
    //   link: "/",
    //   name: "Home",
    //   icon: <HomeIcon className="text-white" />
    // },

    {
      link: "/about",
      name: "About",
      // onClick: openRegisterDialog,
      icon: <HowToRegIcon className="text-white" />
    },
    {
      link: "/blog",
      name: "Blog",
      icon: <BookIcon className="text-white" />
    },
    {
      link: "/projects",
      name: "Projects",
      icon: <CodeIcon className="text-white" />
    },
    {
      name: "Resume",
      link: "/resume",
      icon: <CodeIcon className="text-white" />
    },
  ];
  // const theme = useTheme();
  // const scrollTrigger = useScrollTrigger();
  const topTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });
  const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);

  const handleThemeButtonClick = (event) => {
    setThemeMenuAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchorEl(null);
  };

  // function componentDidMount() {
    // document.addEventListener("scroll", () => {
      // const backgroundcolor = window.scrollY < 100 ? "red" : "blue";
      // this.setState({ navBackground: backgroundcolor });
    // });
  // };
  // const buttonItems = [
    // {
      // name: "Login",
      // onClick: openLoginDialog,
      // icon: <LockOpenIcon className="text-white" />
    // }
  // ];
  return (
    <div className={classes.root}>
      <Slide in={true} direction="down">
        <AppBar
          position="fixed"
          elevation={topTrigger ? 8 : 0}
          color={topTrigger ? "default" : "secondary"}
          className={clsx(classes.appBar, {
            [classes.topNav]: !topTrigger
          }
          )}
        >
          <Toolbar className={classes.toolbar}>
            <div className={classes.appBarTitle}>
              <Hidden mdDown>
                <DrawerButton samIcon={classes.samIcon} handleMobileDrawerOpen={handleMobileDrawerOpen}></DrawerButton>
              </Hidden>
              <HeaderTitle classes={classes} topTrigger={topTrigger}></HeaderTitle>
            </div>
            <div className={classes.navLinks}>
              <Hidden smDown>
                {menuItems.map(element => {
                  if (element.link) {
                    return (
                      <Link
                        key={element.name}
                        to={element.link}
                        className={clsx(classes.navLink, classes.noDecoration)}
                        onClick={handleMobileDrawerClose}
                      >
                        <Button
                          // color={topTrigger ? "inherit" : "primary"}
                          // color="textPrimary"
                          size="large"
                          className={clsx(classes.navLinkButton, { [classes.topButtons]: !topTrigger })}

                          // classes={clsx(classes.navLinkButton, { [classes.topButtons]: !topTrigger })}
                        >
                          {element.name}
                        </Button>
                      </Link>
                    );
                  }
                  return (
                    <Button
                      color="default"
                      size="large"
                      onClick={element.onClick}
                      // classes={{ text: classes.menuButtonText }}
                      className={{ text: classes.menuButtonText }}
                      key={element.name}
                    >
                      {element.name}
                    </Button>
                  );
                })}
              </Hidden>
            </div>
            <div className={classes.rightButtonArea}>
              <IconButton onClick={handleThemeButtonClick}>
                <PaletteIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Slide>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="left"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
      <ThemeMenu anchorEl={themeMenuAnchorEl} handleClose={handleThemeMenuClose} />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
