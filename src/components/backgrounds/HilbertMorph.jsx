/**
 * @component   : Hilbert Morph
 * @author      : Sam Lehman (samlehman617@gmail.com)
 * @created     : Monday Mar 04, 2019 04:27:53 STD
 * @description : React component for a morphing Hilbert Curve SVG path background
 * Process:
 *   1. Get window dimensions
 *   2. Generate L-system strings for all iterations > end_iteration
 *   3. Get scale based on window size
 *   4. Generate path strings from l-system strings and scale
 *   5. Set curr_iteration = begin_iteration
 *   5. Draw path_strings[curr_iteration]
 *   6. Determine next iteration
 *      a. Check if incrementing/decrementing overflows bounds [begin_iteration, end_iteration]
 *      b. Continue in same direction, reverse directions, or restart to begin_iteration
 *   7. Animate transition from path_strings[curr_iteration] to path_strings[next_iteration]
 *   8. Goto #6
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles, lighten, darken } from '@material-ui/core/styles';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { debug } from '../../App';

/**
 * Generates the next iteration L-system from the current iteration.
 * Defines the next moves to be drawn.
 * @param s:   String representing an L-System or partial L-System
 * @param r:   Object of rules for replacing characters in the initial string
 * @param d_r: Default rule to use if one is not matched from the 'r' object
 * @returns    String representing the drawing portion of the next iteration of the L-System or segment.
 */
function next(
  s = 'L',
  r = { L: '+RF-LFL-FR+', R: '-LF+RFR+FL-' },
  d_r = '+RF-LFL-FR+',
) {
  const re1 = new RegExp(`([${Object.keys(r).join('')}])`, 'g');      // Replace char w/ rule
  const re2 = new RegExp(/-\+|\+-|\+\+\+\+|----/, 'g');               // Remove redundant tokens
  return s.replace(re1, (x) => (r[x] ? r[x] : d_r)).replace(re2, ''); 
}

/**
 * Generates the no op offsets for the next iteration of the L-system string.
 * Defines the next moves that will not be drawn, but are necessary to position
 * the subsequent draw.
 * @param s:    String representing an L-System or partial L-System.
 * @param r:    Object of rules for replacing characters in the initial string.
 * @param d_r:  String representing the default rule to use if one is not matched from the 'r' object.
 * @param anim: String selecting the type of animation we are building. Options = [morph|scrunch|scale]
 * @returns     String representing the backtracking portion of the next iteration of the L-System or segment.
 */
function fake(
  s = 'L',
  r = { L: '+RF-LFL-FR+', R: '-LF+RFR+FL-' },
  d_r = '+RF-LFL-FR+',
  anim = 'morph',
) {
  const re1 = RegExp(`([${Object.keys(r).join('')}])`, 'ig'); // Replaces char w/ rule
  const re2 = RegExp(/-\+|\+-|\+\+\+\+|----/, 'g');           // Removes redundant tokens
  let f = (x) => (r[x.toUpperCase()] ? r[x.toUpperCase()].toLowerCase() : d_r.toLowerCase());
  switch (
  anim.toLowerCase() // Replacement str func
  ) {
    case 'morph': // Morphing animation
      break;
    case 'scrunch': // Scrunching animation
      f = (x) => {
        const y = x.toUpperCase;
        r[y] ? r[y].toLowerCase() : d_r.toLowerCase();
      };
      break;
    case 'scale': // Scaling animation
      f = (x) => (r[x.toUpperCase()] ? r[x.toUpperCase()] : d_r);
      break;
    default: // Morphing animation
      f = (x) => (r[x.toUpperCase()]
        ? r[x.toUpperCase()].toLowerCase()
        : d_r.toLowerCase());
  }
  return s.replace(re1, (x) => f(x)).replace(re2, ''); // Execute REs & return result.
} // Case changes -> morph, no case changes => scaling,

/**
 * Gets the string representation for the given iteration
 * @param iter: Integer representing the iteration of Hilbert Curve that we are obtaining a string for.
 * @param s:    String representing the starting axiom. Start string.
 * @param anim: String selecting the animation to use.
 * @returns     String representing the ith iteration.
 */
function getIterationString(iter = 1, s = 'L', end_iter = 5) {
  for (var i = 0; i < iter; i++) s = next(s); // Recursively replace str iter times
  for (; i < end_iter; i++) s = fake(s);      // Recursively replace str max_iter times
  return s;
}

/**
 * Converts an L-system string into an SVG path string.
 * @param s:      String raw representation of an L-System
 * @param scale:  Integer determining how much to scale the path string
 * @param params: Object containing values for L-System movement constants, 
 *                such as angles or length of distance to step forward/backwards.
 * @returns       String for an SVG Path that draws the L-system input string.
 */
function getPathString(s, scale = 16, params = { lAngle: 90, rAngle: 90 }) {
  let r = `M${scale / 2},${scale / 2}`; // Set initial string (move to starting point)
  let b = [scale, 0]; // Set initial move (scale, 0)
  const rotate = (deg = 90, pos = [0, 0]) => {
    const theta = deg * (Math.PI / 100); // Convert to radians
    const R = [
      [Math.cos(theta), Math.sin(theta)], // Define transformation matrix
      [-Math.sin(theta), Math.cos(theta)],
    ];
    return [ // then apply the transformation
      Number((pos[0] * R[0][0] + pos[1] * R[0][1]).toFixed(4)),
      Number((pos[0] * R[1][0] + pos[1] * R[1][1]).toFixed(4)),
    ];
  };
  for (let j = 0; j < s.length; j++) {
    // Iterate through all tokens
    switch (s.charAt(j)) {
      case '+': // Right turn
        b = rotate(90 - params.rAngle, [-b[1], b[0]]);
        break;
      case '-': // Left turn
        b = rotate(90 - params.lAngle, [b[1], -b[0]]);
        break;
      case 'f': // No op
        r += 'l0,0';
        break;
      case 'F': // Forward
        r += `l${b[0]},${b[1]}`;
        break;
      default:
        r += '';
        break;
    }
  }
  return r;
}

/**
 * Generates & returns object of all iter strs & corresponding path strs generated from them.
 * @param iter_strs: String raw representation of starting L-System iteration. [Default = ['L']]
 * @param path_strs: String representation of SVG Path to draw each iteration. [Default = ['M256,M256']]
 */
const getAllStrings = (end_iter = 7, iter_strs = ['L'], path_strs = ['M256,M256']) => {
  if (debug) console.log('HilbertMorph: getAllStrings()');
  for (var i = 1; i <= end_iter; i++) {
    const scale = Math.pow(2, end_iter - i + 1);              // Scale needed for iter
    const iter_str = getIterationString(i, 'L', end_iter);    // Iter string for iter
    const path_str = getPathString(iter_str, scale);          // Path string for iter
    iter_strs.push(iter_str);                                 // Add iter strings to list
    path_strs.push(path_str);                                 // Add path strings to list
    if (debug) {
      console.log(
        `\n[${i}]   Scale: ${scale} `,
        `\n[${i}] IterStr: ${iter_str.slice(0, 20)}`,
        `\n[${i}] PathStr: ${path_str.slice(0, 20)}`,
      );
    }
  }
  if (debug) console.log(`HilbertMorph: ${i - 1} iterations generated.`);
  return { iter: iter_strs, path: path_strs };
}

/**
 * Combines the SVGs paths of multiple iterations according to the desired
 * looping effect.
 * @param strings: List of SVG path strings representing multiple L-system iterations.
 * @param beg:     Integer selecting which iteration of the L-system begins animating from.
 * @param end:     Integer selecting which iteration of the L-system the animation halts after.
 * @param reset:   String selecting which loop reset the animation uses. Options = [loop|reverse]
 */
function getAnimationPath(strings, beg, end, reset) {
  switch (reset) {
    case 'loop':
      return strings;
    case 'reverse':
      return strings
        .slice(beg - 1, end)
        .concat(strings.slice(beg - 1, end - 1).reverse())
        .join(';');
    default:
      return strings
        .slice(beg - 1, end)
        .concat(strings.slice(beg - 1, end - 1).reverse())
        .join(';');
  }
}

/**
 * Limits how often a function can refresh by setting a timeout before allowing
 * a second run. This is used to save re-rendering the component on every frame
 * where the window is being resized. Should benefit performance.
 * @param fn: Function to limit update rate.
 * @param ms: Integer number of milliseconds to wait before ending timeout.
 */
function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments)
    }, ms)
  };
};

/**
 * React component that renders a series of pseudo-Hilbert curve iterations
 * and animates morphing between iterations.
 */
const HilbertMorph = (props) => {
  // Props
  const { 
    classes, 
    begin, 
    end, 
    reset, 
    duration,
    lineJoin,
    strokeWidth,
    animateStrokeWidth,
  } = props;

  // Props-derived variables
  const scale = Math.pow(2, end + 1); // Get information for tiling multiple Hilbert curves in an SVG

  // State
  const [ratio, setRatio] = useState(Math.ceil(window.innerHeight/window.innerWidth));
  const [animationString, setAnimationString] = useState('');

  // Functions
  const init = () => {
    console.group("HilbertMorph");
    console.log("init()");
  }
  const term = () => {
    console.log("term()");
    console.log("HilbertMorph done.");
    console.log("HilbertMorph rendering...")
    console.groupEnd();
  }
  const handleResize = () => (setRatio(Math.ceil(window.innerHeight/window.innerWidth)));

  init();

  // Automatically pull window size into the state
  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 600);     // Limit polling of window size to once ever 600ms.
    window.addEventListener('resize', debouncedHandleResize);      // Add event listener to window.
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize); // Cleanup on component unmount.
    };
  });

  // Automatically rebuild the animation string when props are updated.
  useEffect(() => {
    // Build all the strings.
    const strings = getAllStrings(end);
    // Merge the path strings into one we can use for animating the 'd' SVG attribute.
    const animationPathString = getAnimationPath(
      strings.path,
      begin,
      end,
      reset
    );
    setAnimationString(animationPathString);
  },
    [begin, end, reset]
  );
  
  term();

  return (
    <svg
      className={classes.svg}
      viewBox={`0 0 ${scale} ${scale * ratio}`}
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <path
          id="hilbert"
          fill="none"
          strokeLinejoin={lineJoin || "round"}
          strokeLinecap={lineJoin || "round"}
          // strokeWidth={2}
        >
          <animate
            id="animMorph"
            attributeName="d"
            dur={duration}
            repeatCount="indefinite"
            calcMode="paced"
            values={animationString}
          />
          { animateStrokeWidth ? (
            <animate
              id="animThick"
              attributeName="stroke-width"
              dur={duration}
              repeatCount="indefinite"
              calcMode="paced"
              values={(strokeWidth+1)+";"+(strokeWidth-1)+";"+(strokeWidth+1)}
            />
          ) : null }
        </path>
      </defs>
      {Array(ratio).fill(0).map((_, i) => (
        <use key={i} href="#hilbert" x="0" y={scale * (i)} />
      ))}
    </svg>
  );
};

HilbertMorph.shortname = "HilbertMorph";
HilbertMorph.icon = AccountTreeIcon;
HilbertMorph.args = {
  color: {
    description: "Color of the sketch",
    values: ["primary", "secondary", "paper"],
  },
  start: {
    description: "The iteration to start animating from",
    min: 1,
    max: 7,
    step: 1,
    values: [3],
  },
  end: {
    description: "The iteration to end animating at",
    min: 4,
    max: 9,
    step: 1,
    values: [6],
  },
}
HilbertMorph.propTypes = {
  begin_iteration: PropTypes.number,  // Iteration to start displaying
  end_iteration: PropTypes.number,    // Iteration to stop on
  duration: PropTypes.string,         // How long the animation should last
  // rules: PropTypes.array,             // TODO: Implement custum rules
  reset: PropTypes.string,            // How to combine the iteration path strings
  lineJoin: PropTypes.oneOf(["round", "square", "miter"]),
  strokeWidth: PropTypes.number,      // Base width of line segments.
  animateStrokeWidth: PropTypes.bool, // Whether to animate the stroke width to normalize background color.
};
HilbertMorph.defaultProps = {
  begin_iteration: 1,
  end_iteration: 8,
  duration: "10s",
  reset: 'reverse',
  // rules: [],
  lineJoin: "round",
  strokeWidth: 2,
  animateStrokeWidth: true,
};

export default withStyles(theme => {
  const dark = theme.palette.type === 'dark';
  const color = dark ? darken(theme.palette.secondary.dark, 0.2) : lighten(theme.palette.secondary.light, 0.2);
  return ({
    svg: {
      stroke: color,
      zIndex: -99,
      overflow: 'visible',
    },
  });
})(HilbertMorph);

/**
 * -- THIS FILE ---------------------------------------------------------------
 * TODO: Keep consistent number of points? (for SVG morph animation)
 *
 * TODO: Possibly use requestAnimationFrame to reduce overhead with React.
 *
 * TODO: Switch useEffect() to useMemo() 
 *       (Must have no side effects. See if code produces side effects when rendering.)
 * 
 * TODO: Add settings for duration, strokeWidth, strokeWidthAnimate, & lineJoin properties.
 *       BackgroundTool.jsx needs menu options. Background.jsx needs selection logic.
 *       Consider changing to setting the background dynamically without needing to
 *       specifically add logic to handle every new background.
 * 
 * 
 * -- WHOLE PROJECT -----------------------------------------------------------
 * TODO: Save theme settings in browser cookie (per-visit/cross-visit?...Setting?)
 * 
 * TODO: Add Google Analytics
 *  - Track visitor count (display?)
 *  - Select default theme based on company (Google -> Material theme, MS -> Fluent theme)
 *  - Gather information on visitors -> Present to Sam (notification on non-Sam view?)
 * 
 * TODO: Generalize to all L-Systems
 *   axiom = str
 *   rules = [char -> [char...]...]
 *   props = [char -> path_draw_str...]
 *   Examples of props:
 *    - Angle of turn
 *    - Distance of unit of movement
 *   Standardize symbols for shorthand when props are not defined 
 *     (ie. F = forward, L = left)
 *   Axiom, Rules default to hilbert curve
 * 
 * TODO: Create rules & props for other standard L-systems
 *  - Sierpinski's triangle (Regular + Arrowhead?)
 *  - Tree
 *  - Flow Snake
 *  - Koch Snowflake
 *  - Dragon Curve
 * 
 * TODO: Allow custom animation heuristics (Interpolate points[i]->points[i++], ...)
 *  - Morph SVG paths
 *  - Draw path string tokenwise
 * 
 */