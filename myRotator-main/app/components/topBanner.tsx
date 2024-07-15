import Logo from './logo'
import UserIcon from './userIcon'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const TopBanner = () => {
  return (
    <AppBar component="header" position="sticky" sx={{ backgroundColor: 'rgb(0, 51, 141)'}}>
      <Toolbar sx = {{ 
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Tooltip title="All Teams">
          <IconButton sx={{ paddingLeft: '-80px', paddingRight: '-80px', justifyContent: 'flex-start' }} href="/">
            <Logo />
          </IconButton>
        </Tooltip>
        <Typography sx={{ fontSize: 24, justifyContent: 'center', paddingRight: '4.5%' }}>
          myRotator
        </Typography>
        <Tooltip title="My Profile">
          <IconButton sx={{ justifyContent: 'flex-end' }} href="/userProfile">
            <UserIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default TopBanner