import React from 'react';
import { Drawer, Toolbar } from '@material-ui/core';

import useStyles from './ItemDetailsStyles';
import { useAppSelector } from '../../../store/store-hooks';
import { selectMode } from '../../../store/dashboard/dashboardSelectors';
import CreationMode from './CreationMode/CreationMode';
import SelectionMode from './SelectionMode/SelectionMode';

const ItemDetails = () => {
  const classes = useStyles();
  const mode = useAppSelector(selectMode);

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
      <div className={classes.content}>
        <br />
        {mode === 'create' && <CreationMode />}
        {mode === 'select' && <SelectionMode />}
      </div>
    </Drawer>
  );
};

export default ItemDetails;
