import { hextoRGB } from '../../../utils/color';
import { debug } from '../../../App';

function Rain(p,
) {
    let canvas;
    let drops = [];

    let width = window.innerWidth;
    let height = window.innerHeight;

    let primaryColor = '#000000';
    // let secondaryColor = '#383838';
    // let backgroundColor = '#f5f5f5';

    let dropCount = 800;
    let gravity = 0.2;
    let speed = 15;
    let min_dropLength = 10;
    let max_dropLength = 20;
    let min_thickness = 1;
    let max_thickness = 3;

    class Drop {
        constructor(p, color) {
            this.p = p;
            this.x = this.p.random(width);
            this.y = this.p.random(-500, -50);
            this.z = this.p.random(0, 20);
            this.len = this.p.map(this.z, 0, 20, min_dropLength, max_dropLength);
            this.speed = speed;
            this.color = color;
        }
        fall = function() {
            this.y = this.y + this.speed;
            this.gravity = this.p.map(this.z, 0, 20, 0, gravity);
            this.speed = this.speed + this.gravity;
            if (this.y > height) {
                this.y = this.p.random(-200, 100);
                this.speed = this.p.map(this.z, 0, 20, 4, 10);
            }
        }
        show = function() {
            this.thickness = this.p.map(this.z, 0, 20, min_thickness, max_thickness);
            this.p.strokeWeight(this.thickness);
            this.p.stroke(this.color);
            this.p.line(this.x, this.y, this.x, this.y + this.len);
        }
        
    }

    
    p.setup = () => {
        if (debug) console.log('setup()', primaryColor);
        canvas = p.createCanvas(width, height);
        p.stroke(...hextoRGB(primaryColor));

        drops = [];
        for (let i = 0; i < dropCount; i++) {
            drops[i] = new Drop(p, primaryColor);
        }
    }

    p.draw = () => {
        p.clear();
        p.stroke(...hextoRGB(primaryColor));

        // p.background(0, 0, 0);
        // p.translate(width/2, height/2);
        for (let i = 0; i < drops.length; i++) {
            drops[i].fall();
            drops[i].show();
        }        
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (debug) console.log("redraw()"); 

        if (props.primaryColor)    primaryColor    = props.primaryColor; 
        // if (props.secondaryColor)  secondaryColor  = props.secondaryColor; 
        // if (props.backgroundColor) backgroundColor = props.backgroundColor; 

        if (props.dropCount)       dropCount       = props.dropCount;
        if (props.min_dropLength)  min_dropLength  = props.min_dropLength;
        if (props.max_dropLength)  max_dropLength  = props.max_dropLength;
        if (props.gravity)         gravity         = props.gravity;
        if (props.speed)           speed           = props.speed;
        if (props.min_thickness)   min_thickness   = props.min_thickness;
        if (props.max_thickness)   max_thickness   = props.max_thickness;

        if (canvas) { // Make sure the canvas has been created
            p.setup();
        }
    }
}

export default Rain;