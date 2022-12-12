import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTraining from './AddTraining';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    };

    useEffect(() => fetchData(), []);

    const EditButton = p => {
        return (
                <EditCustomer updateCustomer={updateCustomer} customer= {p.row} deleteCustomer={deleteCustomer}/>
        )
    };

    const AddButton = p => {
        return (
                <AddTraining saveTraining={saveTraining} customer= {p.row}/>
        )
    };
    
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    };

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    };

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    };

    const deleteCustomer = (link) => {
        if (window.confirm('Haluatko varmasti poistaa asiakkaan pysyvästi?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    };
      
    const columns = [
        { field: 'lastname', headerName: 'Sukunimi', width: 150 },
        { field: 'firstname', headerName: 'Etunimi', width: 150 },
        { field: 'streetaddress', headerName: 'Osoite', width: 220 },
        { field: 'postcode', headerName: 'Postinumero', width: 100 },
        { field: 'city', headerName: 'Paikkakunta', width: 150 },
        { field: 'email', headerName: 'Sähköposti', width: 220 },
        { field: 'phone', headerName: 'Puhelin', width: 150 },
        { field: 'edit', headerName: '', renderCell: EditButton, width: 180, disableExport: true },
        { field: 'add', headerName: '', renderCell: AddButton, width: 150, disableExport: true },
    ];

    return (
        <div>
            <div>
                <AddCustomer saveCustomer={saveCustomer} />
            </div>

            <div style={{ height: 850, width: '100%' }}>
                <DataGrid 
                rows={customers} 
                columns={columns}
                getRowId={(row) =>  row.links[0].href} 
                autoPageSize
                components={{ Toolbar: GridToolbar}} 
                componentsProps={{ toolbar: {csvOptions: { utf8WithBom: true} }}}/>
            </div>
        </div>
    );
}