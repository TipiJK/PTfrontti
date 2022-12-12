import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        lastname: '', firstname: '', streetaddress: '', postcode: '', city: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + uusi asiakas
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Uusi asiakas</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        label="Etunimi"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        label="Sukunimi"
                        onChange={e => handleInputChange(e)}
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        label="Osoite"
                        onChange={e => handleInputChange(e)}
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        label="Postinumero"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        value={customer.city}
                        label="Paikkakunta"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        value={customer.email}
                        label="Sähköposti"
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        label="Puhelin"
                        onChange={e => handleInputChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}