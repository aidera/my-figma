import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      overflow: 'visible'
    },
  })
);

export default useStyles;
