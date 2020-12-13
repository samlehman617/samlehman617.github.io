import { hextoRGB } from '../../../utils/color';
import { debug } from '../../../App';

import DVDImg from '../../../assets/images/dvd_logo.png';
//import DVDImg from ''

function DVDMenu(p) {
    let canvas;
    let height = window.innerHeight;
    let width = window.innerWidth;
    let image = DVDImg;
    let image_url = process.env.PUBLIC_URL + '/images/dvd_logo.png';
    //let image_url = '';

    let primaryColor    = '#000000';
    // let secondaryColor  = '#383838';
    // let backgroundColor = '#f5f5f5';

    let speed           = 5;

    let x;
    let y;
    let xspeed;
    let yspeed;

    // let dvd;

    // let r, g, b;

    const init = () => {
        if (debug) {
            console.group("DVD Menu:");
            console.log("Image:", DVDImg);
            console.log("Image URL:", image_url);
        }
    }
    const term = () => {
        if (debug) {
            console.log("Done.");
            console.groupEnd();
        }
    }
    const loadImage = () => {
        image = p.loadImage(image_url, (img) => image = img);
        image_url = '';
    }

    // p.preload = () => {
    //     loadImage();
    // }
    p.setup = () => {
        if (debug) init();
        canvas = p.createCanvas(width, height);
        loadImage();
        x = p.random(width);
        y = p.random(height);
        xspeed = speed;
        yspeed = speed;
        if (debug) term();
    }
    p.draw = () => {
        p.clear();
        p.tint(p.color(...hextoRGB(primaryColor)));
        p.image(image, x, y);

        x = x + xspeed;
        y = y + yspeed;

        if (x + image.width >= width) {
            xspeed = -xspeed;
            x = width - image.width;
        } else if (x <= 0) {
            xspeed = -xspeed;
            x = 0;
        }

        if (y + image.height >= height) {
            yspeed = -yspeed;
            y = height - image.height;
        } else if (y <= 0) {
            yspeed = -yspeed;
            y = 0;
        }
    }
    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (debug) console.log('redraw()');

        if (props.primaryColor)    primaryColor    = props.primaryColor;
        // if (props.secondaryColor)  secondaryColor  = props.secondaryColor;
        // if (props.backgroundColor) backgroundColor = props.backgroundColor

        if (props.speed)           speed           = props.speed;

        if (props.image_url)       image_url       = props.image_url;

        // Make sure the canvas has been created
        if (canvas) { 
        } else if (debug) console.log("Error updating props. No canvas.");

    }
}
export default DVDMenu;