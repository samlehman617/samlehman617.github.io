import React from 'react';
import {
    Button,
    Card,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Slide,
    makeStyles,
} from '@material-ui/core';
import CasinoIcon from '@material-ui/icons/Casino';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import SaveIcon from '@material-ui/icons/Save';

import BackgroundTool from './controls/BackgroundTool';
import ColorSelector from './controls/ColorPicker';
import DensitySwitcher from './controls/DensitySwitcher';
import PaletteTypeSwitcher from './controls/PaletteTypeSwitcher';
import PresetSwitcher, { PresetToggle } from './controls/PresetSwitcher';
import PaperTypeSwitcher from './controls/PaperTypeSwitcher';
import SchemaSwitcher from './controls/SchemaSwitcher';
import SpacingSwitcher from './controls/SpacingSwitcher';
import ShapeSwitcher from './controls/ShapeSwitcher';

import { usePreset } from './context/PresetContext';
import Typography from '../Typography';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    paddingLeft: 2,
    paddingRight: 2,
    overflowX: 'hidden',
  },
  title: {
  },
}))

const ThemeMenu = props => {
  const classes = useStyles();
  const { anchorEl, handleClose } = props;
  const [preset] = usePreset();
  return (
    <Dialog id={Boolean(anchorEl) ? 'theme-popover' : undefined}
      maxWidth="md"
      onBackdropClick={handleClose}
      open={Boolean(anchorEl)}
      PaperComponent={Card}
      TransitionComponent={Slide}
    >
      <DialogTitle className={classes.title}>
        <Grid container direction="row" justify="space-between">
          <Grid container item
            xs={6}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Grid item><FormatPaintIcon /></Grid>
            <Grid item><Typography variant="h5">Theme</Typography></Grid>
          </Grid>
          <Grid item><PresetToggle /></Grid>
        </Grid>
      </DialogTitle>

      <DialogContent className={classes.content}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={11}><PresetSwitcher /></Grid>
          <Grid item xs={11}>
            <Collapse in={!preset}>
              <Grid container justify="center" spacing={1}>
                <Grid item xs={12}><PaletteTypeSwitcher /></Grid>
                <Grid item xs={12}><SchemaSwitcher /></Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <Collapse in={!preset}>
            <BackgroundTool />
        </Collapse>
      </DialogContent>
      {/* <DialogActions>
        <Button variant="text"      color="secondary" onClick={props.handleClose}>Cancel</Button>
        <Button variant="outlined"  color="secondary" startIcon={<CasinoIcon />} >Random</Button>
        <Button variant="contained" color="primary"   startIcon={<SaveIcon />}   >Save</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default ThemeMenu;