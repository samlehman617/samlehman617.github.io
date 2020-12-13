import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, useTheme, makeStyles } from '@material-ui/core';

const useColorBarStyles = makeStyles({
    root: props => ({
        display: 'flex',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        float: 'right',
        marginTop: props.spacing(1),
        border: `1px solid ${props.palette.primary.main+"50"}`,
        borderRadius: props.shape.borderRadius,
        overflow: 'hidden',
    }),
    colorSquare: props => ({
        height: 16 + props.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    }),
});

/**
 * Bar of three elements displaying the light, main, and dark variants of the 
 * color provided.
 */
function ColorBar(props) {
    const theme = useTheme();
    const classes = useColorBarStyles(theme);
    const color = theme.palette[props.variant];
    return (
        <Grid item container xs={12} className={classes.root} style={{ borderColor: color.main}}>
            <Grid item xs={4} className={classes.colorSquare} style={{ backgroundColor: color.dark }}>
                <Typography variant="caption" style={{ color: theme.palette.getContrastText(color.dark), textAlign: 'center' }}>
                    <b>Dark</b>
                </Typography>
            </Grid>
            <Grid item xs={4} className={classes.colorSquare} style={{ backgroundColor: color.main }}>
                <Typography variant="caption" style={{ color: theme.palette.getContrastText(color.main), textAlign: 'center' }}>
                    <b>Main</b>
                </Typography>
            </Grid>
            <Grid item xs={4} className={classes.colorSquare} style={{ backgroundColor: color.light }}>
                <Typography variant="caption" style={{ color: theme.palette.getContrastText(color.light), textAlign: 'center' }}>
                    <b>Light</b>
                </Typography>
            </Grid>
        </Grid>
    );
};
ColorBar.propTypes = {
    variant: PropTypes.string,
};
ColorBar.defaultProps = {
    variant: 'primary',
};
export default ColorBar;