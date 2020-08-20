import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from '@material-ui/core/Button';

function WinPopup(props) {
    const [open, setOpen] = useState(props.open);
    useEffect(() => {setOpen(props.open)},[props.open]);

    const handleClose = () => {
        setOpen(false);
    };
    const submitHandler = () =>{
        props.onSubmit();
        handleClose();
    }
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">You Won!!!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your name.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Full name"
                    type="text"
                    fullWidth
                    value={props.playerName}
                    onChange={({target}) => {
                        props.changeName(target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={submitHandler} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default WinPopup;
