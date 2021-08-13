import React from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import LayersIcon from '@material-ui/icons/Layers';

import useStyles from './LayersStyles';

const Layers = () => {
  const classes = useStyles();
  const layers = ['layer 1', 'layer 2'];
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      anchor='left'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {layers.map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Layers;
