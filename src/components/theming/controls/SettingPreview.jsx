import React, { useContext } from 'react';
import {
    Chip,
} from '@material-ui/core';

export const SettingPreview = props => {
    const { children, name, icon, value } = props;
    const primary = value === 'primary';
    const secondary = value === 'secondary';
    const hasIcon = React.isValidElement(icon);
    return (
        <Chip
            color={primary || secondary ? value : 'default'}
        >

        </Chip>
    );
};