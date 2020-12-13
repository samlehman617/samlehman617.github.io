import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    FormControl, FormControlLabel,
    // FormGroup,
    InputLabel,
    MenuItem,
    Select,
    withStyles,
    Switch,
} from '@material-ui/core';
import * as presets from '../themes';
// import { usePreset } from './ThemeContext';
import { usePreset, usePresetToggle } from '../context/PresetContext';

const style = (theme) => ({
    headerAction: {
        minWidth: '40%',
    },
    formControl: {
        minWidth: 120,
    },
});

export const PresetToggle = (props) => {
    const [use, toggle] = usePresetToggle();
    return (
        <FormControlLabel
            control={(<Switch onChange={toggle} checked={!use}/>)}
            label="Customize"
            labelPlacement="start"
        />
    );
};
const PresetSwitcher = (props) => {
    const { classes } = props;
    // const [use, name, setUse, setName] = usePreset();
    const [use, name, , setName] = usePreset();

    console.log("PresetSwitcher: use =", use, "name =", name);
    return (
        <FormControl className={clsx(classes.headerAction, classes.formControl)}
            fullWidth
            variant="outlined"
        >
            <InputLabel id="preset-select-label">Preset</InputLabel>
            <Select className={classes.colorSelect}
                labelId="preset-select-label"
                id="preset-select"
                value={name || 'Default'}
                onChange={(e)=>setName(e.target.value)}
                label="Preset"
            >
                <MenuItem value=""><em>None</em></MenuItem>
                {Object.keys(presets).map((p) => (
                    <MenuItem value={p} key={p}>{presets[p].name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

PresetSwitcher.propTypes = {
    classes: PropTypes.object.isRequired,
    default: PropTypes.string,
};

export default withStyles(style)(PresetSwitcher);