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
    const [playerName, setPlayerName] = useState();
    useEffect(() => {setOpen(props.open)},[props.open]);

    const handleClose = () => {
        setOpen(false);
    };

    const submitName = () => {
        const newPlayerRecord = {
            "id": 1,
            "winnerName": playerName,
            "date": "2020-08-01 23:30:43"
        }
        fetch('http://localhost:8080/api/v1/records',
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlayerRecord)});
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
                    value={playerName}
                    onChange={({target}) => {
                        setPlayerName(target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={submitName} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default WinPopup;
