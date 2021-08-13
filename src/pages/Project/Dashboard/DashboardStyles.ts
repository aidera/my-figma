import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default useStyles;