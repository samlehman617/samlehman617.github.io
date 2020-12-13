// export default {
const defaultTheme = {
    name: 'Default',
    schema: 'uniform',
    background: {
        schema: 'alternate',
        global: {
            base: 'backgroundColor',
            effect: 'hilbert',
            header: 'wave',
            footer: 'wave',
        },
        sections: [{
            base: 'backgroundColor',
            effect: 'rain',
            header: 'wave',
            footer: 'wave',
        }, {
            base: 'backgroundColor',
            effect: 'terrain',
            header: 'wave',
            footer: 'wave',
        }]
    },
    dense: false,
    direction: 'ltr',
    paletteType: 'system',
    paletteColors: {
        primary: {
            hue: 'blue',
            shade: 500,
        },
        secondary: {
            hue: 'pink',
            shade: 500,
        },
    },
    paper: {
        material: 'Paper',
        elevation: 8,
        opacity: 1.0,
        blur: 0,
    },
    colors: {
        mode: 'material',
        type: 'system',
        primary:    { hue: 'blue', shade: 500 },
        secondary:  { hue: 'pink', shade: 500 },
        paper:      { hue: 'grey', shade: 0   },
        background: { hue: 'grey', shade: 50  },
    },
    shape: { borderRadius: 8 },
    spacing: 8,
    text: {
        font: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
        },
        effect: 'None',
    },
};
export default defaultTheme;