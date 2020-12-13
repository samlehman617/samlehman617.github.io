import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button, ButtonGroup,
    FormControl, FormControlLabel, FormGroup, FormLabel,
    Grid,
    Input, InputAdornment, InputLabel,
    MenuItem,
    ListItemIcon, //as DefaultListItemIcon,
    ListItemText,
    Radio,
    Select,
    // Slider, // as DefaultSlider,
    Switch,
    TextField,
    Typography,
    capitalize,
    useTheme,
    withStyles,
} from '@material-ui/core';
import SettingsGroup from './SettingsGroup';
import {
  createMenuItem,
  IconSelect,
  // IconMenuItem
} from '../../IconSelect';
import Slider from '../../Slider';
import ColorAvatar from '../../ColorAvatar';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IncreaseIcon from '@material-ui/icons/AddCircleOutline';
// import DecreaseIcon from '@material-ui/icons/RemoveCircleOutline';
// import { BackgroundContext, BackgroundProvider } from './BackgroundContext';
import * as backgrounds from '../../backgrounds';
import * as footers from '../../footers';
import * as headers from '../../headers';
// import ColorPicker from './ColorPicker';
import ColorSelector from './ColorPicker';
import DensitySwitcher from './DensitySwitcher';
import ShapeSwitcher from './ShapeSwitcher';
import SpacingSwitcher from './SpacingSwitcher';
import PaperTypeSwitcher from './PaperTypeSwitcher';


const createToggle = (name, value, baseId, handler) => {
  console.log(
    "Creating toggle:",
    "\n  Value:", value,
    "\n     ID:", baseId,
  );
  return (
    <FormControlLabel
      control={
        <Switch
          id={baseId + '-switch'}
          labelId={baseId + '-switch-label'}
          // onChange={handler}
          value={value}
        />
      }
      label={capitalize(name)}
      labelPlacement="start"
    >
    </FormControlLabel>
  );
};
const createValueSlider = (name, value, baseId, min=0, max, step=1, handlers) => {
  console.log(
    "Creating value slider:",
    "\n  Value:", value,
    "\n     ID:", baseId,
  );
  return (
    <div style={{ height: '100%' }}>
      <Typography>{capitalize(name)}</Typography>
      <FormControl fullWidth>
        <Slider
          id={baseId + '-slider'}
          labelId={baseId+'-slider-label'}
          onBlur={handlers['blur']}
          onChange={handlers['change']}
          min={min}
          max={max}
          step={step}
          value={value}
          valueLabelDisplay='auto'
        />
      </FormControl>
    </div>
  );
};
const createRangeSlider = (name, values, baseId, min = 0, max, step = 1, handlers) => {
  console.log(
    "Creating range slider:",
    "\n Values:", values,
    "\n     ID:", baseId,
  );
  return (
    <Slider
      id={baseId +name+ '-slider'}
      key={baseId+name}
      labelId={baseId +name+ '-slider-label'}
      onBlur={handlers['blur']}
      onChange={handlers['change']}
      min={min}
      max={max}
      step={step}
      value={values}
    />
  );
};
const createOptionSelect = (name, value, values, baseId, icons, handler) => {
  console.log(
    "Creating option select:",
    "\n    Name:", name,
    "\n Default:", value,
    "\n Options:", values,
    "\n   Icons:", icons, Array.isArray(icons) ? icons.length : false,
    Object.entries(values), "..."
  );

  let items = [];
  for (const [i, value] of Object.entries(values)) {
    const id = baseId + "-" + value;
    items.push(createMenuItem(value, null, id));
  }

  return (
    <IconSelect
      fullWidth
      id={baseId}
      // onChange={handler}
      value={values[0]}
      variant="outlined"
      title={name}
    >
      {items}
    </IconSelect>
  );
}

const EffectSettingControl = props => {
  const {
    icon: Icon,
    id,
    effectName,
    settingName,
    values, icons, name, setter, min, max, step, description,
  } = props;
  console.log(
    "EffectSettingControl:", settingName,
    "\n   Effect Name:", effectName,
    "\n  Setting Name:", settingName,
    "\n    All Values:", values,
    "\n Default Value:", values[0],
    "\n          Type:", typeof values[0],
  );

  const type = values.length >= 2 ?
    typeof values[0] === "number" ?
      "range" :
      "options" :
    typeof values[0];
      
  console.log("EffectSettingControl:  type =", type);
  const value = Array.isArray(values) ? values[0] : values;
  const [state, setState] = useState(value);
  console.log("EffectSettingControl: value =", value);

  const handleBlur = () => {
    if (state.length === 1) {
      if      (state < min) setState(min);
      else if (state > max) setState(max);
    } else {
      if      ((state[0] < min) && (state[1] < min)) setState([min, min]);
      else if ((state[0] < min) && (state[1] > max)) setState([min, max]);
      else if  (state[0] < min)                      setState([min, state[1]]);
      else if ((state[0] > max) && (state[1] < min)) setState([max, min]);
      else if ((state[0] > max) && (state[1] > min)) setState([max, max]);
      else if  (state[0] > max)                      setState([max, state[1]]);
      else if                      (state[1] < min)  setState([state[0], min]);
      else if                      (state[1] > max)  setState([state[0], max]);
    }
  };
  const handleChange = (value) => {
    setState(value);
  };
  // const Adornment = React.isValidElement(<Icon/>) ? (<InputAdornment position="start"><Icon /></InputAdornment>) : null;
  let Control;
  const handlers = {
    blur: handleBlur,
    change: handleChange,
  };
  switch (type) {
    case "boolean": Control = createToggle(settingName, state, id, handlers['change']); break;
    case "number":  Control = createValueSlider(settingName, state, id, min, max, step, handlers); break; 
    case "range":   Control = createRangeSlider(settingName, state, id, min, max, step, handlers); break;
    case "string":  Control = TextField; break;
    case "color":   break;// Control = ColorPicker; break;
    case "options": Control = createOptionSelect(settingName, state, values, id, icons, handlers['change']); break;
    case "object": console.log("EffectSettingControl: OBJECT RECEIVED.", type, values); break;
    default: console.log("EffectSettingControl: Unknown type received:", type, values); break;
  }

  return (
    <Grid item
      xs={6}
      key={`${id}`}
    >
      {Control}
    </Grid>
  );
};
EffectSettingControl.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  icons: PropTypes.arrayOf(PropTypes.node),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  values: PropTypes.arrayOf(
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ),
  setter: PropTypes.func,
};

const effectControlsStyles = (theme) => ({

});
/**
 * Shows controls for a single effect.
 * Each section should create three...one for each (header, footer, background).
 * @param {string} props.section Name of the page section the elements control.
 * @param {string} props.controls Effect type the elements control ('header' | 'footer' | 'background')
 */
const EffectControls = (props) => {
  const { section, controls } = props;

  const [expanded, setExpanded] = useState(true);
  const handleAccordion = () => {
    setExpanded(!expanded)
  }
  // Use the appropriate type of effects
  const effects =
    controls === 'background' ? backgrounds :
      controls === 'header' ? headers :
        controls === 'footer' ? footers :
          controls === 'mouse' ? null : backgrounds;

  const [effectName, setEffectName] = useState(props.default);
  const name = capitalize(effectName);
  // Select our current effect
  const currEffect = effects[name];
  console.log("Effect:", controls, "=", name, currEffect);
  // TODO: Build proper initial state
  // const [settings, setSettings] = useState(currEffect.args);

  // Generate menu items for effect selector
  let menuItems = [], settingsControls = [];
  for (const [name, entry] of Object.entries(effects)) {
    const { shortname, icon, args } = entry;
    console.log(
      "Effect:", name + ": ", entry,
      "\nName:", shortname,
      "\nIcon:", icon,
      "\nArgs:", args
    );
    const effectBaseId = `${section}-${controls}-${name}`;
    menuItems.push(createMenuItem(name, icon, effectBaseId));

    // Generate controls for the effect's settings.
    if (name === effectName) {
      for (const [settingName, settingData] of Object.entries(args)) {
        const baseId = `${effectBaseId}-${settingName}`
        console.log(
          "Creating", settingName, "setting for", name + ":",
          "\nSetting    Name:", settingName,
          "\nSetting      ID:", baseId,
          "\nSetting Default:", settingData.values[0],
          "\nSetting Options:", settingData.values,
          "\nSetting    Data:", settingData
        );
        const newControl = (
          <EffectSettingControl
            id={baseId}
            settingName={settingName}
            effectName={effectName}
            key={baseId}
            {...settingData}
          />
        )
        settingsControls.push(newControl);
      }
    }
  }
  const bg = controls === 'background';

  return (
    // <Accordion
    //   key={section+controls}
    //   expanded={expanded}
    //   onChange={handleAccordion(!expanded)}
    // >
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls={`subpanel-header`}
    //     id={`subpanel-header`}
    //   >
    //     <Typography>{capitalize(controls)}</Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
        <Grid container item
          xs={12}
          sm={bg ? 12 : 12}
          md={12}
          direction="row"
          justify="space-between"
          alignItems="stretch"
          key={`${section}-${controls}`}
          spacing={1}
        >
          {/* <Grid item xs={12}><Typography>{capitalize(controls)}</Typography></Grid> */}
          <Grid item xs={12}>
            <IconSelect
              value={effectName}
              variant="outlined"
              title="Effect"
            >
              {menuItems}
            </IconSelect>
          </Grid>
          {settingsControls}
        </Grid>
    //   </AccordionDetails>
    // </Accordion>
  );
};
EffectControls.propTypes = {
  default: PropTypes.string,
  defaultValues: PropTypes.object,
  section: PropTypes.string,
  controls: PropTypes.oneOf(["background", "header", "footer", "mouse"]),
};
EffectControls.defaultProps = {
  default: 'Snow',
  section: 'first',
  controls: 'background',
};

export const SectionControls = props => {
  const { section } = props;
  const [expanded, setExpanded] = useState({ color: true, });
  const handleExpand = (cat, val) => {
    setExpanded({ ...expanded, cat: val });
  }
  console.log("Section:", section);

  return (
    <>
      <SettingsGroup name="colors">
        <ColorSelector variant="primary" />
        <ColorSelector variant="secondary" />
      </SettingsGroup>
      <SettingsGroup name="spacing">
        <DensitySwitcher />
        <SpacingSwitcher />
      </SettingsGroup>
      <ShapeSwitcher />
      <PaperTypeSwitcher />
      <SettingsGroup name="background" >
          <EffectControls section={section} controls="background" default="Snow"/>
      </SettingsGroup>
      <SettingsGroup name="header" >
          <EffectControls section={section} controls="header" default="Wave"/>
      </SettingsGroup>
      <SettingsGroup name="footer" >
          <EffectControls section={section} controls="footer" default="Wave"/>
      </SettingsGroup>
        {/* <Grid container item
          direction="row"
          alignItems="flex-start"
          justify="space-evenly"
          xs={12}
          spacing={1}
          key={section}
        >
        </Grid> */}
    </>
  );
};

export default withStyles(effectControlsStyles)(EffectControls);