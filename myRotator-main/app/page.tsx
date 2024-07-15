"use client"
import React from 'react'
import TopBanner from "./components/topBanner"
import TopSection from "./components/topSection"
import BottomBanner from "./components/bottomBanner"
import TeamDataComponent from "./teamMain"
import TabComponent from './components/tabComponent'

export default function Home() {
  return (
    <main className="mainPage">
      <TopBanner />
      <div className='allTeamHeader'>
        <TopSection pageType="All Teams"/>
      </div>
      <TabComponent allTeam={1} recTeam={0} recLearn={0} passedVal={0} />
      <br />
      <TeamDataComponent />
      <BottomBanner />
    </main>
  )
}
