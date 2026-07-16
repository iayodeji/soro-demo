'use client'

import { useFlow } from '@/contexts/flow-context'
import { Navigation } from '@/components/navigation'
import { NavigationFooter } from '@/components/navigation-footer'
import { BriefForm } from '@/components/brief-form'
import { MatchingPipeline } from '@/components/matching-pipeline'
import { ConversationView } from '@/components/conversation-view'
import { InsightsDashboard } from '@/components/insights-dashboard'

export default function Page() {
  const { currentPage } = useFlow()

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <BriefForm />
      case 2:
        return <MatchingPipeline />
      case 3:
        return <ConversationView />
      case 4:
        return <InsightsDashboard />
      default:
        return <BriefForm />
    }
  }

  return (
    <>
      <Navigation currentPage={currentPage} />
      <main className="min-h-screen bg-background text-foreground pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {renderPage()}
        </div>
      </main>
      <NavigationFooter />
    </>
  )
}
