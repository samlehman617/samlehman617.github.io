import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, AccordionSummary,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  capitalize,
  useTheme,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageIcon from '@material-ui/icons/Image';
import StopIcon from '@material-ui/icons/Stop';

// import { SectionControls } from './EffectControls';
// import { BackgroundContext, BackgroundProvider} from '../context/BackgroundContext';
import { SectionControls } from './SectionControls';
import { useSchema } from '../context/SchemaContext';
import * as footers from '../../footers';
import * as headers from '../../headers';
import * as backgrounds from '../../backgrounds';

const pages = ["landing", "about", "portfolio", "resume", "features", "pricing" ];

const defaultPage = (name) => ({
  name: name,
  effect: "Snow",
  base: "solid",
  header: "Wave",
  footer: "Wave",
});

const styles = (theme) => ({
  accordionRoot: {
    // width: '100%',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
});

function BackgroundTool(props) {
  const { classes } = props;
  const theme = useTheme();

  const [schema, setSchema] = useSchema(1);

  console.log(
    "BackgroundTool:", schema,
    "\nBackgrounds:", Object.entries(backgrounds),
    "\n    Headers:", Object.entries(headers),
    "\n    Footers:", Object.entries(footers),
  );

  const [first, setFirst] = useState(defaultPage('first'));
  const [last, setLast] = useState(defaultPage('last'));
  const [middleOdd, setMiddleOdd] = useState(defaultPage('middleOdd'));
  const [middleEven, setMiddleEven] = useState(defaultPage('middleEven'));

  let sections = [first];
  let setters = [setFirst];
  switch (schema) {
    case 1:
      sections = [first];
      setters = [setFirst];
      break;
    case 2:
      sections = [middleOdd, middleEven];
      setters = [setMiddleOdd, setMiddleEven];
      break;
    case 3:
      sections = [first, middleOdd, last];
      setters = [setFirst, setMiddleOdd, setLast];
      break;
    case 4:
      sections = [first, middleOdd, middleEven, last];
      setters = [setFirst, setMiddleOdd, setMiddleEven, setLast];
      break;
    default: break;
  }

  return (
      <>
        {sections.map((section, i) => (
          <SectionControls
            section={section.name}
            setter={setters[i]}
            index={i}
            key={i}
          />
        ))}
      </>
  );
};

BackgroundTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackgroundTool);