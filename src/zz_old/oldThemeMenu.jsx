import React, { useState } from 'react';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
//import { render } from '@testing-library/react';
import ColorChangePicker from '../../shared/components/ColorChangeButton';
import { CirclePicker, GithubPicker, TwitterPicker } from 'react-color';
import {
    Backdrop,
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputLabel,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Select,
    Slider,
    Switch,
    Typography,
    makeStyles,
    withStyles,
    Avatar,
    InputAdornment,
} from '@material-ui/core';

import { blue, red, pink, purple, green, yellow, cyan, deepOrange as orange, } from '@material-ui/core/colors';


import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import CasinoIcon from '@material-ui/icons/Casino';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import PaletteIcon from '@material-ui/icons/Palette';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    card: {
        // maxWidth: '700px',
        maxWidth: theme.breakpoints.values['sm'],
    },
    headerAction: {
        minWidth: '40%',
    },
    colorItem: {
        position: 'absolute',
        // top: 0,
        left: 0,
        width: '40px',
        height: '40px',
        // height: '100%',
        // margin: 'auto',
        margin: 0,
        zIndex: theme.zIndex.appBar
        // marginRight: theme.spacing(2),
        // marginTop: 'auto',
        // marginBottom: 'auto',
        // borderRadius: theme.shape.borderRadius,
        // display: 'inline-block',
    },
    colorList: {
        display: 'inline-flex',
        margin: 'auto',
        paddingLeft: 48 + theme.spacing(1),
        // backgroundColor: theme.palette.primary.main,
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
        // width: '100%',
    },
    popover: {
        marginTop: theme.spacing(2),
        //maxWidth: '600px',
    },
    blue: {
        backgroundColor: blue[500],
        color: '#fff',
    },
    red: {
        backgroundColor: red[500],
        color: '#fff',
    },
    orange: {
        backgroundColor: orange[500],
    },
    green: {
        backgroundColor: green[500],
    },
    pink: {
        backgroundColor: pink[500],
        color: '#fff',
    },
    purple: {
        backgroundColor: purple[500],
        color: '#fff',
    },
    yellow: {
        backgroundColor: yellow[500],
    },
    cyan: {
        backgroundColor: cyan[500],
    }
}));

function ThemeMenu(props) {
    const classes = useStyles();
    const open = Boolean(props.anchorEl);
    const id = open ? 'theme-popover' : undefined;
    
    const [preset, setPreset] = useState('');
    const [darkMode, setDarkMode] = useState('system');
    const [primary, setPrimary] = useState('pink');
    const [secondary, setSecondary] = useState('purple');
    const [bgEffect, setBgEffect] = useState('wave');
    const [bgBase, setBgBase] = useState('solid');
    const [borderRadius, setBorderRadius] = useState(4);
    const [spacing, setSpacing] = useState(0);
    const [font, setFont] = useState('roboto');
    const [textEffect, setTextEffect] = useState('');
    const [paperType, setPaperType] = useState(0);

    const handleChange = (event, field) => {
        if (field == "preset") {
            setPreset(event.target.value);
        } else if (field == "bgBase") {
            setBgBase(event.target.value);
        }
        
        console.log(`THEME: ${field} set to`, event.target.value);
    };
    const handleDarkButtonClick = (value) => {
        setDarkMode(value);
        console.log("THEME: DarkMode set to", value)
    };

    return (
        // <>
        <Backdrop open={open} className={classes.backdrop} onClick={props.handleClose}>
            <Popover
                className={classes.popover}
                id={id}
                open={open}
                anchorEl={props.anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Card className={classes.card}>
                    <CardHeader 
                        className={classes.header}
                        title={<Typography variant="h5">Theme</Typography>} 
                        avatar={<FormatPaintIcon />}
                        // action={<Switch label="Use preset"/>}
                        action={
                            <FormControl fullWidth variant="outlined" className={clsx(classes.headerAction, classes.formControl)}>
                                <InputLabel id="preset-select-label">Preset</InputLabel>
                                <Select 
                                    labelId="preset-select-label"
                                    id="preset-select"
                                    value={preset}
                                    onChange={(e) => handleChange(e, 'preset')}
                                    label="Preset"
                                    className={classes.colorSelect}
                                >
                                    <MenuItem value=""><ListItemAvatar></ListItemAvatar><em>None</em></MenuItem>
                                    <MenuItem value="Snow">Winter Wonderland</MenuItem>
                                    <MenuItem value="Void">Void</MenuItem>
                                </Select>
                            </FormControl>
                        }
                    />
                    <CardContent>
                    <form className={classes.form} autoComplete="off">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={12}><FormLabel component="legend">Colors</FormLabel></Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <ButtonGroup fullWidth color="primary" aria-label="dark mode button group" label={<FormLabel component="legend">Colors</FormLabel>} disableElevation >
                                        <Button 
                                            disableElevation
                                            variant={darkMode === "dark" ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('dark')}
                                            startIcon={<NightsStayIcon/>}
                                            value="dark"
                                        >
                                            Dark
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={darkMode === "light" ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('light')}
                                            startIcon={<Brightness5Icon/>}
                                            value="light"    
                                        >Light</Button>
                                        <Button
                                            disableElevation
                                            variant={darkMode === "system" ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('system')}
                                            startIcon={<BrightnessAutoIcon/>}
                                            value="system"
                                        >System</Button>
                                    </ButtonGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" color="primary" className={classes.formControl}>
                                    <ButtonGroup fullWidth>
                                        <ColorChangePicker />
                                        <ColorChangePicker color="secondary"/>
                                    </ButtonGroup>
                                </FormControl>
                            </Grid>

                            {/* <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined" color="secondary" className={classes.formControl}>
                                    <InputLabel id="secondary-select-label">Secondary Color</InputLabel>
                                    <Select 
                                        labelId="secondary-select-label"
                                        id="secondary-select"
                                        value={secondary}
                                        onChange={(e) => handleChange(e, 'secondary')}
                                        startAdornment={<InputAdornment position="start"><div className={clsx(classes.colorItem, classes.purple)}/></InputAdornment>}
                                        label="Secondary Color"
                                    >
                                        <MenuItem className={clsx(classes.colorList, classes.cyan)} value="cyan"><div className={clsx(classes.colorItem, classes.cyan)}/><ListItemText>Cyan</ListItemText></MenuItem>
                                        <MenuItem className={clsx(classes.colorList, classes.blue)} value="blue"><div className={clsx(classes.colorItem, classes.blue)} />Blue</MenuItem>
                                        <MenuItem className={clsx(classes.colorList, classes.purple)} value="purple"><div className={clsx(classes.colorItem, classes.purple)}/>Purple</MenuItem>
                                        <MenuItem className={clsx(classes.colorList, classes.pink)} value="pink"><div className={clsx(classes.colorItem, classes.pink)}/><ListItemText>Pink</ListItemText></MenuItem>
                                        <MenuItem className={clsx(classes.colorList, classes.red)} value="red"><div className={clsx(classes.colorItem, classes.red)}/>Red</MenuItem>
                                        <MenuItem className={clsx(classes.colorList, classes.orange)} value="orange"><div className={clsx(classes.colorItem, classes.orange)}/>Orange</MenuItem>                                
                                        <MenuItem className={clsx(classes.colorList, classes.yellow)} value="yellow"><div className={clsx(classes.colorItem, classes.yellow)}/>Yellow</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid> */}
                            <Grid item xs={12}><FormLabel component="legend">Background</FormLabel></Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="filled" className={classes.formControl}>
                                <InputLabel id="bgbase-select-label">Base</InputLabel>
                                <Select 
                                    labelId="bgbase-select-label"
                                    id="bgbase-select"
                                    value={bgBase}
                                    onChange={(e) => handleChange(e, "bgbase")}
                                    label="Base"
                                >
                                    <MenuItem value="solid"><em>Solid</em></MenuItem>
                                    <MenuItem value="image">Image</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="filled" className={classes.formControl}>
                                <InputLabel id="bgeffect-select-label">Effect</InputLabel>
                                <Select 
                                    labelId="bgeffect-select-label"
                                    id="bgeffect-select"
                                    value={bgEffect}
                                    onChange={(e) => handleChange(e, 'bgeffect')}
                                    label="Effect"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="wave">Wave</MenuItem>
                                    <MenuItem value="hilbert">Hilbert</MenuItem>
                                    <MenuItem value="tenprint">Ten Print</MenuItem>
                                    <MenuItem value="stars">Stars</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={12}><FormLabel component="legend">Spacing</FormLabel></Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <ButtonGroup fullWidth color="primary" aria-label="dark mode button group">
                                        <Button 
                                            disableElevation
                                            variant={darkMode === "dark" ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('dark')}
                                            value="dark"
                                        >Default</Button>
                                        <Button
                                            disableElevation
                                            variant={darkMode === "light" ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('light')}
                                            value="light"    
                                        >Dense</Button>
                                        <Button
                                            disableElevation
                                            variant={darkMode === "system" ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('system')}
                                            value="system"
                                        >Comfortable</Button>
                                    </ButtonGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}><FormLabel component="legend">Paper</FormLabel></Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <ButtonGroup fullWidth color="primary" aria-label="dark mode button group">
                                        <Button 
                                            disableElevation
                                            variant={paperType === 0 ? "contained" : "outlined"}
                                            onClick={(e) => handleDarkButtonClick('dark')}
                                            value={0}
                                        >Default</Button>
                                        <Button
                                            disableElevation
                                            variant={paperType === 1 ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('light')}
                                            value={1}   
                                        >None</Button>
                                        <Button
                                            disableElevation
                                            variant={paperType === 2 ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('system')}
                                            value={2}
                                        >Colorful</Button>
                                        <Button
                                            disableElevation
                                            variant={paperType === 3 ? "contained" : "outlined"}
                                            onClick={() => handleDarkButtonClick('system')}
                                            value={3}
                                        >Glass</Button>
                                    </ButtonGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={11}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="borderRadius-slider-label">Border Radius</InputLabel>
                                    <Slider
                                        labelId="borderRadius-slider-label"
                                        id="borderRadius-slider"
                                        value={borderRadius}
                                        label="Border Radius"
                                    >

                                    </Slider>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}><FormLabel component="legend">Text</FormLabel></Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="filled" className={classes.formControl}>
                                    <InputLabel id="font-select-label">Font</InputLabel>
                                    <Select 
                                        labelId="font-select-label"
                                        id="font-select"
                                        value={font}
                                        onChange={(e) => handleChange(e, 'font')}
                                        label="Font"
                                    >
                                        <MenuItem value="roboto">Roboto</MenuItem>
                                        <MenuItem value="roboto_condensed">Roboto Condensed</MenuItem>
                                        <MenuItem value="orange">Orange</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="filled" className={classes.formControl}>
                                    <InputLabel id="textEffect-select-label">Effect</InputLabel>
                                    <Select 
                                        labelId="textEffect-select-label"
                                        id="textEffect-select"
                                        value={textEffect}
                                        onChange={(e) => handleChange(e, 'textEffect')}
                                        label="Effect"
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="zalgo">Zalgo</MenuItem>
                                        <MenuItem value="smallcaps">Small Caps</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="secondary" startIcon={<SaveIcon />}>Save</Button>
                        <Button variant="contained" color="primary" startIcon={<CasinoIcon />}>Random</Button>
                        <Button variant="text" color="secondary" onClick={props.handleClose}>Cancel</Button>
                    </CardActions>
                </Card>
            </Popover>
        </Backdrop>
        // <Backdrop open={open}/>
        // </>
    );
};

export default ThemeMenu;