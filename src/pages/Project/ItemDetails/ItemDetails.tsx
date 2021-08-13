import React from 'react';
import { Drawer, Toolbar } from '@material-ui/core';

import useStyles from './ItemDetailsStyles';

const ItemDetails = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      anchor='right'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      There will be item details
    </Drawer>
  );
};

export default ItemDetails;
