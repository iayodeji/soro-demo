import { Navigation } from '@/components/navigation'
import { InsightsDashboard } from '@/components/insights-dashboard'

export default function InsightsPage() {
  return (
    <>
      <Navigation currentPage={4} />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <InsightsDashboard />
        </div>
      </main>
    </>
  )
}
