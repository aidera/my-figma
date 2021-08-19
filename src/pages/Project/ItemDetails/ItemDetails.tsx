import React from 'react';
import { Drawer, Toolbar } from '@material-ui/core';

import useStyles from './ItemDetailsStyles';
import { useAppSelector } from '../../../store/store-hooks';
import { selectSelectedElement } from '../../../store/dashboard/dashboardSelectors';

const ItemDetails = () => {
  const classes = useStyles();

  const selectedElement = useAppSelector(selectSelectedElement);

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
      {selectedElement && (
        <>
          <p>{selectedElement.id}</p>
          <p>{selectedElement.name}</p>
          <p>{selectedElement.type}</p>
          <p>{selectedElement.height}</p>
          <p>{selectedElement.width}</p>
        </>
      )}
    </Drawer>
  );
};

export default ItemDetails;
