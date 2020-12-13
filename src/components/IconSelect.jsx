import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon as DefaultListItemIcon,
  ListItemText,
  MenuItem,
  Select as DefaultSelect,
  capitalize,
  // useTheme,
  withStyles,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import ColorAvatar from './ColorAvatar';

const ListItemIcon = withStyles({
  root: {
    width: 34,
    height: 34,
    padding: 0,
    minWidth: 34,
    paddingTop: 3,
  },
})(DefaultListItemIcon);

const Select = withStyles({
  selectMenu: {
    display: 'inline-flex',
    paddingBottom: 5,
  },
})(DefaultSelect);

export const createMenuItem = (value, icon=null, baseId) => {
  console.log(
    "Creating new MenuItem...",
    "\n Value:", value,
    "\n  Icon:", icon,
    "\n    ID:", baseId
  );
  const id = baseId + '-item-' + value;
  let Icon;
  let listIcon;
  if (icon) {
    Icon = icon;
    listIcon = React.isValidElement(<Icon />) ?
      <ListItemIcon><Icon /></ListItemIcon> :
      null;
  }
  switch (value) {
    case 'primary':
    case 'secondary':
    case 'background':
    case 'paper':
    case 'white':
    case 'black': {
      listIcon = <ListItemIcon><ColorAvatar value={capitalize(value)}/></ListItemIcon>
      break;
    }
    default: {
      // if (icon) Icon = icon;
      break;
    }
  }
  return (
    <MenuItem
      id={id}
      key={value}
      value={value}
    >
      {listIcon}
      <ListItemText>
        {capitalize(value)}
      </ListItemText>
    </MenuItem>
  )
};

export const IconSelect = props => {
  const { value, title, baseId, children, ...rest } = props;
  const name = capitalize(title);
  console.log(
    "Creating new IconSelect :", props,
    "\n         Title:", title,
    "\n Default Value:", value,
  );
  
  return (
    <FormControl
      fullWidth
      variant="outlined"
    >
      <InputLabel id={baseId + '-select-label'}>{name}</InputLabel>
      <Select
        id={baseId + '-select'}
        labelId={baseId + '-select-label'}
        label={name}
        value={value}
        {...rest}
      >
        {children}
      </Select>
    </FormControl>
  );
};
export default IconSelect;