import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export const PresetContext = createContext(() => {
    throw new Error('Forgot to wrap component in `PresetProvider`');
});

if (process.env.NODE_ENV !== 'production') {
    PresetContext.displayName = 'PresetContext';
}

const getInitialPreset = (initial) => {
    const cookie = Cookies.getJSON("preset");
    let newCookie;
    const initialPreset = (
        (initial !== "") &&
        (initial !== undefined) &&
        (initial !== null)
    );

    // if (initialPreset) {
        // return { }
    // }

    // Set cookie if it doesn't exist.
    if (cookie === undefined) {
        console.log("PresetContext: No cookie found. Creating...")
        newCookie = { use: initialPreset, name: initialPreset ? initial : 'Snow'}
        Cookies.set("preset", newCookie);
        return newCookie;
    } else {
        console.log("PresetContext: Preset cookie found!")
        const cookieUse = ( 
            (cookie['preset'] !== "") &&
            (cookie['preset'] !== undefined) &&
            (cookie['preset'] !== null)
        );
        if (cookieUse) {
            console.log("PresetContext: Preset found in cookie!");
            return cookie;
        } else {
            console.log("PresetContext: Preset name not set in cookie. Using default.")
            return { use: false, name: 'Snow' };
        }
    }
}

export const PresetProvider = (props) => {
    const { children, value } = props;
    const initial= getInitialPreset(value);
    
    const [use, setUse] = useState(initial.use);
    const [name, setName] = useState(initial.name);

    // Store preset settings in cookie.
    useEffect(() => {
        Cookies.set("preset", { use, name });
    }, [use, name]);

    const values = [use, name, setUse, setName];
    return (
        <PresetContext.Provider value={values}>
            {children}
        </PresetContext.Provider>
    );
};
PresetProvider.propTypes = {
    value: PropTypes.string,
    children: PropTypes.node.isRequired,
};
export function usePreset() {
    const [usePreset, presetName, setUse, setName] = useContext(PresetContext);
    return [
        usePreset,
        presetName,
        useCallback(use => setUse(use), [setUse]),
        useCallback(name => setName(name), [setName]),
    ];
};
export function usePresetToggle() {
    // const [usePreset, presetName, setUse, setName] = useContext(PresetContext);
    const [usePreset, , setUse, ,] = useContext(PresetContext);
    return [
        usePreset,
        useCallback(() => setUse(!usePreset), [setUse, usePreset])
    ];
};