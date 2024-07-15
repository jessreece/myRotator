"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import DynamicTeam from './dynamicTeam';
import TopBanner from '../components/topBanner';
import TopSection from '../components/topSection';
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BottomBanner from '../components/bottomBanner';

function parseAndFormatURL(url: string): string {
  // Split the URL by '/' to get individual parts
  const parts = url.split('/');
  
  // Get the last part of the URL after the hostname
  const teamName = parts[parts.length - 1];

  // Remove any leading or trailing whitespace
  return teamName.trim();
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Page = () => {
  const [teamNameURL, setTeamNameURL] = useState<string>();
  const [value, setValue] = React.useState(3);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    // Retrieve current URL on client-side
    const currentURL = window.location.href;
    const teamNameURL = parseAndFormatURL(currentURL);
    console.log('Formatted URL:', teamNameURL);
    setTeamNameURL(teamNameURL);
  }, []);

  const decodedTeamName = decodeURIComponent(teamNameURL as string);
  
  return (
    <main className="mainPage">
      <TopBanner />
        <div className='allTeamHeader'>
          <TopSection pageType={decodedTeamName}/>
        </div>
        <Box sx={{ width: '100%', backgroundColor: '#FFFFFF' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered >
            <Tab label="All Teams" href="/" {...a11yProps(0)} sx={{fontSize: '16px', color: '#646464'}}/>
            <Tab label="Recommended Teams" href="/recommendedTeams" {...a11yProps(1)} sx={{fontSize: '16px', color: '#646464'}} />
            <Tab label="Recommended Learning" href="/recommendedLearning" {...a11yProps(2)} sx={{fontSize: '16px', color: '#646464'}}/>
            <Tab label={decodedTeamName} {...a11yProps(3)} sx={{fontSize: '16px', color: '#646464'}}/>
          </Tabs>
        </Box>
      </Box>
      <DynamicTeam teamName={teamNameURL}/>
      <BottomBanner />
    </main>
  );
};

export default Page;
