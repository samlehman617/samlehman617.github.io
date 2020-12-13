import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, ButtonGroup,
    FormControl, FormLabel,
    withStyles,
} from '@material-ui/core';

import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import NightsStayIcon from '@material-ui/icons/NightsStay';

// import { PaletteTypeContext } from './PaletteTypeContext';
import { useThemeMode } from '../context/ThemeContext';

const style = (theme) => ({
    formControl: {
        minWidth: 120,
    },
});

const PaletteTypeSwitcher = (props) => {
    const { classes } = props;
    const [paletteType, setPaletteType] = useThemeMode();
    return (
            <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
            >
                <ButtonGroup
                    fullWidth
                    aria-label="dark mode button group"
                    label={<FormLabel component="legend">Colors</FormLabel>}
                >
                    <Button
                        disableElevation
                        color={paletteType === 'dark' ? 'primary' : 'default'}
                        variant={paletteType === "dark" ? "contained" : "outlined"}
                        onClick={() => setPaletteType('dark')}
                        startIcon={<NightsStayIcon />}
                    >
                        Dark
                </Button>
                    <Button
                        disableElevation
                        color={paletteType === 'light' ? 'primary' : 'default'}
                        variant={paletteType === "light" ? "contained" : "outlined"}
                        onClick={() => setPaletteType('light')}
                        startIcon={<Brightness5Icon />}
                    >
                        Light
                </Button>
                    <Button
                        disableElevation
                        color={paletteType === 'system' ? 'primary' : 'default'}
                        variant={paletteType === "system" ? "contained" : "outlined"}
                        onClick={() => setPaletteType('system')}
                        startIcon={<BrightnessAutoIcon />}
                    >
                        System
                </Button>
                </ButtonGroup>
            </FormControl>
    );
};
PaletteTypeSwitcher.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(PaletteTypeSwitcher);