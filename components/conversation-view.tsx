'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { conversations } from '@/data/demo-data'
import type { DemoMessage } from '@/data/demo-data'
import { useFlow } from '@/contexts/flow-context'

export function ConversationView() {
  const { nextPage } = useFlow()
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState<DemoMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingParticipant, setTypingParticipant] = useState<DemoMessage['type'] | null>(null)
  const conversation = conversations[selectedConversation]
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const shouldFollowMessagesRef = useRef(true)

  const handlePrev = () => setSelectedConversation((prev) => (prev === 0 ? conversations.length - 1 : prev - 1))
  const handleNext = () => setSelectedConversation((prev) => (prev === conversations.length - 1 ? 0 : prev + 1))

  const handleMessagesScroll = () => {
    const container = messagesContainerRef.current
    if (!container) return
    shouldFollowMessagesRef.current = container.scrollHeight - container.scrollTop - container.clientHeight < 24
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let typingTimeoutId: NodeJS.Timeout
    shouldFollowMessagesRef.current = true
    setVisibleMessages([])
    setIsTyping(false)
    setTypingParticipant(null)
    let currentIndex = 0

    const revealNextMessage = () => {
      if (currentIndex >= conversation.messages.length) return
      const nextMessage = conversation.messages[currentIndex]
      setTypingParticipant(nextMessage.type)
      setIsTyping(true)
      typingTimeoutId = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages((previous) => [...previous, nextMessage])
        currentIndex += 1
        timeoutId = setTimeout(revealNextMessage, 1000)
      }, nextMessage.type === 'moderator' ? 1000 : 2500)
    }

    timeoutId = setTimeout(revealNextMessage, 1500)
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(typingTimeoutId)
    }
  }, [conversation])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container && shouldFollowMessagesRef.current) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }
  }, [visibleMessages, isTyping])

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mb-8">
        <h1 className="mb-2 text-4xl font-display font-bold leading-tight text-foreground">Research Conversations</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">AI-moderated conversations using Mom Test principles. Each moderator guides natural, open-ended discussions without survey language or leading questions.</p>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-border bg-muted/20 p-5">
        <div>
          <p className="text-sm font-semibold text-foreground">Batch #1 · {conversations.length} of {conversations.length} conversations completed</p>
          <p className="mt-1 text-xs text-muted-foreground">A demo batch across verified students on connected campuses.</p>
        </div>
        <span className="border border-primary px-3 py-1.5 text-xs font-semibold text-primary">All responses collected</span>
      </div>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 border border-border bg-card p-3 md:flex-row">
        <div className="relative inline-flex w-full items-center md:w-auto">
          <Users className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <select value={selectedConversation} onChange={(event) => setSelectedConversation(Number(event.target.value))} className="h-10 w-full appearance-none border border-border bg-muted/40 pl-10 pr-10 text-sm font-semibold text-foreground outline-none focus:ring-2 focus:ring-primary md:w-[320px]">
            {conversations.map((item, index) => <option key={item.studentName} value={index}>{item.studentName} ({item.studentCampus})</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Previous conversation"><ChevronLeft /></Button>
          <span className="min-w-[80px] text-center text-sm font-medium text-muted-foreground">{selectedConversation + 1} of {conversations.length}</span>
          <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next conversation"><ChevronRight /></Button>
        </div>
      </div>

      <div className="mb-8 space-y-6 rounded-md border border-border bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="mb-1 text-xl font-bold text-foreground">{conversation.studentName}</p>
            <p className="text-sm font-medium text-muted-foreground">{conversation.studentCourse} · {conversation.studentCampus}</p>
          </div>
          <div className="flex gap-5 text-right">
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Duration</p><p className="text-sm font-semibold text-foreground">{conversation.duration}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Insights</p><p className="text-sm font-semibold text-foreground">{conversation.insightsCount}</p></div>
          </div>
        </div>

        <div ref={messagesContainerRef} onScroll={handleMessagesScroll} className="flex h-[500px] flex-col space-y-4 overflow-y-auto pr-3">
          {visibleMessages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'moderator' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-md px-5 py-3.5 ${message.type === 'moderator' ? 'rounded-2xl rounded-bl-sm bg-muted/60 text-foreground' : 'rounded-2xl rounded-br-sm bg-primary text-primary-foreground'}`}>
                <p className="break-words text-[15px] leading-relaxed">{message.content}</p>
                <p className="mt-2 text-[11px] font-medium opacity-70">{message.timestamp}</p>
              </div>
            </div>
          ))}
          {isTyping && typingParticipant && <div className={`flex ${typingParticipant === 'moderator' ? 'justify-start' : 'justify-end'}`}><div className={`px-5 py-4 ${typingParticipant === 'moderator' ? 'rounded-2xl rounded-bl-sm bg-muted/60' : 'rounded-2xl rounded-br-sm bg-primary'}`}><div className="flex h-4 items-center gap-1.5"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60 [animation-delay:-0.15s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60 [animation-delay:-0.3s]" /></div></div></div>}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row">
        <Button onClick={nextPage} size="lg" className="flex-1">Analyze Insights</Button>
        <Button type="button" variant="outline" size="lg">Export Transcripts</Button>
      </div>
    </div>
  )
}
