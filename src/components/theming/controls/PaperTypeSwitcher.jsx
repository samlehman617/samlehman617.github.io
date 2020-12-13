import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    withStyles,
} from '@material-ui/core';
import { usePaper } from '../context/ThemeContext';
import * as presets from '../themes';
const defaultPreset = presets['Default'];

const style = (theme) => ({
    headerAction: {
        minWidth: '40%',
    },
    formControl: {
        minWidth: 120,
    },
});

const PaperTypeSwitcher = (props) => {
    const { classes } = props;
    const [
        paper,
        , , // setPaper,
        setPaperMaterial,
        , , // setPaperElevation,
        , , // setPaperOpacity,
        , , // setPaperBlur
    ] = usePaper();
    const {
        material,
        // elevation,
        // opacity,
        // blur
    } = paper;
    return (
        <FormControl
            fullWidth
            variant="outlined"
            className={clsx(classes.headerAction, classes.formControl)}
        >
            <InputLabel id="paperType-select-label">Paper Type</InputLabel>
            <Select
                labelId="paperType-select-label"
                id="paperType-select"
                value={material || defaultPreset.paper.material}
                onChange={(e) => setPaperMaterial(e.target.value)}
                label="Paper Type"
                className={classes.paperTypeSelect}
            >
                <MenuItem value="None"><em>None</em></MenuItem>
                <MenuItem value="Glass">Glass</MenuItem>
                <MenuItem value="Paper">Paper</MenuItem>
                <MenuItem value="Outlined">Outlined</MenuItem>
            </Select>
        </FormControl>
    );
}
PaperTypeSwitcher.propTypes = {
    classes: PropTypes.object.isRequired,
    default: PropTypes.string,
};
export default withStyles(style)(PaperTypeSwitcher);