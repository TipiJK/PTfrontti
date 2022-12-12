import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from "moment";


export default function Schedule() {
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([{ title: 'event 1', date: '2022-12-01' },
    { title: 'event 2', date: '2022-12-02' }]);
    const [activeView, setActiveView] = React.useState("timeGridDay");
    
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    };
    useEffect(() => {
        fetchData();    
    }, []);


   // setEvents(...events, array);
   useEffect(() => {
    console.log('prkl')
    const array = (trainings ? Object.keys(trainings).map(key =>
        ({
            id: key,
            title: trainings[key].activity,
            start: trainings[key].date,
            end: moment(trainings[key].date).add(trainings[key].duration, 'minutes').format(),
        })) : []);
    console.log('a', array)
    setEvents(array);
  }, [trainings]);
   
  console.log('e: ', events);
  console.log('t', trainings)

    return (
        <div style={{padding: 50}}>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="timeGridWeek"
                events={events}
                height={860}
                headerToolbar={{
                    left: "prev, next",
                    center: "title",
                    right: "today, timeGridWeek,timeGridDay,dayGridMonth"
                  }}
            />
      </div>
    );
}