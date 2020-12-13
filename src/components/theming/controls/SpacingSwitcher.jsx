import React from 'react';
import { FormGroup, FormLabel, Grid, IconButton, Input } from '@material-ui/core';
import IncreaseIcon from '@material-ui/icons/AddCircleOutline';
import DecreaseIcon from '@material-ui/icons/RemoveCircleOutline';
import { useSpacing } from '../context/ThemeContext';
import * as presets from '../themes';
const defaultPreset = presets['Default'];

const minSpacing = 0;
const maxSpacing = 20;

const SpacingSwitcher = (props) => {
    const [spacing, setSpacing, increaseSpacing, decreaseSpacing] = useSpacing();
    return (
        <Grid item xs={12} sm={6}>
            <FormGroup row>
            <FormLabel>Spacing</FormLabel>
            <IconButton aria-label={'Decrease Spacing'} onClick={decreaseSpacing}>
                <DecreaseIcon />
            </IconButton>
            <Input
                value={spacing || defaultPreset.spacing}
                margin="dense"
                variant="filled"
                onChange={(v) => setSpacing(v)}
                inputProps={{
                    step: 1,
                    min: minSpacing,
                    max: maxSpacing,
                    type: 'number',
                    variant: 'filled',
                    'aria-labelledby': 'input-slider',
                }}
            />
            <IconButton aria-label={'increase spacing'} onClick={increaseSpacing}>
                <IncreaseIcon />
            </IconButton>
            </FormGroup>
        </Grid>
    );
}
export default SpacingSwitcher;