import React, {
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import {
  ThemeProvider as MuiThemeProvider,
  // createMuiTheme as createLegacyModeTheme,
  responsiveFontSizes,
  unstable_createMuiStrictModeTheme as createStrictModeTheme,
  // darken,
} from '@material-ui/core/styles';
import {
  createMuiTheme
} from '@material-ui/core';
// import { useSelector } from 'react-redux';
import * as colors from '@material-ui/core/colors';
import highDensity from './options/density/high';
import { PaletteColorsProvider, PaletteColorsContext } from './PaletteColorsContext';
import { PaletteTypeProvider, PaletteTypeContext } from './PaletteTypeContext';
import { DensityProvider, DensityContext } from './DensityContext'; 

import * as presets from './themes';
const defaultTheme = presets['Default'];

console.log(
  "ThemeProvider: Globals",
  "\nColors:", Object.keys(colors),
  "\nPresets:", Object.keys(presets), presets, presets['Default'].name
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
export const ThemeContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});
export const DirectionContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `DirectionProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'ThemeDispatchContext';
  DirectionContext.displayName = 'DirectionDispatchContext';
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

  const [ paletteColors, setPaletteColors ] = useContext(PaletteColorsContext);
  const [ paletteType,   setPaletteType   ] = useContext(PaletteTypeContext);
  const [ density,       setDensity       ] = useContext(DensityContext);
  // const [ direction,     setDirection     ] = useContext(DirectionContext);

  const { dense, spacing } = density;
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
  const direction = 'ltr';

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  // Handle new changes to state
  const theme = React.useMemo(() => {
    // Create MuiTheme from our settings
    const nextTheme = createMuiTheme({
      direction,
      nprogress: { color: paletteType === 'light' ? '#000' : '#fff' },
      palette: { ...paletteType, ...paletteColors },
      spacing,
    }, dense ? highDensity : null,
    );
    return nextTheme;
  }, [
      dense,
      spacing,
      direction,
      paletteColors,
      paletteType,
  ]);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider>
        {children}
      </ThemeContext.Provider>
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
  const dispatch = React.useContext(ThemeContext);
  return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
export function useChangePaletteType() {
    const dispatch = React.useContext(ThemeContext);
    return [dispatch.paletteType, React.useCallback((type) => dispatch({ type: 'SET_PALETTE_TYPE', payload: type }), [dispatch])];
}
export function useChangePrimaryColor() {
  const dispatch = React.useContext(ThemeContext);
  return React.useCallback((options) => dispatch({ type: 'SET_PRIMARY_COLOR', payload: options }), [dispatch]);
}
export function useChangeSecondaryColor() {
  const dispatch = React.useContext(ThemeContext);
  return React.useCallback((options) => dispatch({ type: 'SET_SECONDARY_COLOR', payload: options }), [dispatch]);
}
export function useChangePaperColor() {
  const dispatch = React.useContext(ThemeContext);
  return React.useCallback((options) => dispatch({ type: 'SET_PAPER_COLOR', payload: options }), [dispatch]);
}
export function useChangeBackgroundColor() {
  const dispatch = React.useContext(ThemeContext);
  return React.useCallback((options) => dispatch({ type: 'SET_BACKGROUND_COLOR', payload: options }), [dispatch]);
}
export const usePaletteType = () => React.useContext(ThemeContext).paletteType;