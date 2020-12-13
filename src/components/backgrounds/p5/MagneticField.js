import { hextoRGB } from '../../../utils/color';
import { debug } from '../../../App';

function MagneticField(p) {
    let canvas;
    let mods = [];
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let primaryColor = '#000000';
    // let secondaryColor = '#383838';
    // let backgroundColor = '#f5f5f5';

    let spacing = 40;
    let thickness = 15;
    let u;
    // Brokenness related to variable 'l' not being used??
    // let l;
    // let a;
    // let x;
    // let y;
    let count;

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
        p.clear();
        u = 100;
        // l = 20;
        let yCount = height / spacing;
        let xCount = width / spacing;
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
        p.stroke(...hextoRGB(primaryColor));
        p.strokeWeight(thickness);
        p.translate(20, 20);
        for (let i = 0; i <= count; i++) {
            mods[i].update(p);
            mods[i].draw(p);
        }
    }
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (debug) console.log("redraw()");
        
        if (props.primaryColor)    primaryColor    = props.primaryColor;
        // if (props.secondaryColor)  secondaryColor  = props.secondaryColor;
        // if (props.backgroundColor) backgroundColor = props.backgroundColor;

        if (props.spacing)         spacing         = props.spacing;
        if (props.thickness)       thickness       = props.thickness;

        if (canvas) p.setup();
    }
}

export default MagneticField;