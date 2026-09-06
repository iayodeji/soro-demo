import { Navigation } from '@/components/navigation'
import { ConversationView } from '@/components/conversation-view'

export default function ConversationPage() {
  return (
    <>
      <Navigation currentPage={3} />
      <main className="min-h-screen bg-background text-foreground py-10 pb-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ConversationView />
        </div>
      </main>
    </>
  )
}
