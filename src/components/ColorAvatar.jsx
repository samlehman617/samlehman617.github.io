import React from 'react';
import {
    Avatar as DefaultAvatar,
    useTheme,
    withStyles,
} from '@material-ui/core';

const Avatar = withStyles((theme) => ({
  root: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderStyle: 'solid',
    // border: `2px solid ${theme.palette.grey[200]}`,
    fontSize: 10,
    fontWeight: 'bold',
  }
}))(DefaultAvatar);
export const ColorAvatar = props => {
  const { value } = props;
  const theme = useTheme();
  let bg, color, label;
  switch (value.toLowerCase()) {
    case 'primary':    bg = theme.palette.primary.main;       label = '1';  break;
    case 'secondary':  bg = theme.palette.secondary.main;     label = '2';  break;
    case 'paper':      bg = theme.palette.background.paper;   label = 'Pa'; break;
    case 'background': bg = theme.palette.background.default; label = 'BG'; break;
    case 'white':      bg = theme.palette.common.white;       label = 'W';  break;
    case 'black':      bg = theme.palette.common.black;       label = 'B';  break;
    default:           bg = theme.palette.primary.main;       label = '#';  break;
  }
  color = theme.palette.getContrastText(bg);

  return (
    <Avatar style={{ color, backgroundColor: bg, borderColor: color }}>
      {label}
    </Avatar>
  );
};
export default ColorAvatar;