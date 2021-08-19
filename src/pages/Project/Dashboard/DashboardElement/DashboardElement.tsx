import React, { MouseEvent } from 'react';

import useStyles from './DashboardElementStyles';
import { IDashboardElement } from '../../../../types/dashboard.types';
import Rectangle from './Rectangle/Rectangle';
import Circle from './Circle/Circle';
import Line from './Line/Line';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { setSelectedElement } from '../../../../store/dashboard/dashboardReducer';
import {
  selectMode,
  selectSelectedElement,
} from '../../../../store/dashboard/dashboardSelectors';

const DashboardElement = (props: { config: IDashboardElement }) => {
  const { config } = props;

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectMode);
  const selectedElement = useAppSelector(selectSelectedElement);

  const isSelected = selectedElement && selectedElement.id === config.id;

  const onClickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    if (mode === 'select') {
      dispatch(setSelectedElement(config));
    }
  };

  return (
    <div
      className={classes.root}
      style={{
        width: config.width,
        height: config.height,
        left: config.x,
        top: config.y,
      }}
      onClick={onClickHandler}
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

      {isSelected && (
        <div
          className={classes.selectContainer}
          onClick={onClickHandler}
        >
          <div
            className={classes.selectPoint + ' ' + classes.selectTopLeftPoint}
          ></div>
          <div
            className={classes.selectPoint + ' ' + classes.selectTopRightPoint}
          ></div>
          <div
            className={
              classes.selectPoint + ' ' + classes.selectBottomLeftPoint
            }
          ></div>
          <div
            className={
              classes.selectPoint + ' ' + classes.selectBottomRightPoint
            }
          ></div>
        </div>
      )}
    </div>
  );
};

export default DashboardElement;
