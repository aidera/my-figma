import React from 'react';
import useStyles from './DashboardElementStyles';
import { IDashboardElement } from '../dashboard-element.types';

const DashboardElement = (props: { config: IDashboardElement }) => {
  const { config } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        width: config.width,
        height: config.height,
        left: config.x,
        top: config.y,
      }}
    ></div>
  );
};

export default DashboardElement;
