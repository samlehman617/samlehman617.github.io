import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import * as presets from '../components/theming/themes';
import { PresetContext } from './PresetContext';

export const ShapeContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ShapeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  ShapeContext.displayName = 'ShapeContext';
}

const getInitial = (active, name) => {
  const cookieValue = Cookies.getJSON("shape");
  if (active) {
    console.log("ShapeContext:\nInitial from preset", name);
    return presets[name] ? presets[name].shape : presets['Default'].shape;
  }
  else if (process.browser && cookieValue) {
    console.log("ShapeContext:\nInitial from cookie:", cookieValue);
    return cookieValue;
  } else {
    console.log("ShapeContext:\nInitial from default:", presets['Default'].shape);
    return presets['Default'].shape;
  }
};


export function ShapeProvider(props) {
  const { children } = props;
  const [ presetActive, presetName, setPresetActive, setPresetName ] = React.useContext(PresetContext);
  // const defaultPreset = presets[initial];

  const [shape, setShape] = React.useReducer((state, action) => {
    console.log("ShapeContext: setting value to", state);
    // setPresetActive(false);
    switch (action.type) {
      case 'SET':               return { borderRadius: action.payload || state.borderRadius };
      // case 'SET_NAME': console.log(state); return { state }
      case 'SET_BORDER_RADIUS': return { borderRadius: action.payload || state.borderRadius };
      case 'INCREMENT':         return { borderRadius: state.borderRadius + 1 };
      case 'DECREMENT':         return { borderRadius: state.borderRadius - 1 };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, getInitial(presetActive, presetName));

  // Persist palette in cookie
  React.useEffect(() => {
    console.log("ShapeSwitcher: storing value in cookie:", shape);
    Cookies.set("shape", shape);
  }, [shape]);

  // const paletteTypeObject = React.useMemo(() => ({ type: paletteType }), [paletteType]);
  const changeBorderRadius = React.useCallback((v) => {
    console.log("ShapeContext: hook borderRadius to", v);
    setShape({ type: 'SET_BORDER_RADIUS', payload: v });
  }, [setShape]);
  const increaseBorderRadius = React.useCallback(() => {
    console.log("ShapeContext: hook increaseBorderRadius");
    setShape({ type: 'INCREMENT' });
  }, [setShape]);
  const decreaseBorderRadius = React.useCallback(() => {
    console.log("ShapeContext: hook decreaseBorderRadius");
    setShape({ type: 'DECREMENT' });
  }, [setShape]);

  return (
    <PresetContext.Provider value={[ shape.borderRadius, changeBorderRadius, increaseBorderRadius, decreaseBorderRadius ]}>
      {children}
    </PresetContext.Provider>
  );
};

ShapeProvider.propTypes = {
  children: PropTypes.node,
};
ShapeProvider.defaultProps = {
};

// /**
//  * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
//  */
// export function useChangeShape() {
//   const dispatch = React.useContext(ShapeContext);
//   return React.useCallback((options) => dispatch({ type: 'SET', payload: options }), [dispatch]);
// }