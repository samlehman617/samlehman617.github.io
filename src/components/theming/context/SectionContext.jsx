import React, {
    // createContext,
    // useCallback,
    useContext,
    // useEffect,
    useMemo,
    useReducer,
    // useState,
} from 'react';
import PropTypes from 'prop-types';
// import Cookies from 'js-cookie';
import {
    ThemeProvider as MuiThemeProvider,
    // capitalize,
    createMuiTheme,
    responsiveFontSizes,
    useMediaQuery,
} from '@material-ui/core';
// import { useThemeMode } from './SectionContext';
import { useThemeMode } from './ThemeContext';
import { buildColor, buildPalette } from '../../../utils/color';
// import * as colors from '@material-ui/core/colors';
import * as presets from '../themes';
import highDensity from '../options/density/high';
// import { languageMap } from '../options/languages';
// import { usePreset } from './PresetContext';
const defaultPreset = presets['Default'];

// Create a new context type for themes
export const SectionThemeContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `SectionThemeProvider`');
});
if (process.env.NODE_ENV !== 'production') {
  SectionThemeContext.displayName = 'SectionDispatchContext';
}

const SectionThemeProvider = props => {
    const {
        children,
        // index,
        // name
    } = props;

    // Use preset to select other values
    // const [presetUse, presetName, ] = usePreset();
    const [paletteType, ] = useThemeMode();

    // TODO: Set initial values.

    // TODO: Implement reducer actions
    // Actions: SET, INCREMENT, DECREMENT
    // Objects: (primary, secondary, paper, background)
    // action, object, value
    const [colors, setColors] = useReducer((old, action) => {
        switch (action.type) {
            case 'SET': break;
            default: break;
        }
    });
    const [spacing, setSpacing] = useReducer((old, action) => {

    });
    const [paper, setPaper] = useReducer((old, action) => {

    });
    const [background, setBackground] = useReducer((old, action) => {

    });
    const [header, setHeader] = useReducer((old, action) => {

    });
    const [footer, setFooter] = useReducer((old, action) => {

    });
    const [text, setText] = useReducer((old, action) => {

    });
    const [state, dispatch] = useReducer((old, action) => {
        switch (action.object) {
            case 'COLORS': {
                setColors(action.payload);
                break;
            }
            case 'SPACING': {
                setSpacing(action.payload);
                break;
            }
            case 'PAPER': {
                setPaper(action.payload);
                break;
            }
            case 'BACKGROUND': {
                setBackground(action.payload);
                break;
            }
            case 'HEADER': {
                setHeader(action.payload);
                break;
            }
            case 'FOOTER': {
                setFooter(action.payload);
                break;
            }
            case 'TEXT': {
                setText(action.payload);
                break;
            }
            default: break;
        }
    });

    // Build theme object
    const systemMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
    const mode = paletteType === 'system' ?
        // useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light' :
        systemMode :
        paletteType;
    const primaryHue = colors.primary ? colors.primary.hue : defaultPreset.paletteColors.primary.hue;
    const secondaryHue = colors.secondary ? colors.secondary.hue : defaultPreset.paletteColors.secondary.hue;
    const primaryShade = colors.primary ? colors.primary.shade : defaultPreset.paletteColors.primary.shade;
    const secondaryShade = colors.secondary ? colors.secondary.shade : defaultPreset.paletteColors.secondary.shade;
    const palette = buildPalette(
        mode,
        buildColor(primaryHue, primaryShade, paper.opacity),
        buildColor(secondaryHue, secondaryShade, paper.opacity),
        mode === 'dark' ? buildColor("grey", 800, paper.opacity) : buildColor("grey", 50, paper.opacity),
        mode === 'dark' ? buildColor("grey", 900, paper.opacity) : buildColor("grey", 100, paper.opacity)
    );

    // Build Material-UI theme from theme object
    const theme = useMemo(() => {
        console.log(
            "Building new Material-UI theme...",
            "\nBackground:", background,
            "\nHeader:", header,
            "\nFooter:", footer
        );
        const nextTheme = createMuiTheme({
            palette,
            shape: paper.borderRadius,
            spacing: spacing.spacing,
            typography: text.font,
            // direction,
        },
            // TODO: Select proper paper styles from settings
            paper,
            spacing.dense ? highDensity : null,
            // languageMap[language],
        );
        return nextTheme;
    }, [
        text,
        palette,
        paper,
        spacing,
        // spacing.dense,
        // direction,
        // shape,
        // language,
        background,
        header,
        footer,
    ]);
    const values = { state, dispatch };

    return (
        <MuiThemeProvider theme={responsiveFontSizes(theme)}>
            <SectionThemeContext.Provider value={values}>
                {children}
            </SectionThemeContext.Provider>
        </MuiThemeProvider>
    );
};
SectionThemeProvider.propTypes = {
    children: PropTypes.node,
    defaultThemeName: PropTypes.string,
    index: PropTypes.number,
};
SectionThemeProvider.defaultProps = {
    index: 0,
    defaultThemeName: 'default',
};
export const SectionContexts = {
    // first: SectionThemeContext,
    odd: SectionThemeContext,
    even: SectionThemeContext,
    index: [
        SectionThemeContext,
        SectionThemeContext,
        SectionThemeContext,
        SectionThemeContext,
        SectionThemeContext,
        SectionThemeContext,
        SectionThemeContext,
    ],
    last: SectionThemeContext,
}
export default SectionThemeProvider;

export const useSectionTheme = (sel) => {
    // const sections = SectionContexts
    const context =
        sel === 'odd' ? SectionContexts[sel] :
        sel === 'even' ? SectionContexts[sel] :
        // sel === 'last' ? SectionContexts['index'].length - 1 :
        sel === 'last' ? SectionContexts[sel] :
        SectionContexts['index'][sel];
    
    const { state, dispatch } = useContext(context);
    return [
        state, dispatch
    ];
};