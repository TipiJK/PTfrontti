import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment/moment';
import EditTraining from './EditTraining';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    };

    useEffect(() => fetchData(), []);

    const EditButton = p => {
        return (
                <EditTraining updateTraining={updateTraining} training= {p.row} deleteTraining={deleteTraining}/>
        )
    };

    const updateTraining = (training, id) => {
        fetch('https://customerrest.herokuapp.com/api/trainings/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    };

    const deleteTraining = (id) => {
        if (window.confirm('Haluatko varmasti poistaa aktiviteetin pysyvästi?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/'+id, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }

    const columns = [
        { field: 'date', headerName: 'Pvm', width: 220,
            valueFormatter: (params) => {
            const valueFormatted = moment(params.value).format('DD.MM.YYYY, HH:mm');
            return valueFormatted;
            } },
        { field: 'duration', headerName: 'Kesto', width: 60 },
        { field: 'activity', headerName: 'Aktiviteetti', width: 220 },
        { field: 'fullname', headerName: 'Asiakas', width: 220, renderCell: (params) => {return <div>{params.row.customer.lastname+', '+params.row.customer.firstname}</div>;} },
        { field: 'button', headerName: '', renderCell: EditButton, width: 150 },
    ];

    return (
        <div>
            <div style={{ height: 850, width: '100%' }}>
                <DataGrid 
                    rows={trainings} 
                    columns={columns}
                    autoPageSize />
            </div>
        </div>
    );
}