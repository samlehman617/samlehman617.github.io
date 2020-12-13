import React, { Component, useState, } from 'react';
import PropTypes from 'prop-types';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

// Material Components
import {
  Button,
  Card,
  CardActions, CardContent, CardMedia, CardHeader,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';

// Icons
import { InlineIcon } from "@iconify/react";
import star from "@iconify-icons/mdi/star";
import repofork from "@iconify-icons/mdi/source-fork";
import updateIcon from "@iconify-icons/mdi/update";
import eyeIcon from '@iconify-icons/mdi/eye';
import CodeIcon from '@material-ui/icons/Code';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Components
import { Typography as FancyText } from './Typography';
import TechChip from './TechChip';
import { elementOverflow } from '../utils/text';

import default_img from '../assets/images/default_project.png';

import { debug } from '../App';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const useHeaderStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    // border: '2px solid yellow',
    borderTopLeftRadius: `${theme.shape.borderRadius}px`,
    borderTopRightRadius: `${theme.shape.borderRadius}px`,
    backdropFilter: 'blur(15px)',
    backgroundColor: `${theme.palette.background.paper}60`,
    borderTop: `1px solid ${theme.palette.background.paper}30`,
    borderLeft: `1px solid ${theme.palette.background.paper}30`,
    borderRight: `1px solid ${theme.palette.background.paper}30`,
  },
  title: {
    // color: theme.palette.getContrastText
    textShadow: '0 1px 0 black',
  },
  titleMarquee: {

  },
  langDot: {
    display: "inline-block",
    borderRadius: "50%",
    width: theme.dense ? theme.spacing(1.25) : theme.spacing(2),
    height: theme.dense ? theme.spacing(1.25) : theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  langLabel: {
    marginRight: theme.spacing(1.5),
  },
  repoCounts: {
    marginRight: theme.spacing(1.5),
  },
  updateIcon: {

  },
}));

const ProjectHeader = props => {
  const classes = useHeaderStyles();

  const titleOverflow = useState(false);
  const hover = useState(false);

  const { name, language, updated_at, stargazers_count, watchers_count, forks_count } = props;

  const languageRow = (<>
    <span className={classes.langDot} style={{ backgroundColor: "blue"}}></span>
    <Typography display="inline" className={classes.langLabel} >{language}</Typography>
  </>);

  const starInfo = (
    <Typography display="inline" className={classes.repoCounts}>
      <InlineIcon icon={star} width="1.5em" />{" "}{stargazers_count}
    </Typography>
  );
  const forkInfo = (
    <Typography display="inline" className={classes.repoCounts}>
      <InlineIcon icon={repofork} width="1.5em" />{" "}{forks_count}
    </Typography>
  );
  const watcherInfo = (
    <Typography display="inline" className={classes.repoCounts}>
      <InlineIcon icon={eyeIcon} width="1.5em" />{" "}{watchers_count}
    </Typography>
  );

  const updateInfo = (
    <Typography display="inline" className={classes.repoCounts}>
      <InlineIcon width="1.5em" icon={updateIcon} className={classes.updateIcon} />
      {" "}{timeAgo.format(new Date(updated_at))}
      <br />
    </Typography>
  );

  return (
    <CardHeader
      className={clsx(classes.root, {
        // [classes.hidden]: this.state.expanded,
      })}
      classes={{
        title: classes.title,
        // content: classes.title,
      }}
      title={(
        <FancyText variant="h5" id={name} className={clsx({
          [classes.titleStatic]: titleOverflow <= 0,
          [classes.titleMarquee]: titleOverflow > 0 && hover,
        }, classes.title)}>{name}</FancyText>
      )}
      subheader={(<>
        {language             ? languageRow : null}
        {updateInfo}
        {stargazers_count > 0 ? starInfo    : null}
        {watchers_count   > 0 ? watcherInfo : null}
        {forks_count      > 0 ? forkInfo    : null}
      </>)}
      subheaderTypographyProps={{ variant: 'subtitle2' }}
    />
  );
};
const useChipsStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-end',
  },
  chip: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  hidden: {

  },
}));
const ChipsArea = props => {
  const classes = useChipsStyles();
  const { topics, expanded } = props;

  return (
    <div className={clsx(classes.root, { [classes.hidden]: expanded })}>
      {topics
        .filter((topic) => !['portfolio-item', 'hackpsu', 'material-design', 'material'].includes(topic))
        .map((topic) => (
          <TechChip key={topic}
            className={classes.chip}
            hover={false}
            label={topic}
            color="primary"
            variant="outlined"
          />
        ))}
    </div>
  );
};
const useContentStyles = makeStyles(theme => ({
  root: {
    // border: '2px solid purple',
    // backgroundColor: 'yellow',
    display: 'flex',
    flex: '2 1 auto',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-end',
  },
  collapse: {
    height: '100%',
    // border: '2px dashed lightBlue',
  },
  collapseOpen: {
  },
  collapseClosed: {
    height: 0,
  },
  collapseMain: {
    // backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  collapseReadme: {
    // border: '2px solid black',
    maxWidth: '100%',
  },
  aboutContent: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    flex: '2 1 auto',
    // backgroundColor: 'red',
    height: '100%',
  },
  description: {
    flex: '2 1 auto',
  },
  markdown: {
    '& code': {
      whiteSpace: 'pre-line',
    },
    '& img': {
      maxWidth: '100%',
    },
  },
  hidden: {
    display: 'none', 
  },
}));
const Content = props => {
  const classes = useContentStyles();
  const { description, expanded, readme } = props;
  return (
    <div className={classes.root}>
      <Collapse
        className={clsx(
          classes.collapse,
          classes.collapseReadme, {
            [classes.collapseOpen]: expanded,
            [classes.collapseClosed]: !expanded
        })}  
        in={expanded}
      >
        <ReactMarkdown
          className={classes.markdown}
          source={readme}
          escapeHtml={false}
        />
      </Collapse>

      <CardContent
        className={clsx(
          classes.aboutContent, {
            [classes.hidden]: expanded,
          })}
      >
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {description}
        </Typography>
        <ChipsArea {...props} />
      </CardContent>
    </div>
  );
};

const useActionsStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: 'lightGray',
    // border: '2px solid black',
  },
  button: {

  },
  expandIcon: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandedIcon: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));
const ActionsRow = props => {
  const classes = useActionsStyles();
  // const expanded = useState(true);
  const hover = useState(false);

  const { expandClickHandler, expanded, html_url, homepage, } = props;

  return (
    <CardActions className={clsx(classes.root, { [classes.actionsReadme]: expanded, })} disableSpacing >
      <Button className={clsx(classes.actionButton, { [classes.highlightButton]: hover })}
        href={homepage}
        startIcon={<ExitToAppIcon />}
        // color="inherit"
        // color={this.state.hover ? "primary" : "inherit"}
        // size="small"
        // variant={this.state.hover ? "contained" : "outlined"}
      >
        Demo
      </Button>
      <Button className={classes.actionButton}
        color="inherit"
        href={html_url}
        startIcon={<CodeIcon />}
        // size="small"
      >
        Code
      </Button>
      <IconButton
        className={clsx(classes.expandIcon, {
          [classes.expandedIcon]: expanded,
        })}
        color="inherit"
        onClick={expandClickHandler}
        aria-expanded={expanded}
        aria-label="show more"
        // size="small"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
  );
};

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      expanded: false,
      titleOverflow: false,
      prev_full_name: this.props.full_name,
      contents: null,
      screenshots: [default_img],
      configs: [],
      readme: null,
    };
    this.contentController = new AbortController();
    this.configController = new AbortController();
    this.screenshotController = new AbortController();
    this.readmeController = new AbortController();
  }
  // TODO: Actually determine where the title overflows.
  setTitleOverflow(overflow) {
    this.setState({ titleOverflow: overflow });
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.full_name !== state.prev_full_name) {
      return {
        externalData: null,
        contents: null,
        readme: null,
        screenshots: [default_img],
        configs: null,
        prev_full_name: props.full_name,
      };
    }
    // No state update necessary
    return null;
  }

  componentDidMount() {
    const titleElement = document.getElementById(this.props.name);
    const titleOverflow = titleElement ? elementOverflow(titleElement) : 0;
    const titleWidth = titleOverflow === 0 ? 'auto' : `${titleOverflow}px`;
    // titleElement.setAttribute('width', titleOverflow);
    titleElement.style.width = titleWidth;

    this.setState({ titleOverflow: titleOverflow });
    // console.log(marqueeOverflow(document.getElementById(this.props.name)));
    setTimeout(() => this.contentController.abort(), 30000);
    if (debug) console.log(
      '--------PORTFOLIO-ITEM--'
    )
    this.fetchContents(`https://api.github.com/repos/${this.props.full_name}/contents/`);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contents === null) {
      setTimeout(() => this.contentController.abort(), 30000);
      this.fetchContents(`https://api.github.com/repos/${this.props.full_name}/contents/`);
    }
  }

  componentWillUnmount() {
    this.contentController.abort();
    this.configController.abort();
    this.screenshotController.abort();
    this.readmeController.abort();

    // if (this._contentsRequest) {
    //   this._contentsRequest.cancel();
    // }
    // if (this._configsRequest) {
    //   this._configRequest.cancel();
    // }
    // if (this._screenshotsRequest) {
    //   this._sreenshotsRequest.cancel();
    // }
    // if (this._readmeRequest) {
    //   this._readmeRequest.cancel();
    // }
  }

  fetchReadme = (url) => {
    if (debug) console.debug(
      `Fetching README from: ${url}`
    );
    fetch(url, { mode: "cors", signal: this.readmeController.signal })
      .then((res) => res.text())
      .then((res) => this.setState({ readme: res }))
      .catch((e) => console.log(e.message));
  };

  fetchConfig = (url) => {
    if (debug) { 
      console.debug(
        '--------PORTFOLIO-ITEM--',
        `\nFetching config from: ${url}`
      );
    }
    fetch(url, { mode: "cors", signal: this.configController.signal })
      .then((res) => res.text())
      .then((res) => this.setState((state) => ({ configs: state.configs.push(res) })))
      .catch((e) => console.log(e.message));
  };

  fetchContents = (id) => {
    if (debug) console.debug(`Fetching: ${id}...`);
    fetch(id, { mode: "cors", signal: this.contentController.signal })
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          { contents: data },
          () => {
            const screenshots = [];
            const configs = [];
            // const readme = null;
            this.state.contents.map((file) => {
              // Make regexes for desired files in repo
              const screenshot_re = /.*(screenshot|demo|logo).*.(png|gif|jpe?g)/g;
              const config_re = /(conf(ig)?|package).(json|yaml)/g;
              const readme_re = /(readme|ReadMe|README).(md|MD|txt)/g;
              // Test and add to list
              if (screenshot_re.test(file.download_url)) {
                return screenshots.push(file.download_url);
              } else if (config_re.test(file.download_url)) {
                return configs.push(file.download_url);
              } else if (readme_re.test(file.download_url)) {
                setTimeout(() => this.readmeController.abort(), 15000);
                return this.fetchReadme(file.download_url);
              }
              return [];
            });
            this.setState({
              screenshots,
              configs,
            });
          },
        );
      })
      .catch((e) => console.log(e.message));
  };

  _fetchContents(id) {
    if (debug) console.debug(`Fetching: ${id}...`);
    this._contentsRequest = fetch(id, { mode: "cors" })
      .then((res) => {
        this._contentsRequest = null;
        // Save contents of the repo
        this.setState({ contents: res.json });
        return res.json();
      })
      .then((repo) => {
        const screenshots = [];
        const configs = [];
        // const readme = null;
        repo.map((file) => {
          // Make regexes for desired files in repo
          const screenshot_re = /.*(screenshot|demo|logo).*.(png|gif|jpe?g)/g;
          const config_re = /(conf(ig)?|package).(json|yaml)/g;
          const readme_re = /(readme|ReadMe|README).(md|MD)/g;
          // Test and add to list
          if (screenshot_re.test(file.download_url)) {
            return screenshots.push(file.download_url);
          } else if (config_re.test(file.download_url)) {
            return configs.push(file.download_url);
            // this._fetchConfig(file['download_url'])
          } else if (readme_re.test(file.download_url)) {
            // readme = file['download_url'];
            return this._fetchReadme(file.download_url);
          }
          return [];
        });
        this.setState({
          screenshots,
          configs,
        });
      });
  }

  _fetchConfig(url) {
    if (debug) console.debug(`Fetching config from: ${url}`);
    this._configRequest = fetch(url, { mode: "cors" })
      .then((res) => {
        this._configRequest = null;
        this.setState({
          configs: this.state.configs.push(res),
        });
      });
  }

  _fetchReadme(url) {
    if (debug) console.debug(`Fetching README from: ${url}`);
    this._readmeRequest = fetch(url, { mode: "cors" })
      .then((res) => {
        this._readmeRequest = null;
        // console.log(`README: ${res.text()}`);
        return res.text();
      })
      .then((res) => {
        this.setState({
          readme: res,
        });
      });
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
    // console.log(`README: ${this.state.readme}`);
  };
  handleMouseEnter = () => { this.setState({ hover: true, }); };
  handleMouseLeave = () => { this.setState({ hover: false }); };

  render() {
    const {
      classes,
      name,
    } = this.props;

    return (
      <Card className={classes.card} raised onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <CardMedia className={clsx(classes.media, { [classes.hidden]: this.state.expanded })}
          classes={classes.img}
          image={this.state.screenshots[0]}
          component="div"
          alt={name}
          title={name}
        >
          <ProjectHeader {...this.props} />
        </CardMedia>

        <Content
          readme={this.state.readme}
          expanded={this.state.expanded}
          {...this.props}
        />

        <ActionsRow
          expanded={this.state.expanded}
          expandClickHandler={this.handleExpandClick}
          {...this.props}
        />

        {/* <CardContent className={clsx(classes.mainContent, { [classes.hidden]: this.state.expanded })}>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {description}
          </Typography>
          <ChipsArea {...this.props} />
        </CardContent>

        <Collapse
          className={clsx(classes.collapse, classes.scrollY, {
            [classes.collapseOpen]: this.state.expanded,
            [classes.collapseClosed]: !this.state.expanded,
          })}
          in={this.state.expanded}
          unmountOnExit
          mountOnEnter
        >
          <CardContent className={classes.readmeContent}>
            <ReactMarkdown
              className={classes.markdown}
              source={this.state.readme}
              escapeHtml={false}
            />
          </CardContent>
        </Collapse> */}
      </Card>
    );
  }
}
PortfolioItem.propTypes = {
  user: PropTypes.string,
  topics: PropTypes.array,
};
PortfolioItem.defaultProps = {
  user: 'samlehman617',
  topics: [],
};

export default withStyles((theme) => {
  // const variant = theme.palette.type === 'dark' ? 'light' : 'main';
  return ({
    card: {
      height: '100%',
      flexGrow: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    langDot: {
      height: "12px",
      width: "12px",
      borderRadius: "50%",
      display: "inline-block",
    },
    repoInfoIcon: {
      marginRight: 15,
    },
    chips: {
      display: 'flex',
      flex: '1 1 auto',
      flexFlow: 'row wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      '& > *': {
        marginRight: 2,
        marginBottom: 2,
      },
    },
    media: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignContent: 'flex-end',
      maxWidth: '100%',
      maxHeight: '100%',
      // position: 'absolute',
      // top: 0,
      // left: 0,
      order: 0,
      // backgroundColor: '#42424250',
      // border: '2px solid black',
      paddingTop: '50%',
      '& > img': {
        filter: 'brightness(50%)',
      },
      filter: 'brightness(50%)',
    },
    mainContent: {
      display: 'flex',
      flexFlow: 'column wrap',
      flex: '2 1 auto',
      justifyContent: 'space-between',
    },
    // media: {
    //   height: '100%',
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    // },
    // header: {
    //   position: 'absolute',
    //   bottom: 0,
    //   left: 0,
    // },

    
    //   zIndex: 25,

    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'flex-start',
    //   alignItems: 'stretch',
    //   // reenable full height cards
    //   // height: '100%',
    //   maxHeight: 'calc(100vh - 128px)',
    //   transition: 'all 0.3s',
    //   '&:hover': {
    //     transform: 'scale(1.015)',
    //     boxShadow: theme.shadows[12],
    //   },
    // },
    // // Inside card
    // collapse: {
    //   order: 1,

    //   zIndex: 26,

    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'space-between',
    //   alignItems: 'stretch',
    //   alignSelf: 'stretch',
    //   flexGrow: 2,
    //   overflow: 'hidden',
    //   maxHeight: 'calc(100vh - 128px)',
    // },
    // collapseClose: {
    //   overflow: 'hidden',
    //   height: 0,
    // },
    // collapseOpen: {
    //   overflowY: 'auto',
    //   overflowX: 'hidden',
    // },
    // // Inside collapse
    // media: {
    //   order: 1,


    //   // border: '2px dotted blue',
    //   zIndex: 26,


    //   display: 'flex',
    //   flexDirection: 'column',
    //   flex: '0 1 max-content',

    //   width: '100%',
    //   minHeight: 300,
    //   maxHeight: 450,
    //   alignSelf: 'flex-start',
    //   justifyContent: 'space-between',
    //   alignItems: 'stretch',
    //   boxShadow: "inset 0px 7px 8px -4px rgba(0,0,0,0.2),inset 0px 12px 17px 2px rgba(0,0,0,0.14),inset 0px 5px 22px 4px rgba(0,0,0,0.12)",

    //   '&:after': {
    //     paddingBottom: '50%',
    //   },
    // },
    // // Inside collapse
    // header: {

    //   order: 2,
    //   // border: '2px dotted blue',
    //   // display: 'inline',
    //   // position: 'relative',
    //   // top: `${-((
    //   //   theme.typography.h5.lineHeight *
    //   //   theme.typography.h5.fontSize.slice(0, -3) * 2 * 16) + (
    //   //     theme.typography.subtitle2.lineHeight *
    //   //     theme.typography.subtitle2.fontSize.slice(0, -3) * 16
    //   //   ))}px`,
    //   // order: 2,
    //   zIndex: 27,
    //   // boxShadow: theme.shadows[12],
    //   // alignItems: 'flex-start',
    //   // alignSelf: 'flex-start',
    //   // boxSizing: 'content-box',
    //   // marginBottom: 0,
    //   // paddingBottom: 0,
    //   // height: `${(
    //   //   theme.typography.h5.lineHeight *
    //   //   theme.typography.h5.fontSize.slice(0, -3) * 2 * 16) + (
    //   //     theme.typography.subtitle2.lineHeight *
    //   //     theme.typography.subtitle2.fontSize.slice(0, -3) * 16
    //   //   )}px`,
    //   overflow: 'hidden',
    //   whiteSpace: 'nowrap',

    //   borderTopLeftRadius: theme.shape.borderRadius,
    //   borderTopRightRadius: theme.shape.borderRadius,
    //   // borderTop: `1px solid ${theme.palette.grey[900]}`,
    //   //boxShadow: theme.shadows[8],
    //   boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.2)',
    //   border: `1px solid ${theme.palette.primary[theme.palette.type]}15`,


    //   paddingTop: theme.spacing(2),
    //   // paddingBottom: theme.spacing(3),

    //   position: 'relative',
    //   // top: '1px',
    //   // color: theme.palette.primary[variant],
    //   // backgroundColor: `${theme.palette.background.paper}60`,
    //   backgroundColor: `${theme.palette.primary[theme.palette.type]}7D`,
    //   // opacity: '90%',
    //   backdropFilter: 'blur(10px)',

    // },
    // title: {
    //   maxWidth: '100%',
    // },
    // // Inside collapse
    // mainContent: {
    //   order: 2,
    //   // border: '2px dotted blue',
    //   position: 'relative',
    //   top: theme.spacing(-2),
    //   marginBottom: theme.spacing(-2),
    //   // border: '1px solid white',
    //   zIndex: 28,

    //   display: 'flex',
    //   flexDirection: 'column',
    //   flexGrow: 2,
    //   justifyContent: 'space-between',
    //   alignItems: 'stretch',
    //   alignSelf: 'stretch',

    //   borderTopLeftRadius: theme.shape.borderRadius,
    //   borderTopRightRadius: theme.shape.borderRadius,

    //   boxShadow: theme.shadows[8],

    //   backgroundColor: theme.palette.background.paper,


    //   // paddingTop: theme.spacing(1),
    //   // paddingBottom: theme.spacing(1),

    //   paddingBottom: 0,

    //   overflowY: 'auto',
    //   overflowX: 'hidden',
    //   // height: '100%',
    // },
    // // Inside mainContent
    // description: {
    //   // border: '2px solid red',
    //   order: 1,
    //   flexGrow: 2,
    //   justifyContent: 'flex-start',
    //   // marginBottom: theme.spacing(1),
    //   // boxSizing: 'content-box',
    //   minHeight: `${
    //     theme.typography.body2.lineHeight *
    //     theme.typography.body2.fontSize.slice(0, -3) * 3 * 16
    //     }px`,
    // },
    // // Inside collapse
    // chips: {
    //   // border: '2px solid red',
    //   order: 2,
    //   display: 'flex',
    //   flexDirection: 'row',
    //   // flexGrow: 1,
    //   // flexWrap: 'nowrap',
    //   justifyContent: 'flex-start', // Align left
    //   alignContent: 'flex-end',     // Align bottom
    //   alignSelf: 'flex-start',
    //   overflowX: 'auto',


    //   boxSizing: 'content-box',
    //   width: '100%',
    //   marginLeft: theme.spacing(-4),
    //   marginRight: theme.spacing(-4),
    //   paddingLeft: theme.spacing(4),
    //   paddingRight: theme.spacing(4),
    //   paddingTop: theme.spacing(2),
    //   paddingBottom: theme.spacing(2),
    //   // transition: 'all 0.2s',
    //   // Only works on Firefox & Chrome 82+
    //   scrollbarColor: `${theme.palette.primary[variant]} transparent`,
    //   // Webkit browsers
    //   '&::-webkit-scrollbar-thumb': {
    //     // paddingLeft: theme.spacing(1),
    //     // paddingRight: theme.spacing(1),
    //     // marginLeft: theme.spacing(1),
    //     // marginRight: theme.spacing(1),
    //     marginLeft: theme.spacing(4),
    //     marginRight: theme.spacing(4),
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: `${theme.palette.primary[variant]}`,
    //   },
    //   '&::-webkit-scrollbar-track': {
    //     marginLeft: theme.spacing(4),
    //     marginRight: theme.spacing(4),
    //     backgroundColor: 'transparent',
    //   },
    //   '&::-webkit-scrollbar': {
    //     // width: 3,
    //     height: 0,
    //     // transition: 'all 0.2s',
    //     // paddingBottom: 3,
    //     backgroundColor: 'transparent',
    //   },
    //   '&:hover': {
    //     '&::-webkit-scrollbar': {
    //       height: 3,
    //       // paddingBottom: 0,
    //     },
    //     paddingBottom: theme.spacing(2) - 3,
    //   },
    // },
    // // Inside chips
    // chip: {
    //   marginRight: theme.spacing(0.5),
    //   marginBottom: theme.spacing(0.5),
    //   color: theme.palette.primary[variant],
    //   border: `1px solid ${theme.palette.primary[variant]}`,
    // },
    // // Inside collapse
    // readmeContent: {
    //   // border: '2px dotted blue',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignSelf: 'stretch',
    //   flexGrow: 1,
    // },
    // // Inside card
    // actions: {
    //   zIndex: 28,
    //   order: 4,

    //   position: 'relative',

    //   display: 'flex',
    //   flexDirection: 'row',
    //   justifyContent: 'flex-start',
    //   alignItems: 'stretch',
    //   // alignSelf: 'flex-end',

    //   backgroundColor: theme.palette.background.paper,
    //   // paddingLeft: theme.spacing(1),
    //   // paddingRight: theme.spacing(1),
    // },
    // actionButton: {
    //   // marginRight: theme.spacing(1),
    //   // marginLeft: theme.spacing(1),
    //   // paddingLeft: theme.spacing(2),
    //   // paddingRight: theme.spacing(2),
    // },
    // actionsReadme: {
    //   zIndex: 50,
    //   boxShadow: theme.shadows[12],
    // },
    // highlightButton: {
    //   // color: theme.palette.primary[variant],
    // },
    // expandIcon: {
    //   transform: 'rotate(0deg)',
    //   marginLeft: 'auto',
    //   transition: theme.transitions.create('transform', {
    //     duration: theme.transitions.duration.shortest,
    //   }),
    // },
    // expandedIcon: {
    //   transform: 'rotate(180deg)',
    // },
    // starsIcon: {
    //   //backgroundColor: theme.palette.primary[variant],
    // },
    // hidden: {
    //   display: 'none',
    // },
    // scrollX: {
    //   '&:hover': {
    //     paddingBottom: 0,
    //     overflowX: 'auto',
    //   },
    //   paddingBottom: 3,
    //   // marginBottom: -6,
    //   overflowY: 'hidden',
    //   overflowX: 'hidden',
    //   // Only works on Firefox & Chrome 82+
    //   scrollbarColor: `${theme.palette.primary[variant]} transparent`,
    //   // Webkit browsers
    //   '&::-webkit-scrollbar-thumb': {
    //     paddingLeft: theme.spacing(1),
    //     paddingRight: theme.spacing(1),
    //     marginLeft: theme.spacing(1),
    //     marginRight: theme.spacing(1),
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: `${theme.palette.primary[variant]}`,
    //     boxShadow: 'inset 0 0 6px rgba(0,0,0,.4)',
    //     '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.4)',
    //   },
    //   '&::-webkit-scrollbar-track': {
    //     marginLeft: theme.spacing(2),
    //     marginRight: theme.spacing(2),
    //     backgroundColor: 'transparent',
    //   },
    //   '&::-webkit-scrollbar': {
    //     // width: 3,
    //     height: 2,
    //     backgroundColor: 'transparent',
    //   },
    // },
    // scrollY: {
    //   '&:hover': {
    //     paddingRight: 0,
    //     overflowY: 'auto',
    //     '&::-webkit-scrollbar': {
    //       opacity: 1,
    //       width: 6,
    //       height: 6,
    //       backgroundColor: 'transparent',
    //       transition: 'opacity 0.3s, width 0.3s',
    //     },
    //   },
    //   paddingRight: 6,
    //   // marginRight: -6,
    //   overflowX: 'hidden',
    //   overflowY: 'hidden',
    //   // Only works on Firefox & Chrome 82+
    //   scrollbarColor: `${theme.palette.primary[variant]} transparent`,
    //   // Webkit browsers
    //   '&::-webkit-scrollbar-thumb': {
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: `${theme.palette.primary[variant]}`,
    //     boxShadow: 'inset 0 0 6px rgba(0,0,0,.4)',
    //     '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.4)',
    //   },
    //   '&::-webkit-scrollbar-track': {
    //     backgroundColor: 'transparent',
    //   },
    //   '&::-webkit-scrollbar': {
    //     opacity: 0,
    //     width: 0,
    //     height: 0,
    //     backgroundColor: 'transparent',
    //     transition: 'opacity 0.3s, width 0.3s',
    //   },
    // },
    // overrides: {
    //   MuiCardHeader: {
    //     root: {

    //     },
    //     content: {
    //       maxWidth: '100%',
    //     },
    //   },
    //   MuiCollapse: {
    //     wrapper: {
    //       height: '100%',
    //       flexGrow: 1,
    //     },
    //     wrapperInner: {
    //       height: '100%',
    //       flexGrow: 1,
    //     },
    //     container: {
    //       display: 'flex',

    //     },
    //     entered: {

    //     },
    //   },
    // },
  })
})(PortfolioItem);
