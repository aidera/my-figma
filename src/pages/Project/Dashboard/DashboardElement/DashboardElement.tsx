import React, { memo, MouseEvent } from 'react';

import useStyles from './DashboardElementStyles';
import {
  AnyDashboardElement,
  DashboardResizeEnum,
  IDashboardElementCircle,
  IDashboardElementLine,
  IDashboardElementRectangle,
} from '../../../../types/dashboard.types';
import Rectangle from './Rectangle/Rectangle';
import Circle from './Circle/Circle';
import Line from './Line/Line';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import {
  setMovingElement,
  setResizingElement,
  setSelectedElement,
} from '../../../../store/dashboard/dashboardReducer';
import {
  selectCreateModeDefaults,
  selectMode,
  selectMovingElementId,
  selectResizingElementId,
  selectSelectedElementId,
} from '../../../../store/dashboard/dashboardSelectors';

const DashboardElement = memo((props: {
  config: AnyDashboardElement;
  isCreating?: boolean;
}) => {
  const { config, isCreating } = props;

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectMode);
  const createModeDefaults = useAppSelector(selectCreateModeDefaults);
  const selectedElementId = useAppSelector(selectSelectedElementId);
  const movingElementId = useAppSelector(selectMovingElementId);
  const resizingElementId = useAppSelector(selectResizingElementId);

  const isSelected = selectedElementId && selectedElementId === config.id;
  const isMoving = movingElementId && movingElementId === config.id;
  const isResizing = resizingElementId && resizingElementId === config.id;

  const onElementClickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    if (mode === 'select') {
      dispatch(setSelectedElement(config));
    }
  };

  const onElementMouseDownHandler = (event: MouseEvent) => {
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

  const onElementMouseUpHandler = () => {
    if (mode === 'select' && isSelected) {
      if (isMoving) {
        dispatch(setMovingElement(null));
      }
      if (isResizing) {
        dispatch(setResizingElement(null));
      }
    }
  };

  const onResizeMouseDownHandler = (
    event: MouseEvent,
    resizeMode: DashboardResizeEnum
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (mode === 'select' && isSelected) {
      dispatch(
        setResizingElement({
          element: config,
          mouseStartCoords: { x: event.pageX, y: event.pageY },
          mode: resizeMode,
        })
      );
    }
  };

  const onResizeMouseUpHandler = (event: MouseEvent) => {
    event.preventDefault();
    if (mode === 'select' && isSelected) {
      dispatch(setResizingElement(null));
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
      onClick={onElementClickHandler}
      onMouseDown={onElementMouseDownHandler}
      onMouseUp={onElementMouseUpHandler}
    >
      {config.type === 'rectangle' && (
        <Rectangle
          config={{
            ...config,
            fill:
              (config as IDashboardElementRectangle).fill ||
              createModeDefaults.rectangle.fill,
            border: {
              color:
                (config as IDashboardElementRectangle).border?.color ||
                createModeDefaults.rectangle.border.color,
              width:
                (config as IDashboardElementRectangle).border?.width !==
                undefined
                  ? (config as IDashboardElementRectangle).border?.width
                  : createModeDefaults.rectangle.border.width,
              radius:
                (config as IDashboardElementRectangle).border?.radius !==
                undefined
                  ? (config as IDashboardElementRectangle).border?.radius
                  : createModeDefaults.rectangle.border.radius,
            },
          }}
        />
      )}
      {config.type === 'circle' && (
        <Circle
          config={{
            ...config,
            fill:
              (config as IDashboardElementCircle).fill ||
              createModeDefaults.circle.fill,
            border: {
              color:
                (config as IDashboardElementCircle).border?.color ||
                createModeDefaults.circle.border.color,
              width:
                (config as IDashboardElementCircle).border?.width !== undefined
                  ? (config as IDashboardElementCircle).border?.width
                  : createModeDefaults.circle.border.width,
            },
          }}
        />
      )}
      {config.type === 'line' && (
        <Line
          config={{
            ...config,
            fill:
              (config as IDashboardElementLine).fill ||
              createModeDefaults.line.fill,
            lineWidth:
              (config as IDashboardElementLine).lineWidth !== undefined
                ? (config as IDashboardElementLine).lineWidth
                : createModeDefaults.line.lineWidth,
          }}
        />
      )}

      {isSelected && (
        <div
          className={classes.selectContainer}
          onClick={onElementClickHandler}
        >
          {/* Lines */}
          <div
            onMouseDown={(event) =>
              onResizeMouseDownHandler(event, DashboardResizeEnum.top)
            }
            onMouseUp={onResizeMouseUpHandler}
            className={classes.selectLine + ' ' + classes.selectTopLine}
          ></div>
          <div
            onMouseDown={(event) =>
              onResizeMouseDownHandler(event, DashboardResizeEnum.right)
            }
            onMouseUp={onResizeMouseUpHandler}
            className={classes.selectLine + ' ' + classes.selectRightLine}
          ></div>
          <div
            onMouseDown={(event) =>
              onResizeMouseDownHandler(event, DashboardResizeEnum.bottom)
            }
            onMouseUp={onResizeMouseUpHandler}
            className={classes.selectLine + ' ' + classes.selectBottomLine}
          ></div>
          <div
            onMouseDown={(event) =>
              onResizeMouseDownHandler(event, DashboardResizeEnum.left)
            }
            onMouseUp={onResizeMouseUpHandler}
            className={classes.selectLine + ' ' + classes.selectLeftLine}
          ></div>

          {/* Points */}
          <div
            onMouseDown={(event) =>
              onResizeMouseDownHandler(event, DashboardResizeEnum.topLeft)
            }
            onMouseUp={onResizeMouseUpHandler}
            className={classes.selectPoint + ' ' + classes.selectTopLeftPoint}
          ></div>
          <div
            onMouseDown={(event) =>
              onResizeMouseDownHandler(event, DashboardResizeEnum.topRight)
            }
            onMouseUp={onResizeMouseUpHandler}
            className={classes.selectPoint + ' ' + classes.selectTopRightPoint}
          ></div>
          <div
            onMouseDown={(event) =>
              onResizeMouseDownHandler(event, DashboardResizeEnum.bottomLeft)
            }
            onMouseUp={onResizeMouseUpHandler}
            className={
              classes.selectPoint + ' ' + classes.selectBottomLeftPoint
            }
          ></div>
          <div
            onMouseDown={(event) =>
              onResizeMouseDownHandler(event, DashboardResizeEnum.bottomRight)
            }
            onMouseUp={onResizeMouseUpHandler}
            className={
              classes.selectPoint + ' ' + classes.selectBottomRightPoint
            }
          ></div>
        </div>
      )}
      {/* Text helpers */}
      {(isResizing || isCreating) && (
        <div className={classes.selectSizeTooltip}>
          {config.width + ' x ' + config.height}
        </div>
      )}
    </div>
  );
});

export default DashboardElement;
