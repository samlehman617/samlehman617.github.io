import React, {useState} from 'react';
import {
    Accordion, AccordionActions, AccordionDetails, AccordionSummary,
    Badge,
    Typography,
    capitalize,
    makeStyles,
} from '@material-ui/core';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderOuterIcon from '@material-ui/icons/BorderOuter';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatLineSpacingIcon from '@material-ui/icons/FormatLineSpacing';
import NoteIcon from '@material-ui/icons/Note';
import PaletteIcon from '@material-ui/icons/Palette';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  headingIcon: {
    marginRight: 10,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export const SettingsGroup = (props) => {
  const classes = useStyles();
  const { children, name, open } = props;
  const [expanded, setExpanded] = useState(open);
  const [changed, setChanged] = useState(false);
  const handleExpand = () => {
      setExpanded(!expanded);
  };
  const Icon =
    name === 'colors' ? PaletteIcon :
    name === 'spacing' ? FormatLineSpacingIcon :
    name === 'paper' ? NoteIcon :
    name === 'background' ? BorderOuterIcon :
    name === 'header' ? BorderTopIcon :
    name === 'footer' ? BorderBottomIcon : PaletteIcon;

  return (
    <Accordion
      className={classes.root}
      expanded={expanded}
      onChange={handleExpand}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
      >
        <Badge className={classes.headingIcon} 
          color="primary"
          variant="dot"
          invisible={!changed}
        >
          <Icon />
        </Badge>
        <Typography className={classes.heading}>
          {capitalize(name)}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
export default SettingsGroup;