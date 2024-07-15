"use client"
import React from 'react'
import BottomBanner from "../components/bottomBanner"
import TopBanner from "../components/topBanner"
import TopSection from "../components/topSection"
import UserIconBig from "./userIconBig"
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import UserComponent from "./userComponent"
import TabComponent from '../components/tabComponent'


export default function Home() {

  return (
    <main className="mainPage">
      <TopBanner/>
      <TopSection pageType="My Profile" />
      <Divider sx={{width: '100%'}} />
      <TabComponent allTeam={0} recTeam={1} recLearn={2} passedVal={3} />
      <div className="profileHeader">
        <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: '8px', paddingBottom: '8px'}}>
          <Box sx={{backgroundColor: 'rgb(0, 51, 141)', width: 'fit-content', padding: '10px', borderRadius: '50%'}}>
            <UserIconBig />
          </Box>
        </Box>
        <Divider />
        <UserComponent />
      </div>
      <BottomBanner />
    </main>
  )
}
