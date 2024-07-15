"use client"
import React from 'react'
import TopBanner from "../components/topBanner"
import TopSection from "../components/topSection"
import BottomBanner from "../components/bottomBanner"
import TeamRecs from "./teamRecommendation"
import TabComponent from '../components/tabComponent'


export default function Home() {

  return (
    <main className="mainPage">
      <TopBanner />
      <div className='recTeamHeader'>
        <TopSection pageType="Recommended Teams"/>
      </div>
      <TabComponent allTeam={1} recTeam={0} recLearn={1} passedVal={1} />
      <TeamRecs />
      <BottomBanner />
    </main>
  )
}
