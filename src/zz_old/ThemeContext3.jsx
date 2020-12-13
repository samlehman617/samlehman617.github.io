import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import {
  ThemeProvider as MuiThemeProvider,
  // createMuiTheme as createLegacyModeTheme,
  responsiveFontSizes,
  unstable_createMuiStrictModeTheme as createStrictModeTheme,
  darken,
} from '@material-ui/core/styles';
import {
  createMuiTheme
} from '@material-ui/core';
// import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as colors from '@material-ui/core/colors';
import highDensity from './options/density/high';

import * as presets from './themes';
const defaultTheme = presets['Default'];

console.log(
  "ThemeProvider: Globals",
  "\nColors:", Object.keys(colors),
  "\nPresets:", Object.keys(presets),
)

const setInitialOptions = () => {
  console.log("Default:", defaultTheme);
  const cookie = JSON.parse(Cookies.get("theme"));
  console.log("Cookie:", cookie);
  return { ...defaultTheme, ...cookie };
  if (cookie === undefined || cookie === "") {
    console.log("Theme: Cookie not set. Setting to Default theme now...");
    Cookies.set("theme", JSON.stringify(defaultTheme));
    return defaultTheme;
  } else {
    console.log("Theme: Cookie already set. Loading theme from cookie...");
    return JSON.parse(cookie);
  }
}

// Create a new context type for themes
export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext';
}

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

// let createMuiTheme;
// if (process.env.REACT_MODE === 'legacy') {
  // createMuiTheme = createLegacyModeTheme;
// } else {
  // createMuiTheme = createStrictModeTheme;
// }

// NEEDS TO HANDLE:
// 1. Initial load from cookie
// 2. Initial load from default
// 3. Setting values
export function ThemeProvider(props) {
  const { children } = props;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredType = prefersDarkMode ? 'dark' : 'light';

  // Create state and state dispatcher.
  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    console.log("THEME: Dispatch", action.type, action.payload);
    switch (action.type) {
      case 'SET_PRESET':
        return {
          use_preset: true,
          preset: action.payload,
          ...presets[action.payload],
        };
      case 'SET_SPACING':
        return {
          use_preset: false,
          spacing: action.payload,
        };
      case 'INCREASE_SPACING':
        return {
          use_preset: false,
          spacing: state.spacing + 1,
        };
      case 'DECREASE_SPACING':
        return {
          use_preset: false,
          spacing: state.spacing - 1,
        };
      case 'SET_DENSE':
        return {
          use_preset: false,
          dense: action.payload,
        };
      case 'RESET_DENSITY':
        return {
          use_preset: false,
          dense: defaultTheme.dense,
          spacing: defaultTheme.spacing,
        };
      case 'SET_PALETTE_TYPE':
        return {
          use_preset: false,
          paletteType: action.payload,
        };
      case 'SET_PRIMARY_COLOR':
        return {
          use_preset: false,
          paletteColors: {
            ...state.paletteColors,
            primary: action.payload.colors,
          }
        };
      case 'SET_SECONDARY_COLOR':
        return {
          use_preset: false,
          paletteColors: {
            ...state.paletteColors,
            secondary: action.payload.colors,
          }
        };
      case 'SET_PAPER_COLOR':
        return {
          use_preset: false,
          paletteColors: {
            background: {
              paperSolid: action.payload.color
            }
          }
        };
      case 'SET_BACKGROUND_COLOR':
        return {
          use_preset: false,
          paletteColors: {
            ...state.paletteColors,
            background: action.payload.colors,
          }
        };
      case 'RESET_COLORS':
        return {
          use_preset: false,
          paletteColors: defaultTheme.paletteColors,
        };
      case 'SET_BACKGROUND_EFFECT':
        return {
          use_preset: false,
          background: action.payload
        };
      case 'CHANGE':
        return {
          use_preset: false,
          paletteType: action.payload.paletteType || state.paletteType,
          direction: action.payload.direction || state.direction,
          paletteColors: action.payload.paletteColors || state.paletteColors,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, setInitialOptions());


  // Get individual options from state
  const {
    use_preset,
    preset,
    dense,
    direction,
    paletteColors,
    paletteType,
    spacing,
    background
  } = themeOptions;

  // Read user settings from cookie
  // React.useEffect(() => {
    // if (process.browser) {
      // const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
      // const nextPaletteType = getCookie('paletteType');

      // console.log(
        // "THEME: Reading theme settings from cookie...",
        // "\nOld:", paletteType, "New:", nextPaletteType,
        // "\nOld:", paletteColors, "New:", nextPaletteColors
      // );
      // Only update on changed values
      // if (
        // paletteType !== nextPaletteType &&
        // paletteColors !== nextPaletteColors
      // ) {
        // dispatch({
          // type: 'CHANGE',
          // payload: {
            // paletteColors: nextPaletteColors,
            // paletteType: nextPaletteType,
          // },
        // });
      // }
    // }
  // }, []);

  React.useEffect(() => {
    
    const initCookie = Cookies.get("theme");
    console.log("Init Cookie:", initCookie);
    const optionString = JSON.stringify(themeOptions);
    const cookieString = Cookies.get("theme");
    Cookies.set("theme", optionString);
    console.log(
      "Theme Updated:",
      "\nOptions Obj:", themeOptions,
      "\nOptions Str:", optionString,
      "\nCookies Str:", cookieString,
      "\nEqual:", optionString === cookieString ? "true" : "false"
    );
    if (Cookies.get("theme") !== themeOptions) {
      Cookies.set("theme", JSON.stringify(themeOptions));
    }
  }, [themeOptions]);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  // Handle new changes to state
  const theme = React.useMemo(() => {
    // Handle using system-defined dark mode
    let mode = paletteType === 'system' ? preferredType : paletteType;

    console.log(
      "\nTHEME: Change detected.",
      "\n    Direction:", direction,
      "\nPaletteColors:", paletteColors,
      "\n  PaletteType:", paletteType, "=>", mode,
      "\n      Spacing:", spacing,
      themeOptions
    );

    // Create MuiTheme from our settings
    let nextTheme;
    if (use_preset) {
      nextTheme = createMuiTheme(preset)
    } else {
      const nextTheme = createMuiTheme(
        {
          direction,
          nprogress: {
            color: mode === 'light' ? '#000' : '#fff',
          },
          palette: {
            primary: {
              main: mode === 'light' ? colors.blue[700] : colors.blue[200],
            },
            secondary: {
              main: mode === 'light' ? darken(colors.pink.A400, 0.1) : colors.pink[200],
            },
            type: mode,
            background: {
              default: mode === 'light' ? '#fff' : '#121212',
            },
            ...paletteColors,
          },
          spacing,
        },
        dense ? highDensity : null,
        // languageMap[userLanguage],
      );

      nextTheme.palette.background.level2 =
        mode === 'light' ? nextTheme.palette.grey[100] : '#333';

      nextTheme.palette.background.level1 =
        mode === 'light' ? '#fff' : nextTheme.palette.grey[900];
    }
    return nextTheme;
  }, [
      use_preset,
      preset,
      dense,
      direction,
      paletteColors,
      paletteType,
      preferredType,
      spacing,
      // userLanguage
  ]);

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if (process.browser) {
      window.theme = theme;
    }
  }, [theme]);

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
export function useChangePaletteType() {
    const dispatch = React.useContext(DispatchContext);
    return [dispatch.paletteType, React.useCallback((type) => dispatch({ type: 'SET_PALETTE_TYPE', payload: type }), [dispatch])];
}
export function useChangePrimaryColor() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((options) => dispatch({ type: 'SET_PRIMARY_COLOR', payload: options }), [dispatch]);
}
export function useChangeSecondaryColor() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((options) => dispatch({ type: 'SET_SECONDARY_COLOR', payload: options }), [dispatch]);
}
export function useChangePaperColor() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((options) => dispatch({ type: 'SET_PAPER_COLOR', payload: options }), [dispatch]);
}
export function useChangeBackgroundColor() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((options) => dispatch({ type: 'SET_BACKGROUND_COLOR', payload: options }), [dispatch]);
}
export const usePaletteType = () => React.useContext(DispatchContext).paletteType;