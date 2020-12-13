import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Styles
import { withStyles } from '@material-ui/core/styles';

// Material Components
import IconButton from '@material-ui/core/IconButton';
// import SvgIcon from '@material-ui/core/SvgIcon';

// Material Icons
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';

// Custom Icons
// import StackOverflowIcon from '@images/icons/stackoverflow-icon.svg';
// import MediumIcon from '@images/icons/medium-icon.svg';

const SocialIcons = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>

      <IconButton
        className={clsx(classes.icons, 'hoverBounce')}
        aria-label="github"
        href="https://github.com/samlehman617"
      >
        <GitHubIcon className={clsx(classes.paddedIcon)} fontSize="large" />
      </IconButton>

      <IconButton
        className={clsx(classes.icons, 'hoverBounce')}
        aria-label="linkedin"
        href="https://linkedin.com/in/samlehman617"
      >
        <LinkedInIcon fontSize="large" />
      </IconButton>

      {/* <IconButton
        className={clsx(classes.icons, 'hoverBounce')}
        aria-label="stackoverflow"
        href="https://stackoverflow.com/user/samlehman617"
      >
        <SvgIcon className={clsx(classes.paddedIcon)} fontSize="large">
          <StackOverflowIcon className={classes.customSvg} />
        </SvgIcon>
      </IconButton>
 */}
      <IconButton
        className={clsx(classes.icons, 'hoverBounce')}
        aria-label="twitter"
        href="https://twitter.com/samlehman617"
      >
        <TwitterIcon fontSize="large" />
      </IconButton>

      {/* <IconButton */}
        {/* className={clsx(classes.icons, 'hoverBounce')} */}
        {/* aria-label="medium" */}
        {/* href="https://medium.com/samlehman617" */}
      {/* > */}
        {/* <SvgIcon className={clsx(classes.paddedIcon)} fontSize="large"> */}
          {/* <MediumIcon className={classes.customSvg} /> */}
        {/* </SvgIcon> */}
      {/* </IconButton> */}

      <IconButton
        className={clsx(classes.icons, 'hoverBounce')}
        aria-label="reddit"
        href="https://reddit.com/u/publicSamLehman"
      >
        <RedditIcon fontSize="large" />
      </IconButton>


      {/* <a
        className="devto"
        target="_blank"
        rel="noopener noreferrer"
        href="https://dev.to/samlehman617"
      >
        <svg viewBox="0 0 408 410">
          <path
            // style={{ fill: colorPrimary }}
            style={{ fill: "#4ea9da" }}
            d="M10.5 2.5C5.6 4.2 2.4 7.8 1 12.9.3 15.6.1 77.2.2 207.1.5 396.6.5 397.5 2.5 401c1.2 1.9 3.6 4.3 5.5 5.5 3.5 2 4.2 2 196 2s192.5 0 196-2c1.9-1.2 4.3-3.6 5.5-5.5 2-3.5 2-4.2 2-196s0-192.5-2-196c-1.2-1.9-3.6-4.3-5.5-5.5-3.5-2-4.4-2-194.5-2.2-162.9-.2-191.6 0-195 1.2zm96.8 124c9 1.9 15.5 5.6 22.2 12.6 6.1 6.4 9.9 13.7 11.5 21.9 1.3 6.9 1.3 81.1 0 88.1-3.4 18.2-18.9 32.4-38.1 34.9-4 .5-17.4 1-29.6 1H51V125h24.8c17.6 0 26.6.4 31.5 1.5zm130.7 13V154h-51v36h31v29h-31l.2 18.2.3 18.3 25.3.3 25.2.2v29h-29.5c-32.8 0-37.9-.6-43.1-5.2-7.3-6.4-6.9-2.3-7.2-72.6-.2-43.8.1-64.5.8-67.3 1.4-5.2 7.3-11.6 12.5-13.4 3.1-1.1 10.9-1.4 35.3-1.5H238v14.5zm48.9-12.3c.4 1.3 6.8 25.6 14.2 54 7.4 28.5 13.6 51.2 13.8 50.5.3-.7 6.6-24.8 14.1-53.7l13.7-52.5 15.6-.3c11.8-.2 15.7.1 15.7 1s-34.6 132.4-36.6 139c-1.4 4.6-8.9 14-13.1 16.5-5.3 3-13.1 3.5-17.9 1-4.3-2.2-10-8.8-12.9-15-1.8-3.8-31.2-112-38-140l-.7-2.7h15.6c15.3 0 15.7 0 16.5 2.2z"
          />
          <path
            // style={{ fill: colorPrimary }}
            style={{ fill: "#4ea9da" }}
            d="M80 205v51.2l10.3-.4c8.9-.3 10.8-.7 14.8-3 7.8-4.6 7.9-4.9 7.9-48.4 0-42.4 0-42.4-7.3-47.2-3.6-2.4-5.1-2.7-14.9-3.1l-10.8-.3V205z"
          />
        </svg>
      </a> */}
    </div>
  );
};
SocialIcons.propTypes = {
  classes: PropTypes.object
};

export default withStyles((theme) => {
  const variant = theme.palette.type === 'dark' ? 'light' : 'main';
  return ({
    container: {
      display: 'flex',
      justifyContent: 'space-evenly',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '80%',
      // Less tight spacing on smaller screens
      [theme.breakpoints.down('xs')]: {
        maxWidth: '95%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
    },
    customSvg: {
      height: 40,
      width: 40,
      padding: 4,
      margin: 4,
    },
    icons: {
      // Color
      color: theme.palette.primary[variant],
      fill: theme.palette.primary[variant],
      // Sizing
      height: 48,
      width: 48,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),

      // Small icons on small screens
      [theme.breakpoints.down('xs')]: {
        height: 32,
        width: 32,
        marginLeft: 1,
        marginRight: 1,
      },
    },
    paddedIcon: {
      padding: 4,
    },
  })
})(SocialIcons);
