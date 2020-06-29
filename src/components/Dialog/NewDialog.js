import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other} >
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {

  const handleClose = () => {
    props.handleDialogClose();
};

  return (
    <div>
        <Dialog 
            open={props.states} 
            onClose={handleClose} 
            aria-labelledby="customized-dialog-title" 
        >

            <DialogTitle id="customized-dialog-title" onClose={handleClose} >
                {props.title}
            </DialogTitle>

            <DialogContent className={`modalNew`} style={{textAlign : 'center'}}>
                {props.children}
            </DialogContent>

            <DialogActions>
                {props.action}
            </DialogActions>

        </Dialog>
    </div>
  );
}
