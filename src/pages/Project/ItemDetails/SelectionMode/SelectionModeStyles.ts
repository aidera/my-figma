import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainInfo: {
      textAlign: 'left',
    },
  })
);

export default useStyles;
