import React, { MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../../store/store-hooks';
import {
  addElement,
  setCreatingElement,
  setCreatingElementDimensions,
} from '../../../store/dashboard/dashboardReducer';
import {
  selectCreateModeElementType,
  selectCreatingElement,
  selectElements,
  selectMode,
} from '../../../store/dashboard/dashboardSelectors';
import {
  AnyDashboardElement,
  DEFAULT_ELEMENT_NAME,
  IDashboardElement,
} from '../../../types/dashboard.types';
import DashboardCreatingElement from './DashboardCreatingElement/DashboardCreatingElement';
import DashboardElement from './DashboardElement/DashboardElement';
import useStyles from './DashboardStyles';

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const elements = useAppSelector(selectElements);
  const creatingElement = useAppSelector(selectCreatingElement);
  const mode = useAppSelector(selectMode);
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
    }
  };

  const onMouseUpHandler = () => {
    /** Creating mode */
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

          dispatch(addElement(newDashboardElement));
          dispatch(setCreatingElement(null));
        }
        break;
    }
  };

  return (
    <div
      className={classes.root}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
      onMouseMove={onMouseMoveHandler}
    >
      {elementsToDisplay.map((element) => {
        return <DashboardElement key={element.id} config={element} />;
      })}
      {creatingElement && <DashboardCreatingElement config={creatingElement} />}
    </div>
  );
};

export default Dashboard;
