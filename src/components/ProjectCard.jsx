import React, {useState, useEffect } from "react";
import clsx from 'clsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactMarkdown from 'react-markdown';
import {
  Grid,
  Typography,
  Card, CardActions, CardActionArea, CardContent, CardHeader, 
  CircularProgress,
  Button, IconButton, Chip, Collapse,
  makeStyles, withTheme, useTheme, darken,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CodeIcon from '@material-ui/icons/Code';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {
  // Icon,
  InlineIcon
} from '@iconify/react';
import starIcon from '@iconify/icons-mdi/star';
import forkIcon from '@iconify/icons-mdi/source-fork';
import eyeIcon from '@iconify/icons-mdi/eye';
import updateIcon from '@iconify/icons-mdi/update';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');


const useRepoStatsStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    marginTop: theme.spacing(3.5),
    marginRight: theme.spacing(1.5),
  },
  row: {
    marginBottom: theme.spacing(0.75),
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    minWidth: theme.spacing(4),
    '& > *': {
      marginTop: 'auto',
      marginBottom: 'auto',
      fontWeight: 'bolder',
    },
    
  },
}));
const RepoStats = props => {
  const classes = useRepoStatsStyles();
  const {
    stargazers_count, forks_count, watchers_count
  } = props;
  return (
    <div className={classes.root}>
    <span className={clsx(classes.row)}>
      <InlineIcon icon={starIcon} width="1.25em" />
      <Typography display="inline">{stargazers_count}</Typography>
    </span>
    <span className={clsx(classes.row)}>
      <InlineIcon icon={forkIcon} width="1.25em" />
      <Typography display="inline">{forks_count}</Typography>
    </span>
    <span className={clsx(classes.row)}>
      <InlineIcon icon={eyeIcon} width="1.25em" />
      <Typography display="inline">{watchers_count}</Typography>
    </span>
    </div>
  )
}
const useSubheaderStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    color: 'lightGray',
    fontWeight: 'bolder',
    marginTop: theme.spacing(1),
  },
  langDot: {
    height: theme.spacing(1.5),
    width: theme.spacing(1.5),
    backgroundColor: 'yellow',
    borderRadius: "50%",
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: theme.spacing(1),
  },
  langLabel: {
    marginRight: theme.spacing(3),
  },
  updateIcon: {
    marginRight: theme.spacing(0.5),
  }
}));
const Subheader = props => {
  const classes = useSubheaderStyles();
  const {
    language, updated_at,
  } = props;
  return (
    <span className={classes.root}>
      <span display="inline-block" className={classes.langDot} />{""}
      <Typography 
        display="inline" 
        variant="subtitle1" 
        className={classes.langLabel}
      >
        {" "}{language}
      </Typography>
      <InlineIcon 
        icon={updateIcon} 
        width="1.25em" 
        className={classes.updateIcon} 
      />
      <Typography 
        display="inline" 
        variant="subtitle1"
      >
        {" "}{timeAgo.format(new Date(updated_at))}
      </Typography>
    </span>
  );
}
const useCardStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2,
    height: '100%',
    width: '100%',
  },
  card: {
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    maxHeight: '85vh',
  },
  overlay: {
    display: 'flex',
    flexFlow: 'column nowrap',
    position: 'relative',
    top: 0,
    left: 0,
    height: '100%',
    minHeight: '150px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${darken(theme.palette.primary.dark, 0.7)}F0`,
    // backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    backdropFilter: 'blur(8px)',
    border: `1px solid ${theme.palette.primary.dark}60`,
    //alignItems: 'flex-end',
  },
  header: {
    //backgroundColor: 'green',
    paddingTop: 0,
    paddingBottom: 0,
    textShadow: '1px 1px 1px black',
  },
  title: {

  },
  subtitle: {

  },
  desc: {
    marginBottom: theme.spacing(4),
    textShadow: '1px 1px 1px black',
  },
  chips: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
  },
  chip: {
    marginRight: theme.spacing(0.25),
    marginBottom: theme.spacing(0.25),
    color: 'white',
    textShadow: '1px 1px 1px black',
    backgroundColor: `${theme.palette.secondary.dark}40`,
    border: `1px solid ${theme.palette.secondary.light}90`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  actions: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'stretch',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    marginTop: 'auto',
    alignSelf: 'stretch',
  },
  actionButton: {
    marginRight: theme.spacing(1.25),
    minWidth: '150px',
  },
  demoButton: {
    border: `1px solid ${theme.palette.primary.light}80`,
    backgroundColor: `${theme.palette.primary.dark}40`,
    color: 'white',
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}F0`,
    },
  },
  codeButton: {
    border: `1px solid ${theme.palette.secondary.light}80`,
    backgroundColor: `${theme.palette.secondary.dark}40`,
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.main}F0`,
    },
    color: 'white',
  },
  expandButton: {
    marginLeft: 'auto',
    color: 'white',
    transition: 'all 0.3s'
  },
  expandedButton: {
    transform: 'rotate(180deg)',
  },
  contentCollapse: {
    width: '100%',
  },
  readmeCollapse: {
    maxWidth: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  readme: {
    textAlign: 'left',
    maxHeight: '100%',
    overflowY: 'auto',
  },
}));

const ProjectCard = props => {
  const theme = useTheme();
  const classes = useCardStyles();
  const [expanded, setExpanded] = useState(false);
  const [repoContent, setRepoContent] = useState([]);
  const [readmeUrl, setReadmeUrl] = useState('');
  const [readme, setReadme] = useState();
  const [screenshot, setScreenshot] = useState();  
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('idle');
  const {
      name,
      index,
    language,
    description,
    updated_at,
    topics,
    html_url,
    homepage,
    full_name,
  } = props;

  // Fetch Repository information from GitHub API
  useEffect(() => {
    if (!full_name) return;
    const fetchRepoContent = async () => {
      setStatus('fetching');
      const response = await fetch(`https://api.github.com/repos/${full_name}/contents/`);
      const data = await response.json();
      setRepoContent(data);
      setStatus('fetched');
    };
    fetchRepoContent();
  }, [full_name]);


  // Filter Repository information when repo contents change.
  useEffect(() => {
    // Build our regexes to find the files we want.
    const screenshot_re = /.*(screenshot|demo|logo|icon).*.(png|gif|jpe?g|svg)/g;
    const readme_re = /(readme|ReadMe|Readme|README).(md|MD|txt)/g;
    // Filter files into lists of screenshots & readmes
    const screenshots = repoContent.filter(file => screenshot_re.test(file.download_url));
    const readmes = repoContent.filter(file => readme_re.test(file.download_url));
    // Let's just use the first ones for now.
    // TODO: Handle multiple screenshots + build UI for scrolling b/w them.
    if (screenshots.length > 0 && readmes.length > 0) {
      // console.log(`${full_name}\nScreenshots:`, screenshots);
      // console.log(`${full_name}\nREADMEs:`, readmes);
      // setStatus('done');
      setScreenshot(screenshots[0].download_url);
      setReadmeUrl(readmes[0].download_url);
    }
    // } else {
      // setStatus('error');
    // }
    setLoading(false);
  }, [repoContent]);

  // Download our README content.
  useEffect(() => {
    if (!readmeUrl) return;
    const fetchReadmeContent = async () => {
      setStatus('fetching README');
      const response = await fetch(readmeUrl, { mode: 'cors'});
      const readmeData = await response.text();
      if (readmeData) setLoading(false);
      setReadme(readmeData);
    }
    fetchReadmeContent();
  }, [readmeUrl]);

  return (
    <Grid item xs
        className={classes.root}
        data-aos="zoom-in-up" data-aos-delay={200 * (index + 1)}
    >
    <Card raised
      className={clsx(classes.card)}
      style={{ 
        background: `no-repeat top / cover url(${screenshot}) ${theme.palette.primary.dark}`
      }}
    >
        {loading ?
          <CircularProgress className={classes.contentSpinner} /> : (
            <CardActionArea
              className={classes.overlay}
              onClick={e => setExpanded(!expanded)}
              component="div"
            >
              <Collapse className={classes.contentCollapse} in={!expanded}>
                <CardHeader
                  className={classes.header}
                  title={name}
                  titleTypographyProps={{ variant: "h4", align: 'left' }}
                  subheader={(<Subheader language={language} updated_at={updated_at} />)}
                  subheaderTypographyProps={{ variant: "subtitle1" }}
                  action={(<RepoStats {...props} />)}
                >
                </CardHeader>
                <CardContent className={classes.content}>
                  <Typography paragraph align="left" variant="body1" className={classes.desc}>{description}</Typography>
                  <div className={classes.chips}>
                    {topics
                      .filter(topic => !['portfolio-item', 'hackpsu', 'material-design', 'material'].includes(topic))
                      .map(t => (
                        <Chip className={classes.chip} variant="outlined" size="small" label={t} key={t} />
                      ))
                    }
                  </div>
                </CardContent>
              </Collapse>
              { status !== 'fetched README' ? <CircularProgress className={classes.readmeSpinner} /> : (

              <Collapse className={classes.readmeCollapse}
                in={expanded}
              >
                <ReactMarkdown
                  className={classes.readme}
                  // source={readme}
                  escapeHtml={false}
                >
                  {readme}
                </ReactMarkdown>
              </Collapse>
              )}
              <CardActions disableSpacing className={classes.actions}>
                <Button
                  startIcon={<ExitToAppIcon />}
                  variant="outlined"
                  className={clsx(classes.actionButton, classes.demoButton)}
                  href={homepage}
                  onClick={e => e.stopPropagation()}
                  onMouseDown={e => e.stopPropagation()}
                >
                  Demo
        </Button>
                <Button
                  startIcon={<CodeIcon />}
                  variant="outlined"
                  className={clsx(classes.actionButton, classes.codeButton)}
                  href={html_url}
                  onClick={e => e.stopPropagation()}
                  onMouseDown={e => e.stopPropagation()}
                >
                  Code
        </Button>
                <IconButton
                  className={clsx(classes.expandButton, { [classes.expandedButton]: expanded })}
                  onClick={e => { e.stopPropagation(); console.log(readme); setExpanded(!expanded); }}
                  onMouseDown={e => e.stopPropagation()}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            </CardActionArea>
          )}
    </Card>
    </Grid>
  )
};
export default withTheme(ProjectCard);