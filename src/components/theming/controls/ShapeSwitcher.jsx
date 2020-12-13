import React from 'react';
import { FormLabel, Grid, IconButton, Input } from '@material-ui/core';
import IncreaseIcon from '@material-ui/icons/AddCircleOutline';
import DecreaseIcon from '@material-ui/icons/RemoveCircleOutline';
import { useShape } from '../context/ThemeContext';
import * as presets from '../themes';
const defaultPreset = presets['Default'];

const maxBorderRadius = 40;

const ShapeSwitcher = (props) => {
    const [borderRadius, setBorderRadius, increaseBorderRadius, decreaseBorderRadius] = useShape();
    return (
        <Grid item xs={12} sm={6}>
            <FormLabel>BorderRadius</FormLabel>
            <IconButton aria-label={'Decrease BorderRadius'} onClick={decreaseBorderRadius}>
                <DecreaseIcon />
            </IconButton>
            <Input variant="filled"
                value={borderRadius|| defaultPreset.shape.borderRadius}
                onChange={setBorderRadius}
                inputProps={{
                    step: 2,
                    min: 0,
                    max: maxBorderRadius,
                    type: 'number',
                    variant: 'filled',
                    'aria-labelledby': 'input-slider',
                }}
            />
            <IconButton aria-label={'Increase BorderRadius'} onClick={increaseBorderRadius}>
                <IncreaseIcon />
            </IconButton>
        </Grid>
    );
}
export default ShapeSwitcher;