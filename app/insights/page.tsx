import { Navigation } from '@/components/navigation'
import { InsightsDashboard } from '@/components/insights-dashboard'

export default function InsightsPage() {
  return (
    <>
      <Navigation currentPage={4} />
      <main className="min-h-screen bg-background text-foreground py-10 pb-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <InsightsDashboard />
        </div>
      </main>
    </>
  )
}
