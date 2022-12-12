import React, {useState} from 'react';
import './App.css';
import { AppBar, Typography, Tabs, Tab } from '@mui/material';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const tabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <div>
      <AppBar position='static'>
          <Typography variant='h6'>
            PT Frontti
          </Typography>
          <Tabs
          value={tabIndex}
          onChange={tabChange}>
            <Tab style={{backgroundColor:'white'}} label='Asiakkaat' />
            <Tab style={{backgroundColor:'white'}} label='Harjoitukset' />
          </Tabs>
      </AppBar>
      
      <div>
        {tabIndex === 0 && (
          <div>
            <Customerlist />
          </div>
        )}
        {tabIndex === 1 && (
          <div>
            <Traininglist />
          </div>
        )}
      </div>
      
    </div>
  );
}

export default App;
