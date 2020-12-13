import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, AccordionSummary,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  capitalize,
  useTheme,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageIcon from '@material-ui/icons/Image';
import StopIcon from '@material-ui/icons/Stop';

// import { SectionControls } from './EffectControls';
import { SectionControls } from './SectionControls';
import { useSchema } from '../context/SchemaContext';
import { BackgroundContext, BackgroundProvider } from '../context/BackgroundContext';
import * as footers from '../../footers';
import * as headers from '../../headers';
import * as backgrounds from '../../backgrounds';

const pages = ["landing", "about", "portfolio", "resume", "features", "pricing" ];

export const SchemaSwitcher = props => {
    const [schema, setSchema] = useSchema();

    return (
    <FormControl fullWidth variant="outlined">
        <InputLabel id="schema-select-label">Section Schema</InputLabel>
        <Select 
            labelId="schema-select-label"
            id="schema-select"
            value={schema || 1}
            onChange={(e) => setSchema(e.target.value)}
            label="Section Schema"
        >
            <MenuItem value={1}><em>Uniform</em></MenuItem>
            <MenuItem value={2}>Alternation</MenuItem>
            <MenuItem value={3}>First, uniform middle, last</MenuItem>
            <MenuItem value={4}>First, alternating middle, last</MenuItem>
            <MenuItem value={pages.length}>All Unique</MenuItem>
        </Select>
    </FormControl>
    );
};
export default SchemaSwitcher;