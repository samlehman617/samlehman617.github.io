import React from 'react';
import {useTheme} from '@material-ui/core';
import { PSWrapper } from 'react-p5-wrapper';

import { hextoRGB } from '../utils/color';
import { debug } from '../../../App';


function sketch(p) {
    let canvas;
    let t = 0;
    let timeStep = 0.01;

    let spacing = 30;
    let radius = 20;
    let thickness = 10;

    let transparency = 15;
    let color = p.color(...hextoRGB('#28C864'));
    let backgroundColor = p.color(...hextoRGB('#212121'), transparency);

    const init = () => { console.group("WavyBG"); }
    const term = () => { console.groupEnd(); }
    if (debug) init();

    p.setup = () => {
        if (debug) console.log('setup()');
        canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        p.noStroke();
        p.fill(color);
    }

    p.draw = () => {
        // Translucent background (creates trails)
        if (debug) console.log(color, backgroundColor);
        p.background(backgroundColor);

        // Make ellipse grid
        for (let x = 0; x <= p.width; x += spacing) {
            for (let y = 0; y <= p.height + 1; y += spacing) {
                // Circles' starting points depend on mouse position
                const xAngle = p.map(p.mouseX, 0, p.width, -4 * p.PI, 4 * p.PI, true);
                const yAngle = p.map(p.mouseY, 0, p.height, -4 * p.PI, 4 * p.PI, true);
                // Offset by particle's location
                const angle = xAngle * (x / p.width) + yAngle * (y / p.height);
                // Make particles move in circle
                const circleX = x + radius * p.cos(2 * p.PI * t + angle);
                const circleY = y + radius * p.sin(2 * p.PI * t + angle);

                p.ellipse(circleX, circleY, thickness)
            }
        }
        t = t + timeStep;
        if (debug) term();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        //if (newProps.transparency) { transparency = newProps.transparency; }
        if (newProps.color) {
            console.log(newProps.color)
            color = p.color(...hextoRGB(newProps.color));
            p.fill(color);
        }
        if (newProps.backgroundColor) {
            if (debug) console.log(newProps.backgroundColor);
            backgroundColor = p.color(...hextoRGB(newProps.backgroundColor), transparency);
        }
        if (canvas) {

            if (newProps.spacing) { spacing = newProps.spacing; }
            if (newProps.radius) { radius = newProps.radius; }
            if (newProps.thickness) { thickness = newProps.thickness; }
            if (newProps.timeStep) { timeStep = newProps.timeStep; }
        }
    }
}
const Wavy = () => {
    const theme = useTheme();
    return (
        <PSWrapper
            sketch={sketch}
            color={theme.palette.primary.main}
        />
    );
};
export default Wavy;