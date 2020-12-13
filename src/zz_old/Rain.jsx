import React from 'react';

import { hextoRGB } from '../utils/color';
// import { debug } from '../../../App';
import { useTheme } from '@material-ui/core';
import PSWrapper from 'react-p5-wrapper';

const DROP_COUNT = 800;

function sketch(p,
    width = window.innerWidth,
    height = window.innerHeight,
    speed = 15,
) {
    class Drop {
        constructor(p) {
            this.p = p;
            this.x = this.p.random(width);
            this.y = this.p.random(-500, -50);
            this.z = this.p.random(0, 20);
            this.len = this.p.map(this.z, 0, 20, 10, 20);
            this.speed = speed;
        }
        fall = function() {
            this.y = this.y + this.speed;
            var gravity = this.p.map(this.z, 0, 20, 0, 0.2);
            this.speed = this.speed + gravity;
            if (this.y > height) {
                this.y = this.p.random(-200, 100);
                this.speed = this.p.map(this.z, 0, 20, 4, 10);
            }
        }
        show = function() {
            var thickness = this.p.map(this.z, 0, 20, 1, 3);
            this.p.strokeWeight(thickness);
            this.p.stroke(stroke_color);
            this.p.line(this.x, this.y, this.x, this.y + this.len);
        }
        
    }
    let stroke_color;
    let canvas;
    let drops = [];

    
    p.setup = () => {
        console.log('setup');
        canvas = p.createCanvas(width, height);

        for (let i = 0; i < DROP_COUNT; i++) {
            drops[i] = new Drop(p, stroke_color);
        }
    }

    p.draw = () => {
        p.clear();
        // p.background(0, 0, 0);
        // p.translate(width/2, height/2);
        for (let i = 0; i < drops.length; i++) {
            drops[i].fall();
            drops[i].show();
        }        
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (props.color) {
            console.log(props.color);
            stroke_color = props.color;
            p.stroke(stroke_color);
        
            p.setup();
        }
        if (canvas) { // Make sure the canvas has been created
            p.stroke(hextoRGB(props.color));
        } else {
            p.stroke(hextoRGB(props.color));
        }
    }
}

const Rain = () => {
    const theme = useTheme();
    return (
        <PSWrapper
            sketch={sketch}
            color={theme.palette.primary.main || "#FFFFFF"}
        />
    );
};

export default Rain;