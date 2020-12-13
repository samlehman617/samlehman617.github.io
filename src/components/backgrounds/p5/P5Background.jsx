import React from 'react';

// import { debug } from '../../../App';
import { useTheme } from '@material-ui/core';
import P5Wrapper from 'react-p5-wrapper';
import DVDMenu from "./DVDMenu";
import GameOfLife from "./GameOfLife";
import MagneticField from "./MagneticField";
import Rain from "./Rain";
import Starfield from "./Starfield";
import TenPrint from "./TenPrint";
import Terrain from "./Terrain";
import Wavy from "./Wavy";

const P5Background = props => {
    const theme = useTheme();
    // if (debug) {
    //     console.group("P5Background");
    //     console.log(props);
    //     console.log("Primary:", theme.palette.primary.main);
    //     console.log("Secondary:", theme.palette.secondary.main);
    //     console.log("Background:", theme.palette.background.default);
    // }
    let sketch = TenPrint;
    switch(props.sketch) {
        case 'DVDMenu':
            sketch = DVDMenu;
            break;
        case 'GameOfLife':
            sketch = GameOfLife;
            break;
        case 'MagneticField':
            sketch = MagneticField;
            break;
        case 'Rain':
            sketch = Rain;
            break;
        case 'Starfield':
            sketch = Starfield;
            break;
        case 'TenPrint':
            sketch = TenPrint;
            break;
        case 'Terrain':
            sketch = Terrain;
            break;
        case 'Wavy':
            sketch = Wavy;
            break;
        default:
            sketch = TenPrint;
            break;
    }
    // if (debug) console.log("Using sketch...", props.sketch, sketch);
    return (
        <P5Wrapper 
            sketch={sketch} 
            primaryColor={theme.palette.primary.main}
            secondaryColor={theme.palette.secondary.main}
            backgroundColor={theme.palette.background.default}
            color={theme.palette.primary.main || "#FFFFFF"} 
        />
    );
};

export default P5Background;