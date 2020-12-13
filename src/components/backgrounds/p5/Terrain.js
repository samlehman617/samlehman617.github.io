import { hextoRGB } from '../../../utils/color';
// import { debug } from '../../../App';

// const Terrain = p => {
function Terrain(p) {
    // Subdivisions: Controls the poly count (lower=more detail)
    let scl = 30;
    // Set height & width to 2x the desired viewport so edges of terrain are offscreen 
    let width = 2*window.innerWidth;
    let height = 2*window.innerHeight;
    // Subdivide canvas
    let cols = width / scl;
    let rows = height / scl;

    let colorCount = 2;
    let primaryColor = hextoRGB('#000000');
    let secondaryColor = hextoRGB('#ffffff');
    let transparency = 200;
    let thickness = 1;

    let redraw = false;
    let maxFramerate = 30;
    let speed = 0;
    // const createEmptyTerrain = () => {
    const createEmptyTerrain = function() {
        let newTerrain = [];
        // cols = width / scl;
        // rows = height / scl;
        for (let x = 0; x < cols; x++) {
            newTerrain[x] = [];
            for (let y = 0; y < rows; y++) {
                newTerrain[x][y] = 0; // Temporary default
            }
        }
        return newTerrain;
    }
    let terrain = createEmptyTerrain();
    // p.setup = () => {
    p.setup = function() {
        while (p === undefined) { console.log('Waiting for p...') }
        p.createCanvas(width / 2, height / 2, p.WEBGL);
        p.frameRate(maxFramerate);
        p.strokeWeight(thickness);
        p.stroke(colorCount === 2 ? p.color(...primaryColor) : p.color(...secondaryColor));
        p.fill(p.color(...secondaryColor, transparency));
    }
    // p.draw = () => {
    p.draw = function() {
        p.clear();
        if (redraw) {
            p.strokeWeight(thickness);
            p.stroke(colorCount === 2 ? p.color(...primaryColor) : p.color(...secondaryColor));
            p.fill(p.color(...secondaryColor, transparency));
        }

        // Controls the speed the terrain passes underneath
        speed -= 0.2;
        let yoff = speed;

        // Generate perlin noise terrain data
        for (let y=0; y<rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
                xoff += 0.2;
            }
            yoff += 0.2
        }

        // Makes bottom of sketch below the bottom of the canvas
        p.translate(0, 75);
        // Controls angle viewing terrain from
        p.rotateX(p.PI / 2.5);

        // Moves view to middle of terrain
        p.translate(-width/2, -height/2);

        // Draw the terrain
        for (let y = 0; y < rows - 1; y++) {
            // Shape of two connected rows of perlin heights
            p.beginShape(p.TRIANGLE_STRIP);
            for (let x = 0; x < cols; x++) {
                p.vertex(x * scl, y * scl, terrain[x][y]);
                p.vertex(x * scl, (y+1) * scl, terrain[x][y+1]);
            }
            p.endShape();
        }
    }
    // p.windowResized = () => {
    p.windowResized = function() {
        width = 2 * p.windowWidth;
        height = 2 * p.windowHeight;
        p.resizeCanvas(width, height);
    }
    // p.myCustomRedrawAccordingToNewPropsHandler = props => {
    p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
        while (p === undefined) { console.log('Waiting for p...') }
        // let redraw = false;
        // Only update if new props differ from old props
        if (props.colorCount && colorCount !== props.colorCount) {
            colorCount = props.colorCount;
            redraw = true;
        }
        if (props.primaryColor && primaryColor !== hextoRGB(props.primaryColor)) {
            primaryColor = hextoRGB(props.primaryColor);
            redraw = true;
        }
        if (props.secondaryColor && secondaryColor !== hextoRGB(props.secondaryColor) && colorCount === 2) {
            secondaryColor = hextoRGB(props.secondaryColor);
            redraw = true;
        }
        if (props.transparency && transparency !== props.transparency) {
            transparency = props.transparency;
            redraw = true;
        }
        if (props.thickness && thickness !== props.thickness) {
            thickness = props.thickness;
            redraw = true;
        }
        // if (props.speed)           speed           = props.speed;

        // TODO: Fix color redraw on theme change
        if (redraw && p !== undefined) {
            console.log("Redraw", p);
            // p.strokeWeight(thickness);
            // p.stroke(colorCount === 2 ? p.color(...secondaryColor) : p.color(...primaryColor));
            // p.fill(p.color(...primaryColor, transparency));
            // terrain = createEmptyTerrain();
        }
    }
}

export default Terrain;