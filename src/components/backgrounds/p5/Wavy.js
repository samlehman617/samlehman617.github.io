import { hextoRGB } from '../../../utils/color';
import { debug } from '../../../App';

function Wavy(p) {
    let canvas;
    let t = 0;
    let timeStep = 0.01;

    // Prop Variables
    let primaryColor    = '#000000';
    // let secondaryColor  = '#383838';
    let backgroundColor = '#f5f5f5';

    let spacing = 30;
    let radius = 20;
    let thickness = 10;
    let trails = true;

    let transparency = 15;

    const init = () => { console.group("WavyBG"); }
    const term = () => { console.groupEnd(); }
    if (debug) init();

    p.setup = () => {
        if (debug) console.log('setup()');
        canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        p.noStroke();
        p.fill(p.color(...hextoRGB(primaryColor)));
    }

    p.draw = () => {
        if (debug) console.group("draw()");

        if (!trails) p.clear();

        // Translucent background (creates trails)
        if (debug) console.log("Primary:", primaryColor, "\nSecondary:", backgroundColor);
        
        p.background(p.color(...hextoRGB(backgroundColor), transparency));

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

        if (debug) console.groupEnd();
        if (debug) term();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (debug) console.group("redraw()");

        if (props.primaryColor)    primaryColor    = props.primaryColor;
        // if (props.secondaryColor)  secondaryColor  = props.secondaryColor;
        if (props.backgroundColor) backgroundColor = props.backgroundColor;

        if (props.transparency)    transparency    = props.transparency;
        if (props.spacing)         spacing         = props.spacing;
        if (props.radius)          radius          = props.radius;
        if (props.thickness)       thickness       = props.thickness;
        if (props.timeStep)        timeStep        = props.timeStep;
        if (props.hasOwnProperty('trails')) trails = props.trails;

        // Only redraw if canvas exists
        if (canvas) p.clear();

        if (debug) console.groupEnd();
    }
}
export default Wavy;