import React from 'react';

import useStyles from './DashboardElementStyles';
import { IDashboardElement } from '../../../../types/dashboard.types';
import Rectangle from './Rectangle/Rectangle';
import Circle from './Circle/Circle';
import Line from './Line/Line';

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
    >
      {config.type === 'rectangle' && (
        <Rectangle
          config={{
            ...config,
            fill: 'white',
            border: { color: 'blue', width: 2 },
          }}
        />
      )}
      {config.type === 'circle' && (
        <Circle
          config={{
            ...config,
            fill: 'lightgray',
            border: { color: 'lightblue', width: 2 },
          }}
        />
      )}
      {config.type === 'line' && (
        <Line
          config={{
            ...config,
            fill: 'green',
            lineWidth: 2,
          }}
        />
      )}
    </div>
  );
};

export default DashboardElement;
