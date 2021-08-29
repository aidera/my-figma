import React, { memo } from 'react';

import { IDashboardElementLine } from '../../../../../types/dashboard.types';
import useStyles from './LineStyles';

const Line = memo((props: { config: IDashboardElementLine }) => {
  const { config } = props;
  const classes = useStyles();

  return (
    <svg
      className={classes.root}
      style={{ minHeight: config.lineWidth, minWidth: config.lineWidth }}
    >
      <line
        stroke={config.fill}
        strokeWidth={config.lineWidth}
        x1={config.point1.x <= config.point2.x ? 0 : config.width}
        y1={config.point1.y <= config.point2.y ? 0 : config.height}
        x2={config.point1.x > config.point2.x ? 0 : config.width}
        y2={config.point1.y > config.point2.y ? 0 : config.height}
      ></line>
    </svg>
  );
});

export default Line;
