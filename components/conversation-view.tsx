'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { useFlow } from '@/contexts/flow-context'

interface Message {
  id: string
  type: 'student' | 'moderator'
  content: string
  timestamp: string
  studentName?: string
}

interface Conversation {
  studentName: string
  studentCampus: string
  studentCourse: string
  duration: string
  insightsCount: number
  messages: Message[]
}

const mockConversations: Conversation[] = [
  {
    studentName: 'Chioma Adeyemi',
    studentCampus: 'UI, Ibadan',
    studentCourse: 'Business Administration',
    duration: '6 min',
    insightsCount: 5,
    messages: [
      { id: '1', type: 'moderator', content: 'hey! so when last did you buy a new outfit or piece of clothing — like actually pull out your money and pay for something. what was it?', timestamp: '2:30 PM' },
      { id: '2', type: 'student', content: "lol okay so like 2 weeks ago I bought a pair of wide leg jeans from a vendor on IG. I'd been eyeing it since December sha", timestamp: '2:31 PM', studentName: 'Chioma' },
      { id: '3', type: 'moderator', content: 'since december? what took you so long to actually buy it', timestamp: '2:31 PM' },
      { id: '4', type: 'student', content: 'I no guide honestly 😭 but also I kept seeing different styles on my feed and I was like this is pretty dope I need to get this', timestamp: '2:32 PM', studentName: 'Chioma' },
      { id: '5', type: 'moderator', content: 'what changed 2 weeks ago that made you finally go through with it', timestamp: '2:33 PM' },
      { id: '6', type: 'student', content: 'I saw my coursemate wearing something similar to a hangout and it looked very nice on her, so that pushed me', timestamp: '2:33 PM', studentName: 'Chioma' },
      { id: '7', type: 'moderator', content: 'did you compare it anywhere else before paying this particular vendor, or was it straight to checkout', timestamp: '2:34 PM' },
      { id: '8', type: 'student', content: 'I checked 2 other pages sha, one was cheaper but the reviews under her post were giving "fabric too thin" I no gree', timestamp: '2:35 PM', studentName: 'Chioma' },
      { id: '9', type: 'moderator', content: 'how much was the price difference between the one you picked and the cheaper option', timestamp: '2:35 PM' },
      { id: '10', type: 'student', content: "like 3k difference, 12k vs 9k. I just felt like paying small extra for something that won't disappoint me was worth it", timestamp: '2:36 PM', studentName: 'Chioma' },
      { id: '11', type: 'moderator', content: 'got you. now think of something you almost bought recently but talked yourself out of — what happened there', timestamp: '2:37 PM' },
      { id: '12', type: 'student', content: 'omo yes, there was this crop top set, really nice, but when I checked the vendor\'s page well well, all the "customer photos" looked kind of recycled, like reused from a bigger store. that scared me off', timestamp: '2:38 PM', studentName: 'Chioma' },
      { id: '13', type: 'moderator', content: 'interesting — what specifically made you feel the photos were reused', timestamp: '2:38 PM' },
      { id: '14', type: 'student', content: 'the lighting and background were too consistent across different "customers," like it\'s the same studio setup. felt fake so I closed the app', timestamp: '2:39 PM', studentName: 'Chioma' },
      { id: '15', type: 'moderator', content: 'thanks so much for your time, really appreciate it, Chioma!', timestamp: '2:40 PM' },
    ],
  },
  {
    studentName: 'Tunde Bakare',
    studentCampus: 'OAU, Ile-Ife',
    studentCourse: 'Mechanical Engineering',
    duration: '5 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hey Tunde, when last did you buy any clothing item or shoes? walk me through it.', timestamp: '4:10 PM' },
      { id: '2', type: 'student', content: 'I got a pair of sneakers last month from the thrift market around campus. Just some regular forces.', timestamp: '4:11 PM', studentName: 'Tunde' },
      { id: '3', type: 'moderator', content: 'what made you go to the physical market instead of checking online?', timestamp: '4:11 PM' },
      { id: '4', type: 'student', content: "nah, for shoes I have to test the fit. You can't trust these online sizes, plus I need to check the sole to be sure it's durable.", timestamp: '4:12 PM', studentName: 'Tunde' },
      { id: '5', type: 'moderator', content: 'did you end up paying the first price the seller called?', timestamp: '4:13 PM' },
      { id: '6', type: 'student', content: "definitely not lol. He called 12k, I priced it down to 8k. It's standard practice, if you don't haggle they'll just cheat you.", timestamp: '4:13 PM', studentName: 'Tunde' },
      { id: '7', type: 'moderator', content: 'was there a point where you almost didn\'t buy it?', timestamp: '4:14 PM' },
      { id: '8', type: 'student', content: 'yeah, when he was insisting on 10k, I just walked away. He eventually called me back.', timestamp: '4:14 PM', studentName: 'Tunde' },
      { id: '9', type: 'moderator', content: 'interesting. do you ever buy clothes online then, or is it always physical for you?', timestamp: '4:15 PM' },
      { id: '10', type: 'student', content: 'I only do online for basic stuff like plain tees from brands I already know. Anything that needs perfect fitting, I\'m not risking it.', timestamp: '4:16 PM', studentName: 'Tunde' },
      { id: '11', type: 'moderator', content: 'makes sense. thanks a lot for your time Tunde, really helpful.', timestamp: '4:16 PM' },
    ],
  },
  {
    studentName: 'Amara Nwosu',
    studentCampus: 'UNILAG, Lagos',
    studentCourse: 'Mass Communication',
    duration: '6 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hi Amara, tell me about the last piece of clothing or accessory you actually paid for.', timestamp: '11:02 AM' },
      { id: '2', type: 'student', content: 'I bought a mini bag recently. Saw an influencer carrying it on her page, it had this crazy drip, so I tapped the vendor\'s tag.', timestamp: '11:03 AM', studentName: 'Amara' },
      { id: '3', type: 'moderator', content: 'what did you do after getting to the vendor\'s page? did you buy straight away?', timestamp: '11:03 AM' },
      { id: '4', type: 'student', content: 'nope, I had to scroll through their older posts first. I was looking for customer tags and checking the comment section.', timestamp: '11:04 AM', studentName: 'Amara' },
      { id: '5', type: 'moderator', content: 'what exactly were you looking for in the comments?', timestamp: '11:05 AM' },
      { id: '6', type: 'student', content: 'just checking if anyone was dragging them for late delivery or fake items. You know how IG vendors can be.', timestamp: '11:05 AM', studentName: 'Amara' },
      { id: '7', type: 'moderator', content: 'and what did you find this time?', timestamp: '11:06 AM' },
      { id: '8', type: 'student', content: 'mostly positive stuff. A few people complained about the delivery fee, but no one called it a scam, so I felt safe enough to order.', timestamp: '11:06 AM', studentName: 'Amara' },
      { id: '9', type: 'moderator', content: 'was the price a big factor in your decision?', timestamp: '11:07 AM' },
      { id: '10', type: 'student', content: 'not really, it was more about credibility. I\'ve fallen for an IG scam before, so I value my peace of mind over saving a few naira.', timestamp: '11:07 AM', studentName: 'Amara' },
      { id: '11', type: 'moderator', content: 'oh wow, what happened the time you got scammed?', timestamp: '11:08 AM' },
      { id: '12', type: 'student', content: 'paid 25k for a two-piece set, waited three weeks, and the page literally disappeared. Since then I do proper background checks.', timestamp: '11:09 AM', studentName: 'Amara' },
      { id: '13', type: 'moderator', content: 'thank you so much Amara, really appreciate you sharing that.', timestamp: '11:09 AM' },
    ],
  },
]

export function ConversationView() {
  const { nextPage } = useFlow()
  const [selectedConversation, setSelectedConversation] = useState(0)
  
  // Animation states
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingParticipant, setTypingParticipant] = useState<'moderator' | 'student' | null>(null)
  
  const conversation = mockConversations[selectedConversation]
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Slideshow Navigation
  const handlePrev = () => {
    setSelectedConversation((prev) =>
      prev === 0 ? mockConversations.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setSelectedConversation((prev) =>
      prev === mockConversations.length - 1 ? 0 : prev + 1
    )
  }

  // Handle the chat typing animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let typingTimeoutId: NodeJS.Timeout

    // Reset when switching conversations
    setVisibleMessages([])
    setIsTyping(false)
    setTypingParticipant(null)
    
    let currentIndex = 0
    const messages = mockConversations[selectedConversation].messages

    const revealNextMessage = () => {
      if (currentIndex < messages.length) {
        const nextMsg = messages[currentIndex]
        
        // Start typing indicator
        setTypingParticipant(nextMsg.type)
        setIsTyping(true)

        // Dynamic delay: Moderator types faster (AI), student takes a bit longer
        const typingDelay = nextMsg.type === 'moderator' ? 1000 : 2500

        typingTimeoutId = setTimeout(() => {
          setIsTyping(false)
          setVisibleMessages((prev) => [...prev, nextMsg])
          currentIndex++
          
          // Small pause before the next person starts typing
          timeoutId = setTimeout(revealNextMessage, 1000)
        }, typingDelay)
      }
    }

    // Start the sequence after a short initial pause
    timeoutId = setTimeout(revealNextMessage, 1500)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(typingTimeoutId)
    }
  }, [selectedConversation])

  // Auto-scroll to bottom when new messages or typing indicator appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleMessages, isTyping])

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2 leading-tight">
          Research Conversations
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-light">
          AI-moderated conversations using Mom Test principles. Each moderator
          guides natural, open-ended discussions without survey language or
          leading questions.
        </p>
      </div>

      {/* Batch banner */}
      <div className="mb-6 p-5 rounded-xl border border-border/50 bg-muted/20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Batch #1 · {mockConversations.length} of {mockConversations.length}{' '}
            conversations completed
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This is a demo batch of {mockConversations.length}. Sòrò batches
            typically run 50–100+ conversations across verified students on
            connected campuses.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/15 text-accent flex-shrink-0">
          All responses collected
        </span>
      </div>

      {/* Slideshow Toolbar */}
      <div className="mb-6 bg-card border border-border/50 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        {/* Dropdown Selector */}
        <div className="relative inline-flex items-center w-full md:w-auto">
          <Users className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
          <select
            value={selectedConversation}
            onChange={(e) => setSelectedConversation(Number(e.target.value))}
            className="appearance-none bg-muted/40 hover:bg-muted/60 transition-colors border border-border/50 text-foreground font-semibold text-sm py-2.5 pl-10 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer w-full md:w-[320px]"
          >
            {mockConversations.map((conv, idx) => (
              <option key={idx} value={idx}>
                {conv.studentName} ({conv.studentCampus})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 pointer-events-none" />
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="h-9 w-9 rounded-full border-border/50 hover:bg-muted"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground min-w-[80px] text-center">
            {selectedConversation + 1} of {mockConversations.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="h-9 w-9 rounded-full border-border/50 hover:bg-muted"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Conversation Viewer */}
      <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm mb-8">
        {/* Student Info */}
        <div className="pb-5 border-b border-border/50 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xl font-bold text-foreground mb-1">
              {conversation.studentName}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              {conversation.studentCourse} • {conversation.studentCampus}
            </p>
          </div>
          <div className="flex gap-4">
             <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                Duration
              </p>
              <p className="text-sm font-semibold text-foreground">
                {conversation.duration}
              </p>
            </div>
             <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                Insights
              </p>
              <p className="text-sm font-semibold text-foreground">
                {conversation.insightsCount}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Chat Area */}
        <div className="space-y-4 h-[500px] overflow-y-auto pr-3 custom-scrollbar flex flex-col">
          {visibleMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                msg.type === 'moderator' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-md px-5 py-3.5 transition-smooth ${
                  msg.type === 'moderator'
                    ? 'bg-muted/60 text-foreground rounded-3xl rounded-bl-sm'
                    : 'bg-primary text-primary-foreground rounded-3xl rounded-br-sm shadow-sm'
                }`}
              >
                <p className="text-[15px] leading-relaxed break-words">
                  {msg.content}
                </p>
                <p
                  className={`text-[11px] mt-2 font-medium opacity-70 ${
                    msg.type === 'moderator'
                      ? 'text-muted-foreground'
                      : 'text-primary-foreground/80'
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && typingParticipant && (
            <div
              className={`flex gap-3 animate-in fade-in duration-200 ${
                typingParticipant === 'moderator' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`px-5 py-4 rounded-3xl ${
                  typingParticipant === 'moderator'
                    ? 'bg-muted/60 rounded-bl-sm'
                    : 'bg-primary text-primary-foreground rounded-br-sm shadow-sm'
                }`}
              >
                <div className="flex gap-1.5 items-center h-4">
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s] ${typingParticipant === 'moderator' ? 'bg-foreground/50' : 'bg-primary-foreground'}`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s] ${typingParticipant === 'moderator' ? 'bg-foreground/50' : 'bg-primary-foreground'}`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${typingParticipant === 'moderator' ? 'bg-foreground/50' : 'bg-primary-foreground'}`}></span>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible div to snap scroll to bottom */}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
        <Button
          onClick={nextPage}
          size="lg"
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
        >
          Analyze Insights
        </Button>
        <Button type="button" variant="outline" size="lg" className="px-10 text-base">
          Export Transcripts
        </Button>
      </div>
    </div>
  )
}