import React from 'react';

import useStyles from './DashboardCreatingElementStyles';
import { IDashboardCreatingElement } from '../../../../types/dashboard.types';
import DashboardElement from '../DashboardElement/DashboardElement';
import { useAppSelector } from '../../../../store/store-hooks';
import { selectCreateModeElementType } from '../../../../store/dashboard/dashboardSelectors';

const DashboardCreatingElement = (props: {
  config: IDashboardCreatingElement;
}) => {
  const { config } = props;
  const classes = useStyles();

  const elementType = useAppSelector(selectCreateModeElementType);

  return (
    <div className={classes.root}>
      <DashboardElement
        config={{
          id: 'creating-element',
          type: elementType,
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
          point1: {
            x: config.point1.x,
            y: config.point1.y,
          },
          point2: {
            x: config.point2.x,
            y: config.point2.y,
          },
        }}
      />
    </div>
  );
};

export default DashboardCreatingElement;
