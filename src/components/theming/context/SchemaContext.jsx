import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { capitalize } from '@material-ui/core';
import { usePreset } from './PresetContext';
import * as presets from '../themes';

export const SchemaContext = createContext(() => {
  throw new Error('Forgot to wrap component in `SchemaProvider`');
});
if (process.env.NODE_ENV !== 'production') {
  SchemaContext.displayName = 'SchemaContext';
}

export const SchemaProvider = props => {
  const { children } = props;
  const [presetUse, presetName, setPresetUse, setPresetName] = usePreset();

  // Get initial value
  let initialSchema;
  if (presetUse) {
    initialSchema = presets[presetName].schema;
  } else {
    initialSchema = Cookies.get("schema");
  }
  const [schema, setSchema] = useState(initialSchema || 1);

  // Save changes to cookie.
  useEffect(() => {
    Cookies.set("schema", schema);
  }, [schema]);

  const provide = { schema, setSchema };
  return (
    <SchemaContext.Provider value={provide}>
      {children}
    </SchemaContext.Provider>
  );
};

export const useSchema = () => {
  const { schema, setSchema } = useContext(SchemaContext);
  return [
    schema,
    useCallback((v) => setSchema(v), [setSchema])
  ];
};