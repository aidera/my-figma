import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
    },
    selectContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: `1px solid ${theme.palette.primary.main}`,
      zIndex: 4,
      cursor: 'move',
    },
    selectPoint: {
      position: 'absolute',
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.primary.main}`,
      width: 10,
      height: 10,
      zIndex: 5,
    },
    selectTopLeftPoint: {
      top: '-5px',
      left: '-5px',
      cursor: 'nw-resize',
    },
    selectTopRightPoint: {
      top: '-5px',
      right: '-5px',
      cursor: 'ne-resize',
    },
    selectBottomLeftPoint: {
      bottom: '-5px',
      left: '-5px',
      cursor: 'sw-resize',
    },
    selectBottomRightPoint: {
      bottom: '-5px',
      right: '-5px',
      cursor: 'se-resize',
    },
  })
);

export default useStyles;
