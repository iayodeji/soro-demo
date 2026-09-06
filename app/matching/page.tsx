import { Navigation } from '@/components/navigation'
import { MatchingPipeline } from '@/components/matching-pipeline'

export default function MatchingPage() {
  return (
    <>
      <Navigation currentPage={2} />
      <main className="min-h-screen bg-background text-foreground py-10 pb-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <MatchingPipeline />
        </div>
      </main>
    </>
  )
}
