import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
      textAlign: 'left',
    },
    label: {
      color: theme.palette.grey[600]
    },
    colorButton: {
      width: 30,
      height: 30,
      cursor: 'pointer',
      border: '1px solid lightgray',
    },
    menuList: {
      padding: 0,
    },
  })
);

export default useStyles;
