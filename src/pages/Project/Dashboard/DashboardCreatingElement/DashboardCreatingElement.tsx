import React from 'react';
import useStyles from './DashboardCreatingElementStyles';
import { IDashboardCreatingElement } from '../dashboard-element.types';

const DashboardCreatingElement = (props: { config: IDashboardCreatingElement }) => {
  const { config } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        width: Math.abs(config.point1.x - config.point2.x),
        height:Math.abs(config.point1.y - config.point2.y),
        left: config.point1.x >= config.point2.x ? config.point2.x : config.point1.x,
        top: config.point1.y >= config.point2.y ? config.point2.y : config.point1.y,
      }}
    ></div>
  );
};

export default DashboardCreatingElement;
