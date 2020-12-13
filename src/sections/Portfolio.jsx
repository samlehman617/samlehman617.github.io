import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Components
// import { Typography as FancyText } from '../components/Typography';
import PortfolioItem from '../components/PortfolioItem';
import ProjectCard from '../components/ProjectCard';
// import ScrollToNext from '@components/ScrollToNext';
import GithubCalendar from 'react-github-contributions-calendar';
import ReactTooltip from 'react-tooltip';

// Material Components
import { Card, CardContent, CircularProgress, Grid, Typography, makeStyles, } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
  },
  repo: {
    flexGrow: 2,
    height: '100%',
    width: '100%',
  },
}));
const PortfolioSection = props => {
  const classes = useStyles();
  const [status, setStatus] = useState('init');
  const [repos, setRepos] = useState([]);
  const [cards, setCards] = useState([]);
  const { user, } = props;
  // Get list of repos from GitHub (only on user change)
  useEffect(() => {
    if (!user) return;
    const fetchRepos = async () => {
      setStatus('fetching repos');
      const response = await fetch(
        `https://api.github.com/users/${user}/repos?type=owner&sort=updated&direction=desc`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/vnd.github.mercy-preview+json',
            Origin: 'https://samlehman.dev',
          }
        }
      )
        .then(res => res.json())
        .then(allRepos => allRepos.filter(repo => repo.topics.indexOf('portfolio-item') !== -1))
        .then(res => { console.log(res); return res; })
      const data = await response //.json();
      setRepos(data);
      setStatus('fetched');
    };
    fetchRepos();
  }, [user]);
  // Generate cards when repos update
  useEffect(() => {
    setCards(
      repos.map((repo, i) => (
        <ProjectCard
          key={repo.full_name}
          index={i}
          {...repo}
        />
      ))
    );
  }, [repos]);
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" color="primary">
          Portfolio
        </Typography>
      </Grid>
      {status !== "fetched" ? <CircularProgress /> : cards}
    </Grid>
  );
};
PortfolioSection.propTypes = {
  user: PropTypes.string,
};
PortfolioSection.defaultProps = {
  user: 'samlehman617',
};
export default PortfolioSection;
// class PortfolioSection1 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { repos: [], isLoading: true, error: null };
//   }
//   componentDidMount() {
//     this.setState({ isLoading: true });
//     const base = 'https://api.github.com/users/';
//     const endpoint = '/repos';
//     const params = '?type=owner&sort=updated&direction=desc';
//     const headers = {
//       method: 'GET',
//       mode: 'cors',
//       headers: { 
//         Accept: 'application/vnd.github.mercy-preview+json',
//         // Origin: "http://localhost:3000",
//         Origin: "http://samlehman617.github.io",
//         // "Access-Control-Allow-Origin": '*',
//         // "Access-Control-Allow-Headers": '*',
//      },
//     };
//     fetch(base + this.props.user + endpoint + params, headers)
//       // Allow managing headers, status, and data in next 'then' block
//       .then((res) => {
//         if (res.ok) {
//           return res.json().then((json) => ({
//             headers: res.headers,
//             status: res.status,
//             json,
//           }));
//         }
//         throw new Error('Something went wrong ...');
//       })
//       // Print Rate-Limit headers
//       // TODO: Fix
//       .then(({ headers, status, json }) => {
//         for (const pair of headers.entries()) {
//           let rem = 0;
//           let lim = 0;
//           switch (pair[0]) {
//             case 'x-ratelimit-limit':
//               lim = pair[1];
//               break;
//             case 'x-ratelimit-remaining':
//               rem = pair[1];
//               break;
//             case 'x-ratelimit-reset': {
//               const date = new Date(pair[1] * 1000);
//               const until = (start, end) => {
//                 const ms = end - start;
//                 const sec = (ms / 1000).toFixed(1);
//                 const min = (ms / (1000 * 60)).toFixed(1);
//                 const hrs = (ms / (1000 * 60 * 60)).toFixed(1);
//                 const day = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
//                 if (sec < 60) return `${sec} Seconds`;
//                 if (min < 60) return `${min} Minutes`;
//                 if (hrs < 60) return `${hrs} Hours`;
//                 return `${day} Days`;
//               };
//               const reset = until(Date.now(), date);
//               console.debug(`Requests used: ${rem}/${lim} - Reset in ${reset}`);
//               break;
//             }
//             default:
//               break;
//           }
//         }
//         return json;
//       })
//       // Filter for portfolio items
//       .then((repos) => repos.filter((repo) => repo.topics.indexOf('portfolio-item') !== -1))
//       // Set state
//       .then((resp) => this.setState({ repos: resp, isLoading: false }))
//       .then(() => {if (debug) console.log("Repos fetched.")})
//       .catch((error) => {
//         this.setState({ error, isLoading: false });
//         console.log("Error fetching repos.", error, "\n--------PORTFOLIO-------");
//       });
//   }
//   render() {
//     const { classes, theme, user } = this.props;
//     const { repos } = this.state;
//     const variant = theme.palette.type === 'dark' ? 'light' : 'main';
//     const githubTheme = {
//       background: 'transparent',
//       text: `${theme.palette.primary[variant]}`,
//       grade0: theme.palette.background.paperSolid+"20",
//       grade1: theme.palette.primary.main+"22",
//       grade2: theme.palette.primary.main+"55",
//       grade3: theme.palette.primary.main+"88",
//       grade4: theme.palette.primary.main+"AA",
//       grade5: theme.palette.primary.main,
//       // [15, 48] - Max transparency
//       // [63, 111]
//       // [111, 159]
//       // [159, 207]
//       // [207, 255] - Opaque
//       // grade0: `${theme.palette.primary[variant]}${(48 - Math.ceil(32 * theme.opacity)).toString(16)}`, // 00 - Max transparency
//       // grade1: `${theme.palette.primary[variant]}${(111 - Math.ceil(48 * theme.opacity)).toString(16)}`, // 80
//       // grade2: `${theme.palette.primary[variant]}${(159 - Math.ceil(48 * theme.opacity)).toString(16)}`, // A0
//       // grade3: `${theme.palette.primary[variant]}${(207 - Math.ceil(48 * theme.opacity)).toString(16)}`, // C0
//       // grade4: `${theme.palette.primary[variant]}${(255 - Math.ceil(48 * theme.opacity)).toString(16)}`, // FF - No Transparency
//     };
//     const cards = repos.map((repo, i) => (
//       <ProjectCard className={classes.repo} key={repo.full_name} index={i} {...repo} />
//     ));
//     return (
//       <Grid item container spacing={3} xs={12}>
//         <Grid item 
//           xs={12} 
//           data-aos="zoom-in-up"
//         >
//           <Card className={classes.calendarCard}>
//             <CardContent>
//               <GithubCalendar className={classes.calendar}
//                 username={user}
//                 theme={githubTheme}
//                 titleSize={10}
//                 fontSize={14}
//                 blockSize={18}
//                 blockRadius={5}
//                 blockMargin={4}
//                 blockBorderWidth={2}
//                 months={6}
//               >
//                 <ReactTooltip className={classes.tooltip} delayShow={50} html />
//               </GithubCalendar>
//             </CardContent>
//           </Card>
//         </Grid>
//         {cards}
//       </Grid>
//     );
//   }
// };
// export default withTheme(withStyles(
  // theme => {
    // const variant = theme.palette.type === 'dark' ? 'light' : 'main';
    // return ({
      // repo: {
        // height: '100%',
        // flexGrow: 2,
      // },
      // header: {
      //   fontWeight: 'bold',
      //   fontSize: '4rem',
      //   // alignSelf: 'flex-start',
      //   // color: theme.palette.primary[variant],
      //   [theme.breakpoints.down('xs')]: {
      //     fontSize: '3rem',
      //   },
      // },
      // tooltip: {
      //   backgroundColor: `${theme.palette.primary[theme.palette.type]} !important`,
      //   color: `${theme.palette.text.primary} !important`,
      //   '&.place-top': {
      //     '&:after': {
      //       borderTopColor: `${theme.palette.primary[theme.palette.type]} !important`,
      //     },
      //   },
      // },
      // '@keyframes bounce': {
      //   '0%, 100%, 20%, 50%, 80%': {
      //     '-webkit-transform': 'translateY(0)',
      //     '-ms-transform': 'translateY(0)',
      //     transform: 'translateY(0)',
      //   },
      //   '40%': {
      //     '-webkit-transform': 'translateY(-10px)',
      //     '-ms-transform': 'translateY(-10px)',
      //     transform: 'translateY(-10px)',
      //   },
      //   '60%': {
      //     '-webkit-transform': 'translateY(-5px)',
      //     '-ms-transform': 'translateY(-5px)',
      //     transform: 'translateY(-5px)',
      //   },
      // },
    // })
  // })(PortfolioSection));
