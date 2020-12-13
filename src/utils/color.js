import * as colors from '@material-ui/core/colors';

export function LightenDarkenColor(col, amt) {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

export const hextoRGB = hex => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    r = 0;
    g = 0;
    b = 0;
  }
  return [r, g, b];
};

export function hextoRGBA(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = parseInt(hex.slice(7, 9), 16);
  return [r, g, b, a];
};

/**
 * Builds a palette color given a base hue and shade.
 * @param {string} hue Base hue to build from.
 * @param {string} shade Base shade to build from.
 * @param {float} opacity Opacity to use for transparent colors from [0.0, 1.0]
 */
export const buildColor = (hue, shade, opacity) => {
    const main = colors[hue][shade];
    return {
        main,
        transparent: main + (opacity * 255).toString(16),
    };
};

export function buildPalette(mode, primary, secondary, paper, background) {
  const palette = {
    type: mode,
    primary: primary,
    secondary,
    background: {
      paper,
      default: background,
    },
  };

  return palette;
};

export default {
  LightenDarkenColor,
  hextoRGB,
  hextoRGBA,
  buildColor,
  buildPalette,
};
