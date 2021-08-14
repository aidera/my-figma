import React from 'react';

import useStyles from './DashboardCreatingElementStyles';
import { IDashboardCreatingElement } from '../../../../types/dashboard.types';
import DashboardElement from '../DashboardElement/DashboardElement';

const DashboardCreatingElement = (props: {
  config: IDashboardCreatingElement;
}) => {
  const { config } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DashboardElement
        config={{
          id: 'creating-element',
          height: Math.abs(config.point1.y - config.point2.y),
          width: Math.abs(config.point1.x - config.point2.x),
          y:
            config.point1.y >= config.point2.y
              ? config.point2.y
              : config.point1.y,
          x:
            config.point1.x >= config.point2.x
              ? config.point2.x
              : config.point1.x,
        }}
      />
    </div>
  );
};

export default DashboardCreatingElement;
