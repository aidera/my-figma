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
import { updateElementPosition } from '../../../store/dashboard/dashboardReducer';

const Layers = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const elements = useAppSelector(selectElements);

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ) => ({
    // styles we need to apply on draggables
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
