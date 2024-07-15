import React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

type Props = {
  allTeam: number,
  recTeam: number,
  recLearn: number,
  passedVal: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabComponent = ({ allTeam, recTeam, recLearn, passedVal }: Props) => {

  const [value, setValue] = React.useState(passedVal);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#ffffff'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} centered >
          <Tab label="All Teams" href="/" {...a11yProps(allTeam)} sx={{fontSize: '16px', color: '#646464'}}/>
          <Tab label="Recommended Teams" href="/recommendedTeams" {...a11yProps(recTeam)} sx={{fontSize: '16px', color: '#646464'}}/>
          <Tab label="Recommended Learning" href="/recommendedLearning" {...a11yProps(recLearn)} sx={{fontSize: '16px', color: '#646464'}}/>
          <Tab label="My Profile" href="/userProfile" {...a11yProps(3)} sx={{fontSize: '16px', color: '#646464'}}/>
        </Tabs>
      </Box>
    </Box>
  )
} 

export default TabComponent