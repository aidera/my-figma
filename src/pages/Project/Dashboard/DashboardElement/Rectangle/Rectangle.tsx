import React from 'react';

import { IDashboardElementRectangle } from '../../../../../types/dashboard.types';
import useStyles from './RectangleStyles';

const Rectangle = (props: { config: IDashboardElementRectangle }) => {
  const { config } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        border: `${config.border.width}px solid ${config.border.color}`,
        backgroundColor: config.fill,
      }}
    ></div>
  );
};

export default Rectangle;
