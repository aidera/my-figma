import React, { MouseEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  selectCreateModeElementType,
  selectMode,
} from '../../../store/dashboard/dashboardSelectors';
import { useAppSelector } from '../../../store/store-hooks';

import {
  IDashboardCreatingElement,
  IDashboardElement,
} from '../../../types/dashboard.types';
import DashboardCreatingElement from './DashboardCreatingElement/DashboardCreatingElement';
import DashboardElement from './DashboardElement/DashboardElement';
import useStyles from './DashboardStyles';

const Dashboard = () => {
  const classes = useStyles();
  const [elements, setElements] = useState<IDashboardElement[]>([]);
  const [creatingElement, setCreatingElement] =
    useState<IDashboardCreatingElement | null>(null);

  const mode = useAppSelector(selectMode);
  const elementType = useAppSelector(selectCreateModeElementType);

  const onMouseDownHandler = (event: MouseEvent) => {
    /** Creating mode  */
    switch (mode) {
      case 'create':
        setCreatingElement({
          point1: { x: event.pageX, y: event.pageY },
          point2: { x: event.pageX, y: event.pageY },
        });
        break;
    }
  };

  const onMouseMoveHandler = (event: MouseEvent) => {
    /** Creating mode */
    switch (mode) {
      case 'create':
        if (creatingElement) {
          /** Updating element with/height by event x/y */
          setCreatingElement((prev) => {
            if (prev) {
              const newCreatingElement = {
                ...prev,
                point2: { ...prev.point2 },
              };
              newCreatingElement.point2.x = event.pageX;
              newCreatingElement.point2.y = event.pageY;
              return newCreatingElement;
            } else {
              return prev;
            }
          });
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

          setElements((prev) => {
            const newDashboardElements = [...prev];
            const newDashboardElement: IDashboardElement = {
              id: uuidv4(),
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
            newDashboardElements.push(newDashboardElement);
            return newDashboardElements;
          });
          setCreatingElement(null);
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
      {elements.map((element) => {
        return <DashboardElement key={element.id} config={element} />;
      })}
      {creatingElement && <DashboardCreatingElement config={creatingElement} />}
    </div>
  );
};

export default Dashboard;
