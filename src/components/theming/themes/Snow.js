export default {
    name: 'Snow',
    schema: 'uniform',
    background: {
        schema: 'alternate',
        global: {
            base: 'backgroundColor',
            effect: 'snow',
            header: 'none',
            footer: 'wave',
        },
        sections: [{
            base: 'backgroundColor',
            effect: 'none',
            header: 'none',
            footer: 'none',
        }, {
            base: 'backgroundColor',
            effect: 'none',
            header: 'none',
            footer: 'none',
        }]
    },
    dense: false,
    direction: 'ltr',
    paletteType: 'light',
    paletteColors: {
        primary: {
            hue: 'cyan',
            shade: 500,
        },
        secondary: {
            hue: 'lightBlue',
            shade: 500,
        },
    },
    paper: {
        material: 'Glass',
        elevation: 8,
        opacity: 0.75,
        blur: 4,
    },
    shape: { borderRadius: 12 },
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