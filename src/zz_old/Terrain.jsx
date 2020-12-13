import React from 'react';
import PSWrapper from 'react-p5-wrapper';
import { useTheme } from '@material-ui/core';

import { hextoRGB } from '../utils/color';
import { debug } from '../../../App';

function sketch(p,
    width = window.innerWidth,
    height = window.innerHeight,
    speed = 10,
) {
    let cols, rows;
    let scl = 20;
    let w = 1400;
    let h = 1000;
    let canvas;
    let flying = 0;
    let terrain = [];

    let stroke_color = hextoRGB("#FFFFFF");

    p.setup = () => {
        canvas = p.createCanvas(width, height, p.WEBGL);
        cols = w / scl;
        rows = h / scl;

        for (let x = 0; x < cols; x++) {
            terrain[x] = [];
            for (let y = 0; y < rows; y++) {
                terrain[x][y] = 0; // Temporary default
            }
        }
    }
    p.draw = () => {
        p.clear();
        p.stroke(p.color(stroke_color));
        flying -= 0.1;
        let yoff = flying;
        for (let y=0; y<rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
                xoff += 0.2;
            }
            yoff += 0.2
        }
        p.translate(0, 50);
        p.rotateX(p.PI / 2.5);
        p.fill(p.color(...stroke_color, 50));
        //p.noFill();
        p.stroke(p.color(stroke_color));
        p.translate(-w / 2, -h / 2);
        for (let y = 0; y < rows - 1; y++) {
            p.stroke(p.color(stroke_color));
            p.beginShape(p.TRIANGLE_STRIP);
            for (let x = 0; x < cols; x++) {
                p.vertex(x * scl, y * scl, terrain[x][y]);
                p.vertex(x * scl, (y+1) * scl, terrain[x][y]);
            }
            p.endShape();
        }
    }
    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        stroke_color = hextoRGB(newProps.color);
        p.stroke(p.color(stroke_color));
        if (debug) console.log("Update: color=", newProps.color, stroke_color);
        if (canvas) { // Make sure the canvas has been created

        }
        p.clear();
        terrain = [];
        p.setup();
        p.draw();
    }
}

const Terrain = () => {
    const theme = useTheme();

    return (
        <PSWrapper 
            sketch={sketch} 
            color={theme.palette.primary.main || "#FFFFFF"}
        />
    );
};
export default Terrain;