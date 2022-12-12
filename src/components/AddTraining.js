import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '', customer: props.customer.links[0].href
    });

    const handleClickOpen = () => {
        setOpen(true);
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

    const saveTraining = () => {
        props.saveTraining(training);
        handleClose();
    }



    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
               Lisää treeni 
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Uusi aktiviteetti</DialogTitle>
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
                    <Button onClick={handleClose}>Peruuta</Button>
                    <Button onClick={saveTraining}>Tallenna</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}