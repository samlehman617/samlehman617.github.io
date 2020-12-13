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
    let u;
    let l;
    let a;
    let mods = [];
    let x;
    let y;
    let count;
    let canvas

    let stroke_color = hextoRGB("#FFFFFF");
    class Module {
        constructor(p, x, y) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.a = 0;
        }
        update = () => {
            if (p.mouseIsPressed) {
                this.a = -20 * (this.p.atan2(this.p.mouseY - this.y, this.p.mouseX - this.x));
            } else {
                this.a = this.p.atan2(this.p.mouseY-this.y, this.p.mouseX-this.x);
            }
        };
        draw = () => {
            this.p.push();
            this.p.translate(this.x, this.y);
            this.p.rotate(this.a);
            this.p.line(-1, 0, 1, 0);
            this.p.pop();
        }
    }

    p.setup = () => {
        canvas = p.createCanvas(width, height);
        u = 100;
        l = 20;
        let yCount = height / 80;
        let xCount = width / 80;
        count = p.int(xCount * yCount);
        let index = 0;
        for (let xc = 0; xc < xCount; xc++) {
            for (let yc = 0; yc < yCount; yc++) {
                mods[index++] = new Module(p, p.int(xc) * u, p.int(yc)*u);
            }
        }
    }
    p.draw = () => {
        if (p.mouseIsPressed) {

        }
        p.stroke(stroke_color);
        p.strokeWeight(15);
        p.translate(20, 20);
        for (let i = 0; i <= count; i++) {
            mods[i].update(p);
            mods[i].draw(p);
        }
    }
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        stroke_color = hextoRGB(newProps.color);
        p.stroke(p.color(stroke_color));
    }
}

const MagneticField = () => {
    const theme = useTheme();
    return (
        <PSWrapper
            sketch={sketch}
            color={theme.palette.primary.main || "#FFFFFF"}
        />
    );
}
export default MagneticField;