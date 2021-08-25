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
      width: '1.4vh',
      height: '1.4vh',
      zIndex: 5,
    },
    selectTopLeftPoint: {
      top: '-0.7vh',
      left: '-0.7vh',
      cursor: 'nw-resize',
    },
    selectTopRightPoint: {
      top: '-0.7vh',
      right: '-0.7vh',
      cursor: 'ne-resize',
    },
    selectBottomLeftPoint: {
      bottom: '-0.7vh',
      left: '-0.7vh',
      cursor: 'sw-resize',
    },
    selectBottomRightPoint: {
      bottom: '-0.7vh',
      right: '-0.7vh',
      cursor: 'se-resize',
    },
    selectLine: {
      position: 'absolute',
      zIndex: 4,
    },
    selectTopLine: {
      width: '100%',
      height: '1.4vh',
      top: '-0.7vh',
      cursor: 'n-resize',
    },
    selectRightLine: {
      height: '100%',
      width: '1.4vh',
      right: '-0.7vh',
      cursor: 'e-resize',
    },
    selectBottomLine: {
      width: '100%',
      height: '1.4vh',
      bottom: '-0.7vh',
      cursor: 's-resize',
    },
    selectLeftLine: {
      height: '100%',
      width: '1.4vh',
      left: '-0.7vh',
      cursor: 'w-resize',
    },
  })
);

export default useStyles;
