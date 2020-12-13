import React, { 
    createContext,
    // useCallback,
    useContext,
    // useEffect,
    // useLayoutEffect,
    // useMemo,
    // useReducer,
} from 'react';
import PropTypes from 'prop-types';
import {
    ThemeProvider as MuiThemeProvider,
    createMuiTheme,
    // useTheme,
    // darken,
} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { enUS, zhCN, faIR, ruRU, ptBR, esES, frFR, deDE, jaJP } from '@material-ui/core/locale';
// import { blue, pink } from '@material-ui/core/colors';

import { 
    // BackgroundProvider, 
    BackgroundContext, 
    // initialBackground, 
} from '../components/theming/BackgroundContext';
import { 
    ColorProvider, 
    ColorContext, 
    // initialColors 
} from '../components/theming/ColorContext';
import { 
    // DensityProvider, 
    DensityContext, 
    // initialDensity 
} from '../components/theming/DensityContext';
import { 
    // FontProvider, 
    FontContext, 
    // initialFont 
} from '../components/theming/FontContext';
import { 
    // PaperProvider, 
    PaperContext, 
    // initialPaper 
} from './PaperContext';
import {
    ThemeTypeProvider,
    ThemeTypeContext,
} from '../components/theming/ThemeTypeContext';

// import { getCookie } from '../../utils/helpers';

import { debug } from '../App';

  // TODO: Move to util file.
// const opacity2alpha = decimal => Math.floor(decimal * 255).toString(16);

export const buildTheme = (type, background, colors, density, font, paper) => {
    return createMuiTheme({

    });
};

export const DispatchContext = createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext';
  ThemeTypeContext.displayName = 'ThemeTypeDispatchContext';  
}

// const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// export const ThemeProvider = ({ background, colors, density, font, paper, children }) => {
//     if (debug) console.group("ThemeContext");

//     const [options, dispatch] = useReducer((state, action) => {
//         switch (action.type) {
//             case 'SET_SPACING': return {...state, spacing: action.payload};
//             case 'INCREASE_SPACING': return {...state, spacing: state.spacing + 1};
//             default: return {...state}
//         }
//     });
// }

export const ThemeProvider = (props) => {
    const { children } = props;
    if (debug) console.group('ThemeContext');

    const background = useContext(BackgroundContext);
    const colors = useContext(ColorContext);
    const density = useContext(DensityContext);
    const font = useContext(FontContext);
    const paper = useContext(PaperContext);
    const type = useContext(ThemeTypeContext);
    
    // const [options, dispatch] = useReducer((state, action) => {
    //     switch (action.type) {
    //       case 'SET_SPACING': return {...state, spacing: action.payload};
    //       default: throw new Error(`Unrecognized type ${action.type}`);
    //     }
    // });

    const theme = buildTheme(type, background, colors, density, font, paper);

    return (
        // <BackgroundProvider value={background}>
            // <ColorProvider value={colors}>
                {/* <DensityProvider value={density}> */}
                    {/* <FontProvider value={font}> */}
                        {/* <PaperProvider value={paper}> */}
                            {/* <ThemeTypeProvider value={type}> */}
                                {/* <MuiThemeProvider theme={theme}> */}
                                    {/* <DispatchContext.Provider value={dispatch}> */}
                                        {children}
                                    {/* </DispatchContext.Provider> */}
                                {/* </MuiThemeProvider> */}
                            {/* </ThemeTypeProvider> */}
                        {/* </PaperProvider> */}
                    {/* </FontProvider> */}
                {/* </DensityProvider> */}
            // </ColorProvider>
        // </BackgroundProvider>
    );
};
ThemeProvider.propTypes = {
    children: PropTypes.node,
};