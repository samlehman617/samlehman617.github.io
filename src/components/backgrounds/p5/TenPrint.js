import { hextoRGB } from '../../../utils/color';
import debug from '../../../App';

function TenPrint(p) {
    // Variables for sketch
    let canvas;
    let fps = 60;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Props passed to sketch
    let primaryColor = "#000000";
    let secondaryColor = '#383838';
    let backgroundColor = '#f5f5f5';

    let spacing = 32;
    let weight = 4;

    let forwardRatio = 0.5;
    let flipRatio = 0.1;
    let motionRatio = 0.5;

    let reverse = false;
    let iterative = true;

    // Calculated values
    let rows = Math.ceil(height / spacing);
    let cols = Math.ceil(width / spacing);

    let pattern = generatePattern(forwardRatio);
    let flips = generatePattern(flipRatio);

    let motionFrames = Math.floor(fps * motionRatio);
    let startFrame = Math.floor((fps - motionFrames) / 2);
    let endFrame = startFrame + motionFrames;

    // Non-constant Variables
    let currentGlobalFrame = 0;
    let currentMotionFrame = 0;
    let inc = true;

    p.debugSketch = () => {
        console.group("TenPrint")
        console.log("          FPS:", fps);
        console.log("Motion Frames:", motionFrames);
        console.log("  Start Frame:", startFrame);
        console.log("    End Frame:", endFrame);

        console.log("Primary:   ", primaryColor, hextoRGB(primaryColor));
        console.log("Secondary: ", secondaryColor, hextoRGB(secondaryColor));
        console.log("Background:", backgroundColor, hextoRGB(backgroundColor));
    }

    p.setup = () => {
        // Debug on global debug setting
        if (debug) p.debugSketch();
        if (debug) console.group("setup()");

        canvas = p.createCanvas(width, height);
        p.frameRate(fps);

        if (debug) console.groupEnd();
    }

    p.draw = () => {
        if (debug) console.log("draw()");
        let color = hextoRGB(primaryColor);
        p.clear();
        p.stroke(color)
        p.strokeWeight(weight);

        // Only draw on the motion frames
        if (currentGlobalFrame < startFrame) { drawFrame(0); }
        else if (currentGlobalFrame > endFrame) { drawFrame(motionFrames); }
        else {
            currentMotionFrame = currentGlobalFrame - startFrame;
            drawFrame(currentMotionFrame);
        }

        if (reverse) {
            // Reverse the animation
            if (inc) {
                if (currentGlobalFrame < fps) {
                    currentGlobalFrame += 1;
                } else {
                    inc = false;
                }
            } else {
                if (currentGlobalFrame > 0) {
                    currentGlobalFrame -= 1;
                } else {
                    inc = true;
                }
            }
        } else {
            if (currentGlobalFrame < fps) {
                currentGlobalFrame += 1;
            } else {
                currentGlobalFrame = 0;
                if (iterative) {
                    pattern = generateFlippedPattern(pattern, flips);
                    flips = generatePattern(flipRatio);
                }
            }
        }
        if (debug) console.groupEnd();
    }

    function drawFrame(frame) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let offset = 0;
                if (flips[i][j]) {
                    offset = frame * (spacing / motionFrames);
                }
                if (pattern[i][j]) {
                    // Draw back slash
                    p.line(
                        (j * spacing) + offset,
                        (i * spacing),
                        ((j + 1) * spacing) - offset,
                        ((i + 1) * spacing)
                    );
                } else {
                    // Draw forward slash
                    p.line(
                        (j * spacing) + offset,
                        ((i + 1) * spacing),
                        ((j + 1) * spacing) - offset,
                        (i * spacing)
                    );
                }
            }
        }
    }

    function generatePattern(ratio) {
        let patternArr = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push(p.random(1) < ratio);
            }
            patternArr.push(row);
        }
        return patternArr;
    }

    function generateFlippedPattern(original, changes) {
        let patternArr = original;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (changes[i][j]) {
                    patternArr[i][j] = !patternArr[i][j];
                }
            }
        }
        return patternArr;
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        console.group("redraw()");
        console.log("Primary:   ", props.primaryColor);
        console.log("Secondary: ", props.secondaryColor);
        console.log("Background:", props.backgroundColor);
        if (props.primaryColor)    primaryColor = props.primaryColor;
        if (props.secondaryColor)  secondaryColor = props.secondaryColor;
        if (props.backgroundColor) backgroundColor = props.backgroundColor;
        
        if (props.weight)          weight = props.weight;
        if (props.spacing)         spacing = props.spacing;
    
        if (props.forwardRatio)    forwardRatio = props.forwardRatio;
        if (props.flipRatio)       flipRatio = props.flipRatio;
        if (props.motionRatio)     motionRatio = props.motionRatio;

        if (props.hasOwnProperty('reverse')) reverse = props.reverse;
        if (props.hasOwnProperty('iterative')) iterative = props.iterative;

        if (canvas) { //Make sure the canvas has been created
            p.draw();
        }
        console.groupEnd();
    }
}
export default TenPrint;