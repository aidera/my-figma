import React from 'react';
import { Toolbar } from '@material-ui/core';

import useStyles from './ProjectStyles';

import Layers from './Layers/Layers';
import ProjectToolbar from './ProjectToolbar/ProjectToolbar';
import Dashboard from './Dashboard/Dashboard';
import ItemDetails from './ItemDetails/ItemDetails';

const Project = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProjectToolbar />
      <Layers />
      <main className={classes.content}>
        <Toolbar />
        <Dashboard />
      </main>
      {/* <ItemDetails /> */}
    </div>
  );
};

export default Project;
