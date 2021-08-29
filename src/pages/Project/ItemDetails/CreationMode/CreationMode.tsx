import React, { ChangeEvent, memo } from 'react';
import { TextField, Typography } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import {
  selectCreateModeDefaults,
  selectCreateModeElementType,
} from '../../../../store/dashboard/dashboardSelectors';
import {
  DashboardCreateModeElementType,
  DEFAULT_ELEMENT_NAME,
} from '../../../../types/dashboard.types';
import { setCreateModeDefaults } from '../../../../store/dashboard/dashboardReducer';
import ColorDisplayer from '../../../../components/ColorDisplayer/ColorDisplayer';

const CreationMode = memo(() => {
  const dispatch = useAppDispatch();
  const createModeElementType = useAppSelector(selectCreateModeElementType);
  const createModeDefaults = useAppSelector(selectCreateModeDefaults);

  const onEditableFieldsChange = (
    type: DashboardCreateModeElementType,
    property: string,
    value: any
  ) => {
    switch (type) {
      case 'rectangle':
        switch (property) {
          case 'fill':
            dispatch(
              setCreateModeDefaults({
                rectangle: {
                  ...createModeDefaults.rectangle,
                  fill: value,
                },
              })
            );
            break;

          case 'borderWidth':
            dispatch(
              setCreateModeDefaults({
                rectangle: {
                  ...createModeDefaults.rectangle,
                  border: {
                    ...createModeDefaults.rectangle.border,
                    width: +value,
                  },
                },
              })
            );
            break;

          case 'borderColor':
            dispatch(
              setCreateModeDefaults({
                rectangle: {
                  ...createModeDefaults.rectangle,
                  border: {
                    ...createModeDefaults.rectangle.border,
                    color: value,
                  },
                },
              })
            );
            break;

          case 'borderRadius':
            dispatch(
              setCreateModeDefaults({
                rectangle: {
                  ...createModeDefaults.rectangle,
                  border: {
                    ...createModeDefaults.rectangle.border,
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
              setCreateModeDefaults({
                circle: {
                  ...createModeDefaults.circle,
                  fill: value,
                },
              })
            );
            break;

          case 'borderWidth':
            dispatch(
              setCreateModeDefaults({
                circle: {
                  ...createModeDefaults.circle,
                  border: {
                    ...createModeDefaults.circle.border,
                    width: +value,
                  },
                },
              })
            );
            break;

          case 'borderColor':
            dispatch(
              setCreateModeDefaults({
                circle: {
                  ...createModeDefaults.circle,
                  border: {
                    ...createModeDefaults.circle.border,
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
              setCreateModeDefaults({
                line: {
                  ...createModeDefaults.line,
                  fill: value,
                },
              })
            );
            break;

          case 'lineWidth':
            dispatch(
              setCreateModeDefaults({
                line: {
                  ...createModeDefaults.line,
                  lineWidth: +value,
                },
              })
            );
            break;
        }
        break;
    }
  };

  const renderEditableFields = () => {
    switch (createModeElementType) {
      case 'rectangle':
        return (
          <>
            <ColorDisplayer
              label={'Fill color'}
              color={createModeDefaults.rectangle.fill}
              onColorChange={(color: string) =>
                onEditableFieldsChange('rectangle', 'fill', color)
              }
            />

            <br />

            <TextField
              type='number'
              label='Border width'
              defaultValue={createModeDefaults.rectangle.border.width}
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth
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

            <ColorDisplayer
              label={'Border color'}
              color={createModeDefaults.rectangle.border.color}
              onColorChange={(color: string) =>
                onEditableFieldsChange('rectangle', 'borderColor', color)
              }
            />

            <br />

            <TextField
              type='number'
              label='Border radius'
              defaultValue={createModeDefaults.rectangle.border.radius}
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth
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
            <ColorDisplayer
              label={'Fill color'}
              color={createModeDefaults.circle.fill}
              onColorChange={(color: string) =>
                onEditableFieldsChange('circle', 'fill', color)
              }
            />

            <br />

            <TextField
              type='number'
              label='Border width'
              defaultValue={createModeDefaults.circle.border.width}
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth
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

            <ColorDisplayer
              label={'Border color'}
              color={createModeDefaults.circle.border.color}
              onColorChange={(color: string) =>
                onEditableFieldsChange('circle', 'borderColor', color)
              }
            />
          </>
        );

      case 'line':
        return (
          <>
            <ColorDisplayer
              label={'Fill color'}
              color={createModeDefaults.line.fill}
              onColorChange={(color: string) =>
                onEditableFieldsChange('line', 'fill', color)
              }
            />

            <br />

            <TextField
              type='number'
              label='Line width'
              defaultValue={createModeDefaults.line.lineWidth}
              InputProps={{ inputProps: { min: 1 } }}
              fullWidth
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

  if (createModeElementType) {
    return (
      <div>
        <Typography variant='h5'>Creation mode</Typography>
        <Typography variant='subtitle1'>
          {DEFAULT_ELEMENT_NAME[createModeElementType]}
        </Typography>
        <br />
        {renderEditableFields()}
      </div>
    );
  } else {
    return null;
  }
});

export default CreationMode;
