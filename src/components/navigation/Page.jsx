import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    // Box,
    Container,
    // Grid,
    // Toolbar,
    // Typography,
    // useTheme,
    withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
    page: {
        position: 'relative',
        // height: '100vh',
        width: '100vw',

        padding: 0,
        margin: 0,
    },
    background: {
        position: 'absolute',
        display: 'flex',
        flexFlow: 'column nowrap',
        top: 0,  // Possibly delete. May force page to remain at top. Want parent to scroll. 
        left: 0,
        // height: '100vh',
        height: '100%',
        width: '100vw',
        margin: 0,
        padding: 0,
        // zIndex: -1,
        zIndex: 0,
        textAlign: 'center',
    },
    middleBG: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'stretch',

        width: '100vw',
        height: 0,
        overflow: 'visible',
    },
    header: {
        top: 0,

        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 0,
        justifyContent: 'flex-start',

        width: '100vw',

        zIndex: 1,
    },
    footer: {
        bottom: 0,

        display: 'flex',
        flexFlow: 'column nowrap',
        flexDirection: 'column',
        flexGrow: 0,
        justifyContent: 'flex-end',

        width: '100vw',

        zIndex: 1,
    },
    offset: {
        paddingTop: '64px',
    },
    content: {
        position: 'relative',
        textAlign: 'left',
        zIndex: 2,
        paddingTop: '64px',
    },
    contentViewport: {
        height: '100vh'
    },
    contentContent: {
        height: 'min-content',
    },
    contentMin: {
        minHeight: '100vh',
        height: 'max-content',
    },
    buttons: {
        zIndex: 900,
    },
});

function Page(props) {
    const {
        classes,
        children,
        header,
        footer,
        background,
        buttons,
        size,
        // stylevariant,
        navbarOffset,
    } = props;

    // const theme = useTheme();

    // Handle different page sizes
    if (size === 'viewport') {
        // Exactly viewport sized

    } else if (size === 'content') {
        // Fits content exactly
    } else {
        // Minimum size of viewport, expands to fit content
    }

    console.log("Size:", size);
    console.log("Offset", navbarOffset);

    return (
        <Container
            className={classes.page}
            disableGutters
            maxWidth={false}
        >
            <Container
                className={classes.background}
                disableGutters
                maxWidth={false}
            >
                <div className={classes.header}>
                    {header}
                </div>
                <div className={classes.middleBG}>
                    {background}
                </div>
                <div className={classes.footer}>
                    {footer}
                </div>
            </Container>
            {/* {navbarOffset ? <Toolbar className={classes.offset} /> : <></>} */}
            <Container
                className={clsx(
                    classes.content, {
                        [classes.offset]: navbarOffset,
                        [classes.contentViewport]: size === "viewport",
                        [classes.contentContent]: size === "content",
                        [classes.contentMin]: size === "minViewport"
                })}
            >
                {children}
            </Container>
            {buttons}
        </Container>
    );
}

Page.propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    footer: PropTypes.node,
    background: PropTypes.node,
    buttons: PropTypes.array,
    navbarOffset: PropTypes.bool,
    size: PropTypes.oneOf(["viewport", "content", 'minViewport']),
    stylevariant: PropTypes.number
};
Page.defaultProps = {
    navbarOffset: true,
    size: 'minViewport',
    stylevariant: 0
};

export default withStyles(styles)(Page);