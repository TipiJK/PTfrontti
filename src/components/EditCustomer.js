import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        lastname: '', firstname: '', streetaddress: '', postcode: '', city: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            lastname: props.customer.lastname, 
            firstname: props.customer.firstname, 
            streetaddress: props.customer.streetaddress, 
            postcode: props.customer.postcode, 
            city: props.customer.city, 
            email: props.customer.email, 
            phone: props.customer.phone, 
        })
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    };

    const updateCustomer = () => {
        props.updateCustomer(customer, props.customer.links[0].href);
        handleClose();
    };

    const deleteCustomer = () => {
        props.deleteCustomer(props.customer.links[0].href);
        handleClose();
    };


    return(
<div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Muokkaa tietoja
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Muokkaa tietoja</DialogTitle>
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
                    <Button onClick={deleteCustomer} color='warning' >Poista</Button>
                    <Button onClick={handleClose}>Peruuta</Button>
                    <Button onClick={updateCustomer}>Tallenna</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}