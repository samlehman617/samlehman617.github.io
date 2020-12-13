import React, {
    // Component
} from 'react';
import PSWrapper from 'react-p5-wrapper';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import {useTheme} from '@material-ui/core';

import {
    hextoRGB,
    // hextoRGBA
} from '../../utils/color';
import SamHead from '../../assets/images/sam_head.png';
// import { SamHead } from '../../assets/images/sam_head.png';
// import { debug } from '../../../App';
const debug = false;

// import { SamHead } from '../../../assets/sam_head.png';

function sketch(p,
    height = window.innerHeight,
    width = window.innerWidth,    
) {
    let canvas;
    let stroke_color = hextoRGB("#FFFFFF");
    let img = SamHead;
    let circles = [];
    let useImage = false;

    class Circle {
        constructor(sketch, x, y) {
            if (debug) { console.log("Constructing circle object @ x:", x + ", y:", y); }
            this.p = sketch;
            this.x = x || this.p.random(width);
            this.y = y || this.p.random(height);
            this.r = 1;
            this.growing = true;
        }
        grow = () => {
            if (this.growing) this.r += 1;
        };
        show = () => {
            // this.p.noStroke();
            // this.p.fill(this.color);

            this.p.stroke(stroke_color);
            this.p.strokeWeight(2);
            this.p.fill(p.color(0,0,0,0));
            
            this.p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
        };
        edges = () => {
            return (
                this.x + this.r >= width ||
                this.x - this.r <= 0 ||
                this.y + this.r >= height ||
                this.y - this.r <= 0
            );
        }
    }
    const init = () => {
        if (debug) {
            console.group("Circle Packing:");
            console.log("Width:", width);
            console.log("Height:", height);
        }
    }
    const term = () => {
        if (debug) {
            console.log("Done.");
            console.groupEnd();
        }
    }

    const getNewPosition = () => {
        const x = p.random(useImage ? img.width : width);
        const y = p.random(useImage ? img.height : height);
        if (debug) {
            console.group("getNewPosition("+useImage+") -> [", x+", "+y+"]" );
            console.log("Getting new random Circle position...");
            console.log("x:", x);
            console.log("y:", y);
            console.groupEnd();
        }
        return { x: x, y: y };
    }

    const validatePosition = (pos) => {
        if (debug) {
            console.group("validatePosition(x="+pos.x+", y="+pos.y+")");
        }

        let valid = true;
        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i];
            if (circle) {
                let d = p.dist(pos.x, pos.y, circle.x, circle.y);
                if (d < circle.r) {
                    valid = false;
                    break;
                }
            } else {
                valid = false;
                break;
            }
        }
        if (debug) {
            console.log("Position:", "[x="+pos.x+",", "y="+pos.y+"]", "is", valid ? "valid!" : "invalid.");
            console.groupEnd();
        }
        return valid;
    }

    const createCircle = () => {
        if (debug) {
            console.group("CreateCircle()...");
            console.log("Color:", stroke_color);
        }

        const generateCircle = (useImage, pos) => {
            if (debug) {
                console.group("generateCircle("+useImage+", "+pos.x+", "+pos.x+")");
            }
            var newCircle;
            if (useImage) {
                let index = (pos.x + pos.y * img.width) * 4;
                let r = img.pixels[index];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2];
                let c = p.color(r, g, b);
                newCircle = new Circle(p, pos.x, pos.y, c);
            } else {
                newCircle = new Circle(p, pos.x, pos.y, stroke_color);
            }
            if (debug) {
                console.log("Circle object generated:", newCircle);
                console.groupEnd();
            }
            return newCircle;
        };

        // Main sequence
        const pos = getNewPosition(false);
        const validPos = validatePosition(pos);
        const circle = validPos ? generateCircle(useImage, pos) : null;

        if (debug) {
            console.log("Finished creating circle:", circle);
            console.groupEnd();
        }
        return circle;
    }

    p.preload = () => {
        init();
        if (debug) console.log("Preload()...");
        if (useImage) img = p.loadImage("sam_head.png");
    }

    p.setup = () => {
        canvas = p.createCanvas(height, width);
        circles = [];
        if (debug) { term() }
    }

    p.draw = () => {
        if (debug) { console.group("Draw()"); }
        // p.background('orangered');
        let total = 5;
        let count = 0;
        let attempts = 0;

        p.frameRate(30);

        while (count < total) {
            if (debug) {
                console.log("Count:", count)
                console.log("Total:", total);
                console.log("Attempts:", attempts);
                console.log("Valid Circles", circles.length);
            }
            let newCircle = createCircle();
            if (newCircle != null) {
                if (debug) console.log("Adding circle", newCircle);
                circles.push(newCircle);
                count++;
            }
            attempts++;
            if (attempts > 100) {
                p.noLoop();
                if (debug) console.log("Finished drawing.");
                break;
            }
        }
        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i];
            if (circle.growing) {
                if (circle.edges()) {
                    circle.growing = false;
                } else {
                    for (let j = 0; j < circles.length; j++) {
                        let other = circles[j];
                        if (circle !== other) {
                            let d = p.dist(circle.x, circle.y, other.x, other.y);
                            let distance = circle.r + other.r;
                            if (d - 2 < distance) {
                                circle.growing = false;
                                break;
                            }
                        }
                    }
                }
            }
            circle.show();
            circle.grow();
        }
        if (debug) { console.log("Draw() ended."); console.groupEnd(); }
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        if (debug) console.log("Updated color:", newProps.color);
        stroke_color = hextoRGB(newProps.color);
        if (canvas) { //Make sure the canvas has been created
            p.stroke(stroke_color);
            p.strokeWeight(newProps.weight || 3);

            p.setup();
            p.draw();
        }
    }
};

const CirclePacking = () => {
    const theme = useTheme();
    return (
        <PSWrapper 
            sketch={sketch}
            color={theme.palette.primary.main || "#FFFFFF"}
        />
    )
}
CirclePacking.shortname = "CirclePacking";
CirclePacking.icon = GroupWorkIcon;
CirclePacking.args = {
    color: {
        description: "Color of sketch",
        values: ["primary", "secondary", "paper"],
    },
};
export default CirclePacking;
