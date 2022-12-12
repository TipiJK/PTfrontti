import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '', customer: props.training.customer
    });

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            date: props.training.date, 
            duration: props.training.duration, 
            activity: props.training.activity, 
        })
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    };

    const handleDateChange = (time) => {
        setTraining({...training, date: time})
    };

    const updateTraining = () => {
        props.updateTraining(training, props.training.id);
        handleClose();
    };

    const deleteTraining = () => {
        props.deleteTraining(props.training.id);
        handleClose();
    };

    return(
<div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Muokkaa
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Muokkaa tietoja</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDateTimePicker
                            label="Aika"
                            value={training.date}
                            onChange={e => handleDateChange(e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        label="Kesto"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        label="Aktiviteetti"
                        onChange={e => handleInputChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteTraining} color='warning' >Poista</Button>
                    <Button onClick={handleClose}>Peruuta</Button>
                    <Button onClick={updateTraining}>Tallenna</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}