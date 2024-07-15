"use client"
import * as React from 'react';
import TopBanner from "../components/topBanner"
import TopSection from "../components/topSection"
import BottomBanner from "../components/bottomBanner"
import TabComponent from "../components/tabComponent";
import LearningRecs from "./learningRecommendation";

export default function Home() {
  return (
    <main className="mainPage">
      <TopBanner />
      <div className='recLearningHeader'>
        <TopSection pageType="Recommended Learning"/>
      </div>
      <TabComponent allTeam={0} recTeam={1} recLearn={2} passedVal={2} />
      <LearningRecs />
      <BottomBanner />
    </main>
  )
}
