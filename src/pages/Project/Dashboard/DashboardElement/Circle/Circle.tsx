import React from 'react';
import { IDashboardElementCircle } from '../../../../../types/dashboard.types';
import useStyles from './CircleStyles';

const Rectangle = (props: { config: IDashboardElementCircle }) => {
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
