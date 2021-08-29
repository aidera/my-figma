import React, { memo } from 'react';

import { IDashboardElementRectangle } from '../../../../../types/dashboard.types';
import useStyles from './RectangleStyles';

const Rectangle = memo((props: { config: IDashboardElementRectangle }) => {
  const { config } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        border: `${config.border.width}px solid ${config.border.color}`,
        backgroundColor: config.fill,
        borderRadius: `${config.border.radius}px`
      }}
    ></div>
  );
});

export default Rectangle;
