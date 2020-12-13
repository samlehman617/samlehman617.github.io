import React, { 
    createContext,
    // useCallback,
    // useContext,
    useEffect,
    // useLayoutEffect,
    // useMemo,
    useReducer,
} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { PresetContext } from './PresetContext';
import * as presets from './themes';
import { debug } from '../../App';

// Props & Overrides for high density theme
// const highDensity = {
//     props: {
//       MuiButton:         {size:    'small'},
//       MuiChip:           {size:    'small'},
//       MuiFab:            {size:    'small'},
//       MuiFilledInput:    {margin:  'dense'},
//       MuiFormControl:    {margin:  'dense'},
//       MuiFormHelperText: {margin:  'dense'},
//       MuiIconButton:     {size:    'small'},
//       MuiInputBase:      {margin:  'dense'},
//       MuiInputLabel:     {margin:  'dense'},
//       MuiListItem:       {dense:   true   },
//       MuiOutlinedInput:  {margin:  'dense'},
//       MuiTable:          {size:    'small'},
//       MuiTextField:      {margin:  'dense'},
//       MuiToolbar:        {variant: 'dense'},
//     },
//     overrides: {
//       MuiIconButton: {
//         sizeSmall: {
//           // minimal touch target hit spacing
//           marginLeft: 4,
//           marginRight: 4,
//           padding: 12,
//         },
//       },
//     },
//   };

export const initialDensity = {
    dense: false,
    spacing: 8,
};

export const DensityContext = createContext(() => {
    throw new Error('Forgot to wrap component in `DensityProvider`');
});

if (process.env.NODE_ENV !== 'production') {
    DensityContext.displayName = 'DensityDispatchContext';
}

const getInitial = (active, name) => {
  if (active) {
    console.log("DensityContext:\nInitial from preset", name);
    return presets[name];
  } else if (process.browser && Cookies.getJSON("density")) {
    console.log("DensityContext:\nInitial from cookie:", Cookies.getJSON("density"))
    return Cookies.getJSON("density")
  } else {
    console.log("DensityContext:\nInitial from default:", presets['Default'].dense, presets['Default'].spacing);
    return { dense: presets['Default'].dense, spacing: presets['Default'].spacing };
  }
}

/**
 * Provides the density & spacing settings for the application.
 */
export function DensityProvider(props) {
    const { children } = props;
    const [presetActive, presetName, setPresetActive, setPresetName] = React.useContext(PresetContext);

    const [density, setDensity] = useReducer((state, action) => {
      // setPresetActive('false');
      switch (action.type) {
        case 'TOGGLE_DENSE':     return {dense:   !state.dense                   };
        case 'SET_DENSE':        return {dense:   action.payload || state.dense  };
        case 'SET_SPACING':      return {spacing: action.payload || state.spacing};
        case 'INCREASE_SPACING': return {spacing: state.spacing + 1              };
        case 'DECREASE_SPACING': return {spacing: state.spacing - 1              };
        case 'CHANGE': return {
          dense:    action.payload.dense    || state.dense,
          spacing:  action.payload.spacing  || state.spacing,
        }
        default: throw new Error(`Unrecognized type ${action.type}`);
      }
    }, getInitial(presetActive, presetName));
  
    // Persist settings in cookie on change
    useEffect(() => {Cookies.set("density", density)}, [density])
  
    const changeDensity = React.useCallback((v) => {
      console.log("DensityContext: setting to", v);
      setDensity({ type: 'CHANGE', payload: v });
    }, [setDensity])
  
    const changeDense = React.useCallback((v) => {
      console.log("DensityContext: setting to", v);
      setDensity({ type: 'SET_DENSE', payload: v });
      }, [setDensity])
    const changeSpacing = React.useCallback((v) => {
      console.log("DensityContext: setting to", v);
      setDensity({ type: 'SET_SPACING', payload: v });
    }, [setDensity])
    const increaseSpacing = React.useCallback((v) => {
      console.log("DensityContext: setting to", v);
      setDensity({ type: 'INCREASE_SPACING'});
    }, [setDensity])
    const decreaseSpacing = React.useCallback((v) => {
      console.log("DensityContext: setting to", v);
      setDensity({ type: 'DECREASE_SPACING'});
    }, [setDensity])
    return (
      <DensityContext.Provider value={[ density, changeDense, changeSpacing, increaseSpacing, decreaseSpacing ]}>
          {children}
      </DensityContext.Provider>
    );
  };
  DensityProvider.propTypes = {
    children: PropTypes.node,
    // value: PropTypes.object,
  };