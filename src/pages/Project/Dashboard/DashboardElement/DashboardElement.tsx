import React, { MouseEvent } from 'react';

import useStyles from './DashboardElementStyles';
import { IDashboardElement } from '../../../../types/dashboard.types';
import Rectangle from './Rectangle/Rectangle';
import Circle from './Circle/Circle';
import Line from './Line/Line';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import {
  setMovingElement,
  setSelectedElement,
} from '../../../../store/dashboard/dashboardReducer';
import {
  selectMode,
  selectMovingElementId,
  selectSelectedElementId,
} from '../../../../store/dashboard/dashboardSelectors';

const DashboardElement = (props: { config: IDashboardElement }) => {
  const { config } = props;

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectMode);
  const selectedElementId = useAppSelector(selectSelectedElementId);
  const movingElementId = useAppSelector(selectMovingElementId);

  const isSelected = selectedElementId && selectedElementId === config.id;
  const isMoving = movingElementId && movingElementId === config.id;

  const onClickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    if (mode === 'select') {
      dispatch(setSelectedElement(config));
    }
  };

  const onMouseDownHandler = (event: MouseEvent) => {
    console.log(event);
    event.preventDefault();
    if (mode === 'select' && isSelected && !isMoving) {
      dispatch(
        setMovingElement({
          element: config,
          startCoords: { x: config.x, y: config.y },
          mouseStartCoords: { x: event.pageX, y: event.pageY },
        })
      );
    }
  };

  const onMouseUpHandler = () => {
    if (mode === 'select' && isSelected && isMoving) {
      dispatch(setMovingElement(null));
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
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
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
        <div className={classes.selectContainer} onClick={onClickHandler}>
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
