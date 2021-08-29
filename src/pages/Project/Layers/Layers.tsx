import React, { useState, FocusEvent } from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  RootRef,
  TextField,
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
import {
  selectElements,
  selectSelectedElementId,
} from '../../../store/dashboard/dashboardSelectors';
import {
  setSelectedElement,
  updateElementPosition,
  renameElement,
} from '../../../store/dashboard/dashboardReducer';
import { AnyDashboardElement } from '../../../types/dashboard.types';

const Layers = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const elements = useAppSelector(selectElements);
  const selectedElementId = useAppSelector(selectSelectedElementId);
  const [editingElementId, setEditingElementId] = useState<string | null>(null);

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
    /** We need to select item, but if it was already selected - then we should edit it */
    if (element.id === selectedElementId) {
      setEditingElementId(element.id);
    } else if (element.id !== editingElementId) {
      dispatch(setSelectedElement(element));
    }
  };

  const textFieldOnBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    if (editingElementId) {
      dispatch(
        renameElement({
          elementId: editingElementId,
          newName: event.target.value,
        })
      );
      setEditingElementId(null);
    }
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
      <br />
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
                        {editingElementId !== element.id && (
                          <>
                            <ListItemIcon>
                              <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary={element.name} />
                          </>
                        )}
                        {editingElementId === element.id && (
                          <TextField
                            id='standard-basic'
                            defaultValue={element.name}
                            onBlur={textFieldOnBlurHandler}
                          />
                        )}
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
