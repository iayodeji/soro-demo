import { Navigation } from '@/components/navigation'
import { MatchingPipeline } from '@/components/matching-pipeline'

export default function MatchingPage() {
  return (
    <>
      <Navigation currentPage={2} />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <MatchingPipeline />
        </div>
      </main>
    </>
  )
}
