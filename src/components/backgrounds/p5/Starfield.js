import { hextoRGB } from '../../../utils/color';
import { debug } from '../../../App';

// const STAR_COUNT = 800;


function Starfield(p) {
    let canvas;
    let stars = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Props
    let primaryColor = '#000000';
    // let secondaryColor = '#383838';
    // let backgroundColor = '#f5f5f5';

    let speed     = 10;
    let starCount = 800;
    let radius    = 4;

    class Star {
        constructor(sketch, color) {
            this.p = sketch;
            this.color = color;
            this.x = this.p.random(-width, width);
            this.y = this.p.random(-height, height);
            this.z = this.p.random(width);
            this.pz = this.z;
        }
        update = () => {
            this.z = this.z - speed;
            if (this.z < 1) {
                this.z = width; 
                this.x = this.p.random(-width, width);
                this.y = this.p.random(-height, height);
                this.pz = this.z;
            }
        }
        updateColor = (newColor) => {
            this.color = newColor;
            this.p.stroke(newColor);
        }

        show = () => {
            this.p.stroke(this.color);
            this.p.strokeWeight(radius);
            let sx = this.p.map(this.x / this.z, 0, 1, 0, width);
            let sy = this.p.map(this.y / this.z, 0, 1, 0, height);
            let r = this.p.map(this.z, 0, width, 16, 0);
            this.p.ellipse(sx, sy, r/2, r/2);
            
            
            let px = this.p.map(this.x / this.pz, 0, 1, 0, width);
            let py = this.p.map(this.y / this.pz, 0, 1, 0, height);
            this.pz = this.z;
            this.p.stroke(this.color);
            this.p.line(px, py, sx, sy);
        }
    }
    const clearStars = () => {
        if (debug) console.log("StarField: Clearing stars...");
        stars = [];
    }
    const createStars = (p) => {
        if (debug) console.log("StarField: Creating stars", primaryColor);
        p.stroke(primaryColor);
        for (let i = 0; i < starCount; i++) {
            stars[i] = new Star(p, primaryColor);
        }
    }
    // const updateStars = (color) => {
    //     if (debug) console.log("StarField: Updating stars", color);
    //     for (let i = 0; i < stars.length; i++) {
    //         stars[i].updateColor(color)
    //     }
    // }
    p.setup = () => {
        if (debug) console.log('StarField: Setup', primaryColor);
        canvas = p.createCanvas(width, height);
        p.clear();
        clearStars();
        createStars(p);
    }

    p.draw = () => {
        p.clear();
        p.translate(width/2, height/2);
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].show();
        }        
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (debug) console.group("redraw()");

        if (props.primaryColor)    primaryColor    = props.primaryColor;
        // if (props.secondaryColor)  secondaryColor  = props.secondaryColor;
        // if (props.backgroundColor) backgroundColor = props.backgroundColor;

        if (props.radius)          radius          = props.radius;
        if (props.speed)           speed           = props.speed;
        if (props.starCount)       starCount       = props.starCount;   
        
        if (debug) console.log("StarField Update: color=", primaryColor); console.groupEnd();
        if (canvas) { // Make sure the canvas has been created
            p.stroke(hextoRGB(primaryColor));
            clearStars();
            createStars(p);
        }
    }
}

export default Starfield;