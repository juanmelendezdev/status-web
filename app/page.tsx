"use client"

import { useState } from "react"
import SegmentationHero from "@/components/segmentation-hero"
import SegmentationCards from "@/components/segmentation-cards"
import MaturityQuiz from "@/components/maturity-quiz"
import Banner from "@/components/banner" // Assuming Banner component is imported

export default function Home() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  if (selectedSegment) {
    return <MaturityQuiz segment={selectedSegment} onBack={() => setSelectedSegment(null)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-slate-50 dark:from-slate-900 dark:to-background">
      <Banner />
      <div id="segmentos">
        <SegmentationHero />
        <SegmentationCards onSelectSegment={setSelectedSegment} />
      </div>
    </main>
  )
}
