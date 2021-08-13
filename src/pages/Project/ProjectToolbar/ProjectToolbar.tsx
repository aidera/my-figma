import React from 'react';
import {
  AppBar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';

import useStyles from './ProjectToolbarStyles';

import NearMeIcon from '@material-ui/icons/NearMe';
import WidgetsIcon from '@material-ui/icons/Widgets';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import Crop54Icon from '@material-ui/icons/Crop54';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RemoveIcon from '@material-ui/icons/Remove';

const ProjectToolbar = () => {
  const classes = useStyles();

  const [figureItemAnchor, setFigureItemAnchor] =
    React.useState<null | HTMLElement>(null);
  const isFigureModalOpen = Boolean(figureItemAnchor);

  const handleFigureMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFigureItemAnchor(event.currentTarget);
  };

  const handleFigureMenuClose = () => {
    setFigureItemAnchor(null);
  };

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton color='inherit'>
          <NearMeIcon />
        </IconButton>

        <IconButton onClick={handleFigureMenuOpen} color='inherit'>
          <WidgetsIcon />
        </IconButton>
        <Menu
          anchorEl={figureItemAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isFigureModalOpen}
          onClose={handleFigureMenuClose}
        >
          <MenuItem onClick={handleFigureMenuClose}>
            <ListItemIcon>
              <Crop54Icon fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit'>Rectangle</Typography>
          </MenuItem>
          <MenuItem onClick={handleFigureMenuClose}>
            <ListItemIcon>
              <RadioButtonUncheckedIcon fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit'>Circle</Typography>
          </MenuItem>
          <MenuItem onClick={handleFigureMenuClose}>
            <ListItemIcon>
              <RemoveIcon fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit'>Line</Typography>
          </MenuItem>
        </Menu>

        <IconButton color='inherit'>
          <TextFieldsIcon />
        </IconButton>

        <Typography variant='h6' className={classes.title}>
          Project
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ProjectToolbar;
