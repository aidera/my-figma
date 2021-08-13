import React from 'react';

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
      <Dashboard />
      <ItemDetails />
    </div>
  );
};

export default Project;
