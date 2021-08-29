import React, { MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../../store/store-hooks';
import {
  addElement,
  moveElement,
  resizeElement,
  setCreatingElement,
  setCreatingElementDimensions,
  setMode,
  setSelectedElement,
} from '../../../store/dashboard/dashboardReducer';
import {
  selectCreateModeDefaults,
  selectCreateModeElementType,
  selectCreatingElement,
  selectElements,
  selectMode,
  selectMovingElementId,
  selectResizingElementId,
} from '../../../store/dashboard/dashboardSelectors';
import {
  AnyDashboardElement,
  DEFAULT_ELEMENT_NAME,
  IDashboardElement,
  IDashboardElementCircle,
  IDashboardElementLine,
  IDashboardElementRectangle,
} from '../../../types/dashboard.types';
import DashboardCreatingElement from './DashboardCreatingElement/DashboardCreatingElement';
import DashboardElement from './DashboardElement/DashboardElement';
import useStyles from './DashboardStyles';

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const elements = useAppSelector(selectElements);
  const creatingElement = useAppSelector(selectCreatingElement);
  const movingElementId = useAppSelector(selectMovingElementId);
  const resizingElementId = useAppSelector(selectResizingElementId);
  const mode = useAppSelector(selectMode);
  const createModeDefaults = useAppSelector(selectCreateModeDefaults);
  const elementType = useAppSelector(selectCreateModeElementType);

  const [elementsToDisplay, setElementsToDisplay] = useState<
    AnyDashboardElement[]
  >([]);

  useEffect(() => {
    setElementsToDisplay([...elements].reverse());
  }, [elements]);

  const onMouseDownHandler = (event: MouseEvent) => {
    /** Creating mode  */
    switch (mode) {
      case 'create':
        dispatch(
          setCreatingElement({
            point1: { x: event.pageX, y: event.pageY },
            point2: { x: event.pageX, y: event.pageY },
          })
        );
        break;
    }
  };

  const onMouseMoveHandler = (event: MouseEvent) => {
    /** Creating mode */
    switch (mode) {
      case 'create':
        if (creatingElement) {
          /** Updating element with/height by event x/y */
          dispatch(
            setCreatingElementDimensions({
              point2: { x: event.pageX, y: event.pageY },
            })
          );
        }
        break;
      case 'select':
        if (movingElementId) {
          dispatch(
            moveElement({
              x: event.pageX,
              y: event.pageY,
            })
          );
        }
        if (resizingElementId) {
          dispatch(
            resizeElement({
              mouseCoords: { x: event.pageX, y: event.pageY },
            })
          );
        }
        break;
    }
  };

  const onMouseUpHandler = (event: MouseEvent) => {
    event.stopPropagation();

    switch (mode) {
      case 'create':
        if (creatingElement) {
          let newWidth = 0;
          let newHeight = 0;

          if (
            Math.abs(creatingElement.point1.x - creatingElement.point2.x) <=
              5 &&
            Math.abs(creatingElement.point1.y - creatingElement.point2.y) <= 5
          ) {
            newWidth = 100;
            newHeight = 100;
          } else {
            newWidth = Math.abs(
              creatingElement.point1.x - creatingElement.point2.x
            );
            newHeight = Math.abs(
              creatingElement.point1.y - creatingElement.point2.y
            );
          }

          const newDashboardElement: IDashboardElement = {
            id: uuidv4(),
            name: elementType ? DEFAULT_ELEMENT_NAME[elementType] || '' : '',
            type: elementType,
            width: newWidth,
            height: newHeight,
            x:
              creatingElement.point1.x <= creatingElement.point2.x
                ? creatingElement.point1.x
                : creatingElement.point2.x,
            y:
              creatingElement.point1.y <= creatingElement.point2.y
                ? creatingElement.point1.y
                : creatingElement.point2.y,
            point1: {
              y: creatingElement.point1.y,
              x: creatingElement.point1.x,
            },
            point2: {
              y: creatingElement.point2.y,
              x: creatingElement.point2.x,
            },
          };

          switch (newDashboardElement.type) {
            case 'rectangle':
              const newDashboardElementRectangle: IDashboardElementRectangle = {
                ...createModeDefaults.rectangle,
                ...newDashboardElement,
              };
              dispatch(addElement(newDashboardElementRectangle));
              break;
            case 'circle':
              const newDashboardElementCircle: IDashboardElementCircle = {
                ...createModeDefaults.circle,
                ...newDashboardElement,
              };
              dispatch(addElement(newDashboardElementCircle));
              break;
            case 'line':
              const newDashboardElementLine: IDashboardElementLine = {
                ...createModeDefaults.line,
                ...newDashboardElement,
              };
              dispatch(addElement(newDashboardElementLine));
              break;
          }

          dispatch(setMode('select'));
          dispatch(setSelectedElement(newDashboardElement));
        }
        break;
    }
  };

  const onEmptySpaceMouseUpHandler = () => {
    if (mode === 'select') {
      dispatch(setSelectedElement(null));
    }
  };

  return (
    <div
      className={classes.root}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
      onMouseMove={onMouseMoveHandler}
      draggable='false'
    >
      <div
        className={classes.canvas}
        onMouseUp={onEmptySpaceMouseUpHandler}
      ></div>
      {elementsToDisplay.map((element) => {
        return <DashboardElement key={element.id} config={element} />;
      })}
      {creatingElement && <DashboardCreatingElement config={creatingElement} />}
    </div>
  );
};

export default Dashboard;
