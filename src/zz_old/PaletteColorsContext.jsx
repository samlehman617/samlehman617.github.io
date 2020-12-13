import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { PresetContext } from './PresetContext';

import * as presets from '../components/theming/themes';
const defaultTheme = presets['Default'];


export const PaletteColorsContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `PaletteProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  PaletteColorsContext.displayName = 'PaletteColorsDispatchContext';
}

const getInitial = (active, name) => {
  if (active) {
    console.log("PaletteColorsContext:\nInitial from preset", name)
    return presets[name];
  } else if (process.browser && Cookies.getJSON("palette")) {
    console.log("PaletteColorsContext:\nInitial from cookie")
    return { ...defaultTheme.paletteColors, ...Cookies.getJSON("palette") };
  } else {
    console.log("PaletteColorsContext:\nInitial from default.");
    return defaultTheme.paletteColors;
  }
};


export function PaletteColorsProvider(props) {
  const { children } = props;
  const [presetActive, presetName, setPresetActive, setPresetName] = React.useContext(PresetContext);

  const [paletteColors, setPaletteColors] = React.useReducer((state, action) => {
    // setPresetActive(false);
    switch (action.type) {
      case 'SET_PRIMARY':
        return {
          ...state,
          primary: action.payload || state.primary,
        };
      case 'SET_SECONDARY':
        return {
          ...state,
          secondary: action.payload || state.secondary,
        };
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload || state.error,
        };
      case 'SET_WARNING':
        return {
          ...state,
          warning: action.payload || state.warning,
        };
      case 'SET_INFO':
        return {
          ...state,
          info: action.payload || state.info,
        };
      case 'SET_SUCCESS':
        return {
          ...state,
          success: action.payload || state.payload,
        };
      case 'SET_PAPER':
        return {
          ...state,
          paper: action.payload || state.paper,
        };
      case 'SET_BACKGROUND':
        return {
          ...state,
          background: action.payload || state.background,
        };
      case 'CHANGE':
        return {
          primary: action.payload.primary       || state.primary,
          secondary: action.payload.secondary   || state.secondary,
          error: action.payload.error           || state.error,
          warning: action.payload.warning       || state.warning,
          info: action.payload.info             || state.info,
          success: action.payload.success       || state.success,
          paper: action.payload.paper           || state.paper,
          background: action.payload.background || state.background,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, getInitial(presetActive, presetName));

  const { primary, secondary, error, warning, info, success, paper, background } = paletteColors;

  // React.useEffect(() => {
  //   if (process.browser) {
  //     const nextPaletteColors = JSON.parse(Cookies.get("palette") || 'null');

  //     setPaletteColors({
  //       type: 'CHANGE',
  //       payload: { ...nextPaletteColors },
  //     });
  //   }
  // }, []);

  // Persist palette in cookie
  React.useEffect(() => {
    Cookies.set("palette", paletteColors);
  }, [paletteColors]);

  const paletteColorsObject = React.useMemo(() => {
    return {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      error: {
        main: error,
      },
      warning: {
        main: warning,
      },
      info: {
        main: info,
      },
      success: {
        main: success,
      },
      background: {
        paper: paper,
        default: background,
      },
    };
  }, [primary, secondary, error, warning, info, success, paper, background]);

  const changePaletteColors = React.useCallback((v) => {
    console.log("PaletteColorsContext: setting to", v);
    setPaletteColors({ type: 'CHANGE', payload: v });
  }, [setPaletteColors]);

  return (
    <PaletteColorsContext.Provider value={[ paletteColors, changePaletteColors ]}>
      {children}
    </PaletteColorsContext.Provider>
  );
}

PaletteColorsProvider.propTypes = {
  children: PropTypes.node,
};

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangePalette() {
  const dispatch = React.useContext(PaletteColorsContext);
  return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}