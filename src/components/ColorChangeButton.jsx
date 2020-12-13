import React, { Component } from 'react';
import { ChromePicker, TwitterPicker, } from 'react-color';
import { Button, withStyles } from '@material-ui/core';
import { blue, red, pink, purple, green, yellow, cyan, deepOrange as orange, } from '@material-ui/core/colors';

const styles = (theme) => ({
    primary: {
        border: `2px solid ${theme.palette.primary.dark}`,
        borderRight: 'none',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        minHeight: 32 + theme.spacing(2),
    },
    secondary: {
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderLeft: 'none',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        minHeight: 32 + theme.spacing(2),
    }
})

class ButtonExample extends Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    };
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };
    const { classes } = this.props;
    return (
      <div>
        <Button 
            className={this.props.color === "secondary" ? classes.secondary : classes.primary }
            disableElevation
            fullWidth
            height="64px"
            variant="contained" 
            color={this.props.color === "secondary" ? "secondary" : "primary" }
            size="large" 
            onClick={ this.handleClick }
        >
            Set {this.props.color === "secondary" ? "secondary" : "primary"}
        </Button>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <TwitterPicker
            width={150}
            triangle={this.props.color === "secondary" ? "top-right" : "top-left"}
            colors={[cyan[500], blue[500], purple[500], pink[500], red[500], orange[500], yellow[500], green[500]]}
          />
        </div> : null }
      </div>
    )
  }
}

export default withStyles(styles)(ButtonExample);