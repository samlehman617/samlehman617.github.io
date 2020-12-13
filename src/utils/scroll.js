import React from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const isSmoothScrollSupported = ((document || {}).documentElement || {}).style
  ? 'scrollBehavior' in document.documentElement.style
  : false;

export const toTop = () => {
  if (isSmoothScrollSupported) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo(0, 0);
  }
};

export const to = (ycoordinate) => {
  if (isSmoothScrollSupported) {
    window.scroll({
      top: ycoordinate,
      left: 0,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo(0, ycoordinate);
  }
};

export const toElement = (element) => {
  if (element) {
    if (isSmoothScrollSupported) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      element.scrollIntoView();
    }
  }
};

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /** Injected by the documentation to work in an iframe.
   *  You won't need it on your project.
   */
  window: PropTypes.func,
};

export const debugScroll = (elements, container) => {
  const pos = container.scrollTop;
  const viewHeight = container.clientHeight;
  const viewBottom = pos + viewHeight;
  // console.log(
  //   '\n View Height:', Math.floor(viewHeight),
  //   '\n View Top   :', Math.floor(pos),
  //   '\n View Bottom:', Math.floor(viewBottom),
  // );
  let maxProportion = 0;
  let page = 0;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i].getBoundingClientRect();
    const elementFitsInView = (element.height <= viewHeight);
    const topPixelsInView = (element.top >= 0) ? element.top : 0;
    const bottomPixelsInView = (element.bottom >= viewHeight) ? element.bottom : 0;
    let topInView = false;
    let bottomInView = false;
    let partialElementInView = false;
    let wholeElementInView = false;

    if (
      (element.top >= 0)
      && (element.top <= viewHeight)
    ) {
      topInView = true;
      partialElementInView = true;
    } else {
      topInView = false;
    }

    if (
      (element.bottom >= 0)
      && (element.bottom <= viewHeight)
    ) {
      bottomInView = true;
      partialElementInView = true;
    } else {
      bottomInView = false;
    }

    if (topInView && bottomInView) {
      wholeElementInView = true; // return i;
    }
    let proportion = 0;
    if (!topInView && !bottomInView) {
      if (element.bottom < 0) {
        proportion = 0;
      } else if (element.top > viewHeight) {
        proportion = 0;
      } else {
        return i;
      }
    } else if (topInView && !bottomInView) { // top portion on screen
      proportion = viewHeight - element.top;
    } else if (!topInView && bottomInView) { // bottom portion on screen
      proportion = element.bottom;
    } else {
      return i; // entire element in view
    }
    if (proportion > maxProportion) {
      maxProportion = proportion;
      page = i;
    }
    // console.log(
    //   '   viewTop:  ', 0, '\t   elementTop:', Math.floor(element.top), partialElementInView, wholeElementInView,
    //   '\nviewBottom:', Math.floor(viewHeight), '\telementBottom:', Math.floor(element.bottom),
    //   '\telementHeight:', Math.floor(element.height),
    //   elements[i],
    // );
  }
  return page;
};

export default {
  toTop,
  to,
  toElement,
  ElevationScroll,
  debugScroll,
};
