import React, {
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useMediaQuery, capitalize } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import * as presets from '../themes';
const defaultPreset = presets['Default'];
const defaultMode       = defaultPreset.paletteMode;
const defaultType       = defaultPreset.paletteType;
const defaultPrimary    = defaultPreset.paletteColors.primary; 
const defaultSecondary  = defaultPreset.paletteColors.secondary; 
const defaultPaper      = defaultPreset.paletteColors.paper; 
const defaultBackground = defaultPreset.paletteColors.background;

export const PaletteContext = createContext(() => {
  throw new Error('Forgot to wrap component in `PaletteProvider`');
});
export const PaletteTypeContext = createContext(() => {
  throw new Error('Forgot to wrap component in `PaletteTypeProvider`');
});
export const PaletteModeContext = createContext(() => {
  throw new Error('Forgot to wrap component in `PaletteTypeProvider`');
});
export const PrimaryColorContext = createContext(() => {
  throw new Error('Forgot to wrap component in `PrimaryColorProvider`');
});
export const SecondaryColorContext = createContext(() => {
  throw new Error('Forgot to wrap component in `SecondaryColorProvider`');
});
export const PaperColorContext = createContext(() => {
  throw new Error('Forgot to wrap component in `PaperColorProvider`');
});
export const BackgroundColorContext = createContext(() => {
  throw new Error('Forgot to wrap component in `BackgroundColorProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  PaletteContext.displayName = 'PaletteContext';
};

/**
 * Returns a merged object of default values with overrides stored in cookie,
 * @param {string} presetName Name of the preset to retrieve values from.
 */
const mergeSavedWithPreset = (presetName = 'Default') => {
  const preset = presets[capitalize(presetName)];
  return { ...preset.colors, ...Cookies.getJSON("colors") }
};

/**
 * Retrieves hex color from an object of colors. 
 * Default uses Material Design hue name and shade name.
 * @param {string} hue Name of the hue
 * @param {number|string} shade Name of the shade
 */
const getRGBHex = (hue, shade, colorobj=colors) => colorobj[hue][shade];

/**
 * Retrieves the hue name and shade name of a RGB hex color.
 * @param {string} hex Hexidecimal RGB representation of a color
 * @param {object} colorobj Object containing colors selected by a hue name and a shade name.
 */
const getHueShade = (hex, colorobj = colors) => {

}
/**
 * Builds a palette color given a base hue and shade.
 * @param {string} hue Base hue to build from.
 * @param {string} shade Base shade to build from.
 * @param {float} opacity Opacity to use for transparent colors from [0.0, 1.0]
 */
const buildColor = (hue, shade, opacity) => {
  const main = colors[hue][shade];
  return {
    main,
    transparent: main + (opacity * 255).toString(16),
  };
};

/**
 * Provides the type of palette we are using. (i.e. Light or Dark mode)
 * @param {*} props 
 */
export const PaletteTypeProvider = (props) => {
  const { children } = props;
  const systemType = useMediaQuery('(prefers-color-scheme: dark') ? 'dark' : 'light';
  const [state, setState] = useState('system');
  let result = state;
  if (result === 'system') {
    result = systemType;
  } else if (result === 'sun') {
    // TODO: Get sunrise/sunset values from location/locale.
    // Need: 
    //   location + time OR
    //   timezone + elevation
    // See if possible to determine without needing to request permission.
  } else return state;

  return (
    <PaletteTypeContext.Provider value={[result, state, setState]}>
      {children}
    </PaletteTypeContext.Provider>
  );
}; 

/**
 * Provides the type of coloring system we are using.
 * Options include 'rgb', 'rgba', 'hsl', 'hsla', 'material'
 * @param {*} props 
 */
export const PaletteModeProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState('material');
  return (
    <PaletteModeContext.Provider value={state}>
      {children}
    </PaletteModeContext.Provider>
  );
};
PaletteModeProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export const PrimaryColorProvider = (props) => {
  const { children } = props;
  const mode = useContext(PaletteModeProvider);

  
  if (mode === 'material') {
    const [state, dispatch] = useReducer((old, action) => {
      switch (action.type) {
        case 'SET_HUE': return { ...old, hue: action.payload };
        case 'SET_SHADE': return { ...old, shade: action.payload };
        case 'SET_HEX': return getHueShade(action.payload);
        default: throw new Error(`PrimaryColorProvider: Unrecognized type ${action.type}`);
      }
    });
  }
  const [state, dispatch] = useReducer((old, action) => {
    switch (action.type) {
      case 'SET_HUE':     return { ...old, hue:   action.payload };
      case 'SET_SHADE':   return { ...old, shade: action.payload };
      case 'SET_PRIMARY': return action.payload;
      case 'SET':         return action.payload;
      default: throw new Error(`PrimaryColorProvider: Unrecognized type ${action.tpye}`);
    }
  });
  return (
    <PrimaryColorContext.Provider value={[state, dispatch]}>
      {children}
    </PrimaryColorContext.Provider>
  );
};

export const PaletteProvider = (props) => {
  const { children } = props;
  const [mode,        setMode      ] = useContext(PaletteModeProvider);
  const [type, sType, setType      ] = useContext(PaletteTypeProvider);
  const [primary,     setPrimary   ] = useContext(PrimaryColorContext);
  const [secondary,   setSecondary ] = useContext(SecondaryColorContext);
  const [paper,       setPaper     ] = useContext(PaperColorContext);
  const [background,  setBackground] = useContext(BackgroundColorContext);

  const state = {
    type,
    primary,
    secondary,
    paper,
    background,
  };
  const [state, dispatch] = useReducer((old, action) => {
    switch (action.type) {
      case 'SET_PRIMARY': return { ...old, primary: action.payload };
      case 'SET_SECONDARY': return { ...old, secondary: action.payload };
      case 'SET_PAPER': return { ...old, paper: action.payload };
      case 'SET_BACKGROUND': return { ...old, background: action.payload };
      case 'SET_PALETTE': return action.payload;
      case 'SET': return action.payload;
      default: throw new Error(`Unrecognized type ${action.type}`);
    }
  });
  return (
    <PaletteTypeProvider>
      <PaletteModeProvider>
        <PrimaryColorProvider>
          <SecondaryColorProvider>
            <PaperColorProvider>
              <BackgroundColorProvider>
                <PaletteContext.Provider value={[state, dispatch]}>
                  {children}
                </PaletteContext.Provider>
              </BackgroundColorProvider>
            </PaperColorProvider>
          </SecondaryColorProvider>
        </PrimaryColorProvider>
      </PaletteModeProvider>
    </PaletteTypeProvider>
  );
};
PaletteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};