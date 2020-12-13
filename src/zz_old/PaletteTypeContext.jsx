import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { PresetContext } from './PresetContext'
import * as presets from './themes';
import { useMediaQuery } from '@material-ui/core';
const defaultTheme = presets['Default'];

export const PaletteTypeContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `PaletteTypeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  PaletteTypeContext.displayName = 'PaletteTypeDispatchContext';
}

const getInitial = (active, name) => {
  const cookieValue = Cookies.get("paletteType");
  if (active) {
    // console.log("PaletteTypeContext: using preset", name, presets[name].paletteType);
    console.log("PaletteTypeContext:\nInitial from preset", name);
    return defaultTheme.paletteType;
  } else if (
    process.browser && (
    cookieValue === "light" ||
    cookieValue === "dark" ||
    cookieValue === "system"
  )) {
    console.log("PaletteTypeContext:\nInitial from cookie:", cookieValue);
    return cookieValue;
  } else {
    console.log("PaletteTypeContext:\nInitial from default:", defaultTheme.paletteType);
    return defaultTheme.paletteType;
  }
};


export function PaletteTypeProvider(props) {
  const { children } = props;
  const [presetActive, presetName, setPresetActive, setPresetName] = React.useContext(PresetContext);
  const systemMode = useMediaQuery('(prefersColorScheme: dark') ? 'dark' : 'light';

  const [paletteType, setPaletteType] = React.useReducer((state, action) => {
    console.log("PaletteTypeContext: setting to", state);
    // setPresetActive(false);
    switch (action.type) {
      case 'SET':        return action.payload || state;
      case 'SET_DARK':   return 'dark';
      case 'SET_LIGHT':  return 'light';
      case 'SET_SYSTEM': return 'system';
      case 'TOGGLE':
        if (state === 'dark' || (state === 'system' && systemMode === 'dark')) return 'light';
        else return 'dark';
      default: throw new Error(`Unrecognized type ${action.type}`);
    }
  }, getInitial(presetActive, presetName));

  // Persist palette in cookie
  React.useEffect(() => {
    Cookies.set("paletteType", paletteType);
    console.log("PaletteTypeContext: value changed to", paletteType);
  }, [paletteType]);

  // TODO: Pass to PaletteColorsContext to build colors from type.
  const paletteTypeObject = React.useMemo(() => ({ type: paletteType }), [paletteType]);

  // Define setter.
  const changePaletteType = React.useCallback((pt) => {
    console.log("PaletteTypeContext: setting to", pt);
    setPaletteType({ type: 'SET', payload: pt });
  }, [setPaletteType]);

  return (
    // <PaletteTypeContext.Provider value={[ paletteType, (v)=> dispatch({type: 'SET', payload: v}) ]}>
    <PaletteTypeContext.Provider value={[ paletteType, changePaletteType]}>
      {children}
    </PaletteTypeContext.Provider>
  );
}

PaletteTypeProvider.propTypes = {
  children: PropTypes.node,
};