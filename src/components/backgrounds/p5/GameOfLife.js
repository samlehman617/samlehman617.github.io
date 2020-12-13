import { hextoRGB } from '../../../utils/color';
import { debug } from '../../../App';

function GameOfLife(p) {
    let canvas;
    let grid;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let primaryColor = '#000000';
    // let secondaryColor = '#383838';
    let backgroundColor = '#f5f5f5';

    let updateevery = 8;
    let transitionframes = 0.25;
    let framerate = 32;
    let radius = 3;
    let resolution = 25;

    // Computed
    let cols = Math.floor(width / resolution);
    let rows = Math.floor(height / resolution);
    // let frames = Math.floor(framerate/updateevery);

    let frame = 1;

    const make2DArray = (cols, rows) => {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }
    const countNeighbors = (grid, x, y) => {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + cols) % cols;
                let row = (y + j + rows) % rows;
                sum += grid[col][row];
            }
        }
        sum -= grid[x][y];
        return sum;
    }

    p.setup = () => {
        console.log('setup()');
        canvas = p.createCanvas(width, height);
        p.clear();
        p.frameRate(framerate);
        console.log("Rows:", rows);
        console.log("Cols:", cols);
        p.stroke(0, 0, 0);
        p.strokeWeight(1);
        p.line(10, 10, width-10, height-10);
        grid = make2DArray(cols, rows);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = p.floor(p.random(2));
            }
        }
    }

    p.drawGridLines = () => {
        if (debug) console.log('drawGrid()');
        for (let i = 0; i < cols; i++) {
            let x = i * resolution;
            p.stroke(0, 0, 0);
            p.line(x, 0, x, height);
        }
        for (let j = 0; j < rows; j++) {
            let y = j * resolution;
            p.stroke(0, 0, 0);
            p.line(0, y, width, y);
        }
    }
    p.nextState = (grid) => {
        let next = make2DArray(cols, rows);
        // Compute next based on grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];

                // Count living neighbors
                // let sum = 0;
                let neighbors = countNeighbors(grid, i, j);

                if (state === 0 && neighbors === 3) {
                    next[i][j] = 1;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }
        return next;
    };
    p.drawGrid = (grid) => {
        for (let i = 0; i < cols; i++) {
            let x = i * resolution;
            for (let j = 0; j < rows; j++) {
                let y = j * resolution;
                if (grid[i][j] === 1) {
                    p.fill(...hextoRGB(primaryColor));
                    p.stroke(...hextoRGB(backgroundColor));
                    p.rect(x, y, resolution - 1, resolution - 1, radius);
                } 
            }
        }        
    };
    p.drawGridTransition = (grid, next, frame) => {
        let alpha_step = 1 / (updateevery*transitionframes);
        // InOut (1->0.25, 2->0.50, 3->0.75, 4->1.00 | 5->0.75, 6->0.50, 7->0.25, 8->0.00)
        // OutIn (1->0.75, 2->0.50, 3->0.25, 4->0.00 | 5->0.25, 6->0.50, 7->0.75, 8->1.00)
        let alpha_in;
        let alpha_out;
        if (frame > updateevery*transitionframes) {
            alpha_in = 1.00;
            alpha_out = 0.00;
        } else {
            alpha_in = ((updateevery * transitionframes) - frame) * alpha_step;
            alpha_out = 1.00 - alpha_in;
        }
        // let alpha_in = ((updateevery - transitionframes) - frame) * alpha_step;
        // let alpha_out = (updateevery - frame) * alpha_step;
        // let alpha_step = 1 / (frames - 1);
        // let fade_in_alpha = alpha_step * (frame + 1);
        // let fade_out_alpha = alpha_step * (frames - (frame+1));
        // let fade_in_alpha = frame+1 / frames;
        // let fade_out_alpha = (frames-frame) / frames;
        // console.log("in: ", fade_in_alpha, "out:", fade_out_alpha);
        let filled_color   = p.color(...hextoRGB(primaryColor));
        let unfilled_color = p.color(...hextoRGB(backgroundColor));
        let fade_in_color = p.lerpColor(unfilled_color, filled_color, alpha_in);
        let fade_out_color = p.lerpColor(unfilled_color, filled_color, alpha_out);
        // let fade_in_color  = p.color(...hextoRGB(primaryColor), alpha_in);
        // let fade_out_color = p.color(...hextoRGB(primaryColor), alpha_out);
        for (let i = 0; i < cols; i++) {
            let x = i * resolution;
            for (let j = 0; j < rows; j++) {
                let y = j * resolution;
                p.fill(...hextoRGB(primaryColor));
                p.stroke(...hextoRGB(backgroundColor));
                // Cell remains alive. No animation
                if (grid[i][j] === 1 && next[i][j] === 1) {
                    p.fill(filled_color);
                    p.stroke(...hextoRGB(backgroundColor));
                } 
                // Cell dies. Fade out.
                else if (grid[i][j] === 1 && next[i][j] !== 1) {
                    p.fill(fade_out_color);
                    // p.fill(p.color(...hextoRGB(primaryColor), frame))
                } 
                // Cell spawns. Fade in.
                else if (grid[i][j] !== 1 && next[i][j] === 1) {
                    p.fill(fade_in_color);
                }
                // Cell remains dead. No animation.
                else {
                    p.fill(unfilled_color);
                    p.stroke(...hextoRGB(backgroundColor));
                }
                p.rect(x, y, resolution - 1, resolution - 1, radius);
            }
        }        
    } 
    p.draw = () => {
        p.clear();
        console.log("Draw("+frame+","+updateevery+")");

        // Get the current & next grid states.
        // let curr = grid;
        // let next = p.nextState(grid);
        // p.drawGridTransition(curr, next, frame);
        p.drawGrid(grid);
        grid = p.nextState(grid);

        // if (frame < updateevery) {
            // Not a state update frame (Increment frame)
        //     frame+=1;
        // } else {
            // State update frame (Reset frame)
        //     console.log("Reset.");
        //     frame=1;
        //     grid = next;
        // }

    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (debug) console.log("redraw()");

        if (props.primaryColor)    primaryColor    = props.primaryColor;
        // if (props.secondaryColor)  secondaryColor  = props.secondaryColor;
        if (props.backgroundColor) backgroundColor = props.backgroundColor;

        if (props.framerate)       framerate       = props.framerate;
        if (props.updateevery)     updateevery    = props.updateevery;
        if (props.radius)          radius          = props.radius;
        if (props.resolution)      resolution      = props.resolution;

        if (props.primaryColor) {
            console.log(props.primaryColor);
            console.log(props.backgroundColor);
            p.setup();
        }
        // TODO: Fix redraw on theme update
        if (canvas) { // Make sure the canvas has been created
            // p.stroke(hextoRGB(props.color));
        } else {
            // p.stroke(hextoRGB(props.color));
        }
    }
}

export default GameOfLife;