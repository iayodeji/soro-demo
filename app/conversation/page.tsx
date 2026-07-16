import { Navigation } from '@/components/navigation'
import { ConversationView } from '@/components/conversation-view'

export default function ConversationPage() {
  return (
    <>
      <Navigation currentPage={3} />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <ConversationView />
        </div>
      </main>
    </>
  )
}
