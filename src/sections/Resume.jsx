import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';

// Material Components
import {
  ClickAwayListener,
  Button, ButtonGroup,
  Card,
  // CardActions, CardContent, CardHeader,
  Grid,
  MenuItem, MenuList,
  Paper, Popper,
  // Typography,
  Grow,
  // useTheme,
  withStyles,
} from '@material-ui/core';
// import { useTheme, withStyles } from '@material-ui/core/styles';

import {Document,Page} from 'react-pdf/dist/entry.webpack';
import Resume from '../assets/docs/resume.pdf';

// Components
// import { Typography as FancyText } from '../components/Typography';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import GetAppIcon from '@material-ui/icons/GetApp';

import { debug } from '../App';

const ResumeSection = (props) => {
  const { classes } = props;
  const options = ['Default', 'Dense', 'Compact'];
  // const theme = useTheme();
  // const variant = theme.palette.type === 'dark' ? 'light' : 'main';
  // const color = theme.palette.primary[variant].slice(1, 7);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // const selectedOption = 'Default';
  const buttonText = `Get [${options[selectedIndex]}] PDF`;

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    if (debug) console.log("Successful load of resume.pdf");
    // this.setState({ numPages });
  };


  return (
      <Grid item xs={12}>
        <Card className={classes.resume}>
          <Document file={Resume} className={classes.document} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false}/>
          </Document>
          <ButtonGroup
            className={classes.downloadButton}
            fullWidth
            aria-label="download button"
            color="secondary"
            ref={anchorRef}
            size="large"
            variant="contained"
          >
            <Button
              className={classes.downloadButtonMain}
              fullWidth
              onClick={handleClick}
              startIcon={<GetAppIcon />}
            >
              {buttonText}
            </Button>
            <Button
              className={classes.downloadButtonDropdown}
              color="secondary"
              size="large"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select resume version"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            className={classes.popup}
            open={open}
            anchorEl={anchorRef.current}
            placement="bottom-end"
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom-end' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Card>
      </Grid>
  );
};
export default withStyles(
  (theme) => {
    // const variant = theme.palette.type === 'dark' ? 'light' : 'main';
    return ({
      resume: {
        width: 'min-content',
        margin: 'auto',
      },
      downloadButton: {
        alignSelf: 'flex-end',
        margin: 0,
        width: '100%',
      },
      downloadButtonMain: {
        margin: 0,
        width: '100%',
      },
      downloadButtonDropdown: {
        width: '64px',
      },
      header: {
        fontWeight: 'bold',
        fontSize: '4rem',
        [theme.breakpoints.down('xs')]: {
          fontSize: '3rem',
        },
      },
    })
  })(ResumeSection);
