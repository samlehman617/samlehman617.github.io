import React from 'react';

import { Typography as TextElement } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// TODO: Fix re-calculate effect function on each render.

export function Typography(props) {
  const { children, ...rest } = props;
  const theme = useTheme();
  if (theme.textEffect) {    
    return (
      <TextElement {...rest}>
        {theme.textEffect(props.children)}
      </TextElement>
    );
  } else return (<TextElement {...rest}>{props.children}</TextElement>);
};

export default Typography;
