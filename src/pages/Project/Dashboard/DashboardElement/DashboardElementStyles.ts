import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      border: '1px solid black',
      background: 'white',
    },
  })
);

export default useStyles;
