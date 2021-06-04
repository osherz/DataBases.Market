import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ title, open, handleClose, handleFinish, ...props }) {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" {...props}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleFinish} color="primary">
                    Finish
                </Button>
            </DialogActions>
        </Dialog>
    );
}