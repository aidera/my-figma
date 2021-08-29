import React, { useState, MouseEvent, memo } from 'react';
import { Menu, Typography } from '@material-ui/core';
import { SketchPicker } from 'react-color';

import useStyles from './ColorDisplayerStyles';

const ColorDisplayer = memo((props: {
  label: string;
  color: string;
  onColorChange: Function;
}) => {
  const { label, color, onColorChange } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={classes.buttonContainer}>
        <Typography variant='caption' className={classes.label}>{label}</Typography>
        <div
          onClick={handleClick}
          className={classes.colorButton}
          style={{ backgroundColor: color }}
        ></div>
      </div>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ list: classes.menuList }}
      >
        <SketchPicker
          color={color}
          onChange={(color) => {
            onColorChange(
              `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${
                color.rgb.a || 1
              })`
            );
          }}
        />
      </Menu>
    </>
  );
});

export default ColorDisplayer;
