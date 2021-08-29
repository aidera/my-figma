import React from 'react';
import { Toolbar } from '@material-ui/core';

import useStyles from './ProjectStyles';

import Layers from './Layers/Layers';
import ProjectToolbar from './ProjectToolbar/ProjectToolbar';
import Dashboard from './Dashboard/Dashboard';
import ItemDetails from './ItemDetails/ItemDetails';
import { useAppSelector } from '../../store/store-hooks';
import { selectMode, selectSelectedElementId } from '../../store/dashboard/dashboardSelectors';

const Project = () => {
  const classes = useStyles();

  const mode = useAppSelector(selectMode);
  const selectedElement = useAppSelector(selectSelectedElementId);

  return (
    <div className={classes.root}>
      <ProjectToolbar />
      <Layers />
      <main className={classes.content}>
        <Toolbar />
        <Dashboard />
      </main>
      {(mode === 'create' || selectedElement) && <ItemDetails />}
    </div>
  );
};

export default Project;
