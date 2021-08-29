import React from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  RootRef,
  Toolbar,
  Typography,
} from '@material-ui/core';
import LayersIcon from '@material-ui/icons/Layers';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
} from 'react-beautiful-dnd';

import useStyles from './LayersStyles';
import { useAppDispatch, useAppSelector } from '../../../store/store-hooks';
import { selectElements } from '../../../store/dashboard/dashboardSelectors';
import {
  setSelectedElement,
  updateElementPosition,
} from '../../../store/dashboard/dashboardReducer';
import { AnyDashboardElement } from '../../../types/dashboard.types';

const Layers = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const elements = useAppSelector(selectElements);

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ) => ({
    ...draggableStyle,
    ...(isDragging && {
      background: 'rgb(235,235,235)',
    }),
  });

  const onDragEndHandler = (result: DropResult) => {
    dispatch(
      updateElementPosition({
        id: result.draggableId,
        from: result.source.index,
        to: result.destination ? result.destination.index : result.source.index,
      })
    );
  };

  const onClickHandler = (element: AnyDashboardElement) => {
    dispatch(setSelectedElement(element));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      anchor='left'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Divider />
      <br/>
      <Typography variant='h5'>Layers</Typography>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <RootRef rootRef={provided.innerRef}>
              <List>
                {elements.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        button
                        key={element.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        onClick={() => onClickHandler(element)}
                      >
                        <ListItemIcon>
                          <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary={element.name} />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </Drawer>
  );
};

export default Layers;
