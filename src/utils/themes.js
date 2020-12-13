import Lunicode from 'lunicode';
import { zalgo, } from '@utils/text';
import { LightenDarkenColor } from '@utils/color';
import {
  red, blue, green, yellow, purple, orange, cyan, pink,
} from '@material-ui/core/colors';

// var luni = new Lunicode();

// TODO: Import white
export const colors = {
  red,
  blue,
  green,
  yellow,
  purple,
  orange,
  cyan,
  pink,
};
export const densities = {
  dense: {
    props: {
      MuiButton: {
        size: 'small',
      },
      MuiFilledInput: {
        margin: 'dense',
      },
      MuiFormControl: {
        margin: 'dense',
      },
      MuiFormHelperText: {
        margin: 'dense',
      },
      MuiIconButton: {
        size: 'small',
      },
      MuiInputBase: {
        margin: 'dense',
      },
      MuiInputLabel: {
        margin: 'dense',
      },
      MuiListItem: {
        dense: true,
      },
      MuiOutlinedInput: {
        margin: 'dense',
      },
      MuiFab: {
        size: 'small',
      },
      MuiTable: {
        size: 'small',
      },
      MuiTextField: {
        margin: 'dense',
      },
      MuiToolbar: {
        variant: 'dense',
      },
    },
    overrides: {
      MuiIconButton: {
        sizeSmall: {
          // Adjust spacing to reach minimal touch target hitbox
          marginLeft: 4,
          marginRight: 4,
          padding: 12,
        },
      },
    },
  },
  defaut: {
    props: {},
    overrides: {},
  },
  
};
export const backgrounds = [
  'Hilbert',
  'Starfield',
  'Snow',
  'Solid',
  'Wavy',
  '10 Print',
];

export const themeValueBounds = {
  blur: {
    min: 0,
    max: 16,
    step: 2,
    unit: 'px',
  },
  opacity: {
    min: 0.5,
    max: 1,
    step: 0.05,
    unit: '',
  },
  shape: {
    borderRadius: {
      min: 0,
      max: 32,
      step: 2,
      unit: 'px',
    },
  },
  spacing: {
    min: 2,
    max: 16,
    step: 2,
    unit: 'px',
  }
};


export const normalText = (text) => (text);

export const zalgoText = (text) => (zalgo(text));

export function mirrorText(text) {
  var luni = new Lunicode();
  return luni.tools.flip.encode(text);
};

export function bubbleText(text) {
  var luni = new Lunicode();
  return luni.tools.bubbles.encode(text);
};

export function boxText(text) {
  var luni = new Lunicode();
  return luni.tools.squares.encode(text);
};

export function bentText(text) {
  var luni = new Lunicode();
  return luni.tools.bent.encode(text);
};

export function smallText(text) {
  var luni = new Lunicode();
  return luni.tools.tiny.encode(text);
};

export const textEffects = {
  normal: normalText,
  zalgo: zalgoText,
  // mirror: mirrorText,
  // bubbles: bubbleText,
  // squares: boxText,
  // bent: bentText,
  // smallcaps: smallText,
};

let dark = true;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  dark = true
} else dark = false;

export const defaultTheme = {
  background: 'Hilbert',
  blur: 0,
  colorful: false,
  name: 'Default',
  opacity: 1,
  palette: {
    type: dark ? 'dark' : 'light',
    background: {
      default: dark ? '#181818' : '#fafafa',
    },
    primary: purple,
    secondary: pink,
    subtle: {
      dark: LightenDarkenColor(purple[900], -50),
      light: purple[100],
    },
  },
  shape: {
    borderRadius: 8,
    paper: true,
    glass: false,
  },
  spacing: 4,
  textEffect: normalText,
};
export const midnightTheme = {
  background: 'Snow',
  blur: 0,
  colorful: false,
  name: 'Midnight',
  opacity: 1,
  palette: {
    type: 'dark',
    background: {
      default: '#212121',
    },
    primary: blue,
    secondary: "#fff",
    subtle: {
      dark: LightenDarkenColor(blue[900], -50),
      light: blue[100],
    },
  },
  shape: {
    borderRadius: 8,
    paper: true,
    glass: false,
  },
  spacing: 4,
  textEffect: normalText,
};

export const winterTheme = {
  background: 'Snow',
  blur: 0,
  colorful: false,
  name: 'Winter Wonderland',
  opacity: 1,
  palette: {
    type: 'light',
    background: {
      default: '#fafafa',
    },
    primary: cyan,
    secondary: pink,
    subtle: {
      dark: LightenDarkenColor(cyan[900], -50),
      light: cyan[100],
    },
  },
  shape: {
    borderRadius: 2,
    paper: true,
    glass: false,
  },
  spacing: 8,
  textEffect: normalText,
};
export const orangeTheme = {
  background: 'Hilbert',
  blur: 0,
  colorful: false,
  name: 'Orange',
  opacity: 1,
  palette: {
    type: dark ? 'dark' : 'light',
    background: {
      default: dark ? '#212121' : '#fafafa',
    },
    primary: orange,
    secondary: orange,
    subtle: {
      dark: LightenDarkenColor(orange[900], -50),
      light: orange[100],
    },
  },
  shape: {
    borderRadius: 8,
    paper: true,
    glass: false,
  },
  spacing: 4,
  textEffect: normalText,
};
export const blueTheme = {
  background: 'Hilbert',
  blur: 0,
  colorful: false,
  name: 'Blue',
  opacity: 1,
  palette: {
    type: dark ? 'dark' : 'light',
    background: {
      default: dark ? '#212121' : '#fafafa',
    },
    primary: blue,
    secondary: blue,
    subtle: {
      dark: LightenDarkenColor(blue[900], -50),
      light: blue[100],
    },
  },
  shape: {
    borderRadius: 8,
    paper: true,
    glass: false,
  },
  spacing: 4,
  textEffect: normalText,
};
export const wavyTheme = {
  background: 'Wavy',
  blur: 0,
  colorful: false,
  name: 'Blue',
  opacity: 1,
  palette: {
    type: 'light',
    background: {
      default: '#fafafa',
    },
    primary: blue,
    secondary: blue,
    subtle: {
      dark: LightenDarkenColor(blue[900], -50),
      light: blue[100],
    },
  },
  shape: {
    borderRadius: 16,
    paper: true,
    glass: true,
  },
  spacing: 4,
  textEffect: normalText,
};
export const whereTheme = {
  background: 'Hilbert',
  blur: 0,
  colorful: false,
  name: 'Where am I?',
  opacity: 1,
  palette: {
    type: dark ? 'dark' : 'light',
    background: {
      default: dark ? '#181818' : '#fafafa',
    },
    primary: purple,
    secondary: yellow,
    subtle: {
      dark: LightenDarkenColor(purple[900], -50),
      light: purple[100],
    },
  },
  shape: {
    borderRadius: 8,
    paper: true,
    glass: false,
  },
  spacing: 4,
  textEffect: zalgoText,
};

export const presets = {
  'Default': defaultTheme,
  'Midnight': midnightTheme,
  'Winter Wonderland': winterTheme,
  'Orange': orangeTheme,
  'Blue': blueTheme,
  'Where am I?': whereTheme,
  'Wavy': wavyTheme,
}

export default { backgrounds, colors, defaultTheme, presets, midnightTheme, textEffects, themeValueBounds };
