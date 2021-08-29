import React, { ChangeEvent } from 'react';
import { TextField, Typography } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { selectSelectedElement } from '../../../../store/dashboard/dashboardSelectors';
import { setElementFields } from '../../../../store/dashboard/dashboardReducer';
import {
  DashboardCreateModeElementType,
  DEFAULT_ELEMENT_NAME,
  IDashboardElementCircle,
  IDashboardElementLine,
  IDashboardElementRectangle,
} from '../../../../types/dashboard.types';
import useStyles from './SelectionModeStyles';

const SelectionMode = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const selectedElement = useAppSelector(selectSelectedElement);

  const onEditableFieldsChange = (
    type: DashboardCreateModeElementType,
    property: string,
    value: any
  ) => {
    if (selectedElement) {
      switch (type) {
        case 'rectangle':
          switch (property) {
            case 'fill':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  rectangle: {
                    ...(selectedElement as IDashboardElementRectangle),
                    fill: value,
                  },
                })
              );
              break;

            case 'borderWidth':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  rectangle: {
                    ...(selectedElement as IDashboardElementRectangle),
                    border: {
                      ...(selectedElement as IDashboardElementRectangle).border,
                      width: +value,
                    },
                  },
                })
              );
              break;

            case 'borderColor':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  rectangle: {
                    ...(selectedElement as IDashboardElementRectangle),
                    border: {
                      ...(selectedElement as IDashboardElementRectangle).border,
                      color: value,
                    },
                  },
                })
              );
              break;

            case 'borderRadius':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  rectangle: {
                    ...(selectedElement as IDashboardElementRectangle),
                    border: {
                      ...(selectedElement as IDashboardElementRectangle).border,
                      radius: +value,
                    },
                  },
                })
              );
              break;
          }
          break;

        case 'circle':
          switch (property) {
            case 'fill':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  circle: {
                    ...(selectedElement as IDashboardElementCircle),
                    fill: value,
                  },
                })
              );
              break;

            case 'borderWidth':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  circle: {
                    ...(selectedElement as IDashboardElementCircle),
                    border: {
                      ...(selectedElement as IDashboardElementCircle).border,
                      width: +value,
                    },
                  },
                })
              );
              break;

            case 'borderColor':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  circle: {
                    ...(selectedElement as IDashboardElementCircle),
                    border: {
                      ...(selectedElement as IDashboardElementCircle).border,
                      color: value,
                    },
                  },
                })
              );
              break;
          }
          break;

        case 'line':
          switch (property) {
            case 'fill':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  line: {
                    ...(selectedElement as IDashboardElementLine),
                    fill: value,
                  },
                })
              );
              break;

            case 'lineWidth':
              dispatch(
                setElementFields({
                  elementId: selectedElement.id,
                  line: {
                    ...(selectedElement as IDashboardElementLine),
                    lineWidth: +value,
                  },
                })
              );
              break;
          }
          break;
      }
    }
  };

  const renderEditableFields = () => {
    switch (selectedElement?.type) {
      case 'rectangle':
        return (
          <>
            <TextField
              label='Fill color'
              defaultValue={
                (selectedElement as IDashboardElementRectangle).fill
              }
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange('rectangle', 'fill', event.target.value)
              }
            />
            <br />
            <br />
            <TextField
              type='number'
              label='Border width'
              defaultValue={
                (selectedElement as IDashboardElementRectangle).border.width
              }
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange(
                  'rectangle',
                  'borderWidth',
                  event.target.value
                )
              }
            />
            <br />
            <br />
            <TextField
              label='Border color'
              defaultValue={
                (selectedElement as IDashboardElementRectangle).border.color
              }
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange(
                  'rectangle',
                  'borderColor',
                  event.target.value
                )
              }
            />
            <br />
            <br />
            <TextField
              type='number'
              label='Border radius'
              defaultValue={
                (selectedElement as IDashboardElementRectangle).border.radius
              }
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange(
                  'rectangle',
                  'borderRadius',
                  event.target.value
                )
              }
            />
          </>
        );

      case 'circle':
        return (
          <>
            <TextField
              label='Fill color'
              defaultValue={(selectedElement as IDashboardElementCircle).fill}
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange('circle', 'fill', event.target.value)
              }
            />
            <br />
            <br />
            <TextField
              type='number'
              label='Border width'
              defaultValue={
                (selectedElement as IDashboardElementCircle).border.width
              }
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange(
                  'circle',
                  'borderWidth',
                  event.target.value
                )
              }
            />
            <br />
            <br />
            <TextField
              label='Border color'
              defaultValue={
                (selectedElement as IDashboardElementCircle).border.color
              }
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange(
                  'circle',
                  'borderColor',
                  event.target.value
                )
              }
            />
          </>
        );

      case 'line':
        return (
          <>
            <TextField
              label='Fill color'
              defaultValue={(selectedElement as IDashboardElementLine).fill}
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange('line', 'fill', event.target.value)
              }
            />
            <br />
            <br />
            <TextField
              type='number'
              label='Line width'
              defaultValue={
                (selectedElement as IDashboardElementLine).lineWidth
              }
              onInput={(event: ChangeEvent<HTMLInputElement>) =>
                onEditableFieldsChange('line', 'lineWidth', event.target.value)
              }
            />
          </>
        );

      default:
        return null;
    }
  };

  return selectedElement ? (
    <div>
      <Typography variant='h5'>Selection mode</Typography>
      <Typography variant='subtitle1'>
        {DEFAULT_ELEMENT_NAME[selectedElement.type || 'rectangle']}
      </Typography>

      <br />

      <div className={classes.mainInfo}>
        <p>ID: {selectedElement.id}</p>
        <p>Name: {selectedElement.name}</p>
        <p>Type: {selectedElement.type}</p>
        <p>Height: {selectedElement.height}</p>
        <p>Width: {selectedElement.width}</p>
        <p>x: {selectedElement.x}</p>
        <p>y: {selectedElement.y}</p>
      </div>

      <br />
      {renderEditableFields()}
    </div>
  ) : null;
};

export default SelectionMode;
