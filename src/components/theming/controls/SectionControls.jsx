import React, { useState } from 'react';
import {
  Accordion, AccordionActions, AccordionDetails, AccordionSummary,
  Button,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CasinoIcon from '@material-ui/icons/Casino';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';

import { useSchema } from '../context/SchemaContext';

import SettingsGroup from './SettingsGroup';

import ColorSelector from './ColorPicker';
import DensitySwitcher from './DensitySwitcher';
import EffectControls from './EffectControls';
import PaperTypeSwitcher from './PaperTypeSwitcher';
import ShapeSwitcher from './ShapeSwitcher';
import SpacingSwitcher from './SpacingSwitcher';
import { capitalize } from '../../../utils/text';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    display: 'flex',
    flex: 'column wrap',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export const SectionControls = props => {
  const { section, setter, index } = props;
  const classes = useStyles();

  const [expanded, setExpanded] = useState(index === 0);
  const [changes, setChanges] = useState(0);
  const handleExpand = () => setExpanded(!expanded);
  console.log("Section:", section);

  return (
    <Accordion
      key={section}
      expanded={expanded}
      onChange={handleExpand}
      square={true}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`section-${section}-content`}
      >
        <Typography className={classes.heading}>
          {capitalize(section)+" Section"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* className={classes.root} */}
        <Grid container>
          <SettingsGroup name="colors">
            <ColorSelector variant="primary" />
            <ColorSelector variant="secondary" />
          </SettingsGroup>
          <SettingsGroup name="spacing">
            <DensitySwitcher />
            <SpacingSwitcher />
          </SettingsGroup>
          <SettingsGroup name="paper">
            <ShapeSwitcher />
            <PaperTypeSwitcher />
          </SettingsGroup>
          <SettingsGroup name="background" >
            <EffectControls section={section} controls="background" default="Snow"/>
          </SettingsGroup>
          <SettingsGroup name="header" >
            <EffectControls section={section} controls="header" default="Wave"/>
          </SettingsGroup>
          <SettingsGroup name="footer" >
            <EffectControls section={section} controls="footer" default="Wave"/>
          </SettingsGroup>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Button>Cancel</Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CasinoIcon />}
        >
          Random
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </AccordionActions>
    </Accordion>
  );
};