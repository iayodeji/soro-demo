'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
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
      { id: '1', type: 'moderator', content: 'hey Tunde, when last did you buy any clothing item or shoes, walk me through it', timestamp: '4:10 PM' },
      { id: '2', type: 'student', content: 'last month I got a pair of sneakers from the popular thrift spot near school, the ground where they spread everything for you to select', timestamp: '4:11 PM', studentName: 'Tunde' },
      { id: '3', type: 'moderator', content: 'what made you go there instead of buying online', timestamp: '4:11 PM' },
      { id: '4', type: 'student', content: 'for shoes I must see and touch am first, feel the material, check if the sole is still strong before I put my money. online you fit rest your money for something wey no even correct', timestamp: '4:12 PM', studentName: 'Tunde' },
      { id: '5', type: 'moderator', content: 'did you haggle the price at all', timestamp: '4:13 PM' },
      { id: '6', type: 'student', content: "definitely, the guy wanted 7k I talk am down to 5k, that's normal for that market, if you no haggle they go just dey smile", timestamp: '4:13 PM', studentName: 'Tunde' },
      { id: '7', type: 'moderator', content: 'was there a moment you almost walked away from that particular pair', timestamp: '4:14 PM' },
      { id: '8', type: 'student', content: 'yeah when he no gree go below 6k first, I just style waka comot, then he call me back', timestamp: '4:14 PM', studentName: 'Tunde' },
      { id: '9', type: 'moderator', content: "interesting, what's your line for online shopping generally then, do you ever buy clothes online", timestamp: '4:15 PM' },
      { id: '10', type: 'student', content: "only for things wey I don already sure of like plain tees from a brand I don buy before, anything wey needs trying on I no dey risk am online", timestamp: '4:16 PM', studentName: 'Tunde' },
      { id: '11', type: 'moderator', content: 'thanks a lot for your time Tunde, this was really helpful', timestamp: '4:16 PM' },
    ],
  },
  {
    studentName: 'Amara Nwosu',
    studentCampus: 'UNILAG, Lagos',
    studentCourse: 'Mass Communication',
    duration: '6 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hi Amara, tell me about the last piece of clothing or accessory you actually paid for', timestamp: '11:02 AM' },
      { id: '2', type: 'student', content: 'a bag, I saw an influencer post it on her page, one of those "designer inspired" bags, I loved it immediately', timestamp: '11:03 AM', studentName: 'Amara' },
      { id: '3', type: 'moderator', content: 'what did you do after seeing the post, did you buy immediately', timestamp: '11:03 AM' },
      { id: '4', type: 'student', content: 'no o, I went to check her older posts first, to see if people were complaining under previous items she promoted', timestamp: '11:04 AM', studentName: 'Amara' },
      { id: '5', type: 'moderator', content: 'what were you specifically looking for in those older comments', timestamp: '11:05 AM' },
      { id: '6', type: 'student', content: 'if people said the item never arrived or looked nothing like the picture, that would have stopped me', timestamp: '11:05 AM', studentName: 'Amara' },
      { id: '7', type: 'moderator', content: 'and this time, what did you find', timestamp: '11:06 AM' },
      { id: '8', type: 'student', content: 'comments were mixed, some said quality was okay for the price, none said it never arrived, that gave me small confidence', timestamp: '11:06 AM', studentName: 'Amara' },
      { id: '9', type: 'moderator', content: 'was price a big factor in the decision', timestamp: '11:07 AM' },
      { id: '10', type: 'student', content: "not really, it was more about whether I'll be scammed, I've been scammed before by a different page so now I check well well", timestamp: '11:07 AM', studentName: 'Amara' },
      { id: '11', type: 'moderator', content: "what happened the time you got scammed, if you don't mind sharing", timestamp: '11:08 AM' },
      { id: '12', type: 'student', content: 'paid for a jacket, waited 3 weeks, nothing came, she blocked me. since then I dey very careful', timestamp: '11:09 AM', studentName: 'Amara' },
      { id: '13', type: 'moderator', content: 'thank you so much Amara, really appreciate you sharing that', timestamp: '11:09 AM' },
    ],
  },
  {
    studentName: 'Fatima Abdullahi',
    studentCampus: 'ABU, Zaria',
    studentCourse: 'Pharmacy',
    duration: '5 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hi Fatima, walk me through the last clothing purchase you made', timestamp: '9:20 AM' },
      { id: '2', type: 'student', content: "for last Eid I sew a new outfit, I didn't buy ready-made", timestamp: '9:21 AM', studentName: 'Fatima' },
      { id: '3', type: 'moderator', content: 'what made you choose to sew instead of buying something already made', timestamp: '9:21 AM' },
      { id: '4', type: 'student', content: "ready-made rarely fits me well around the waist, and I wanted something unique, not what everybody for campus go dey wear", timestamp: '9:22 AM', studentName: 'Fatima' },
      { id: '5', type: 'moderator', content: 'how did you find the tailor you used', timestamp: '9:23 AM' },
      { id: '6', type: 'student', content: "my mother has used her for years, so I trusted her immediately, I didn't need to check reviews or anything", timestamp: '9:23 AM', studentName: 'Fatima' },
      { id: '7', type: 'moderator', content: 'would you have tried a new tailor without that recommendation', timestamp: '9:24 AM' },
      { id: '8', type: 'student', content: "no, sewing is risky, if it turns out bad you can't return fabric that's already been cut, so I only use who I trust or who someone I trust vouches for", timestamp: '9:25 AM', studentName: 'Fatima' },
      { id: '9', type: 'moderator', content: 'is there anything that would make you try an unfamiliar tailor', timestamp: '9:25 AM' },
      { id: '10', type: 'student', content: 'maybe if a close friend showed me something the tailor made for her and it looked really good, seeing the actual finished work matters more than anything', timestamp: '9:26 AM', studentName: 'Fatima' },
      { id: '11', type: 'moderator', content: 'thank you very much Fatima, this was really insightful', timestamp: '9:26 AM' },
    ],
  },
  {
    studentName: 'Emeka Chukwu',
    studentCampus: 'UNN, Nsukka',
    studentCourse: 'Computer Science',
    duration: '5 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hey Emeka, tell me about the last clothing item you bought', timestamp: '7:40 PM' },
      { id: '2', type: 'student', content: 'a hoodie, oversized streetwear kind, from a vendor that does bulk drops', timestamp: '7:41 PM', studentName: 'Emeka' },
      { id: '3', type: 'moderator', content: 'how did you end up affording it, was the price an issue', timestamp: '7:41 PM' },
      { id: '4', type: 'student', content: 'it was 15k which was too much for me alone, so I split it with my roommate, we ordered two together and the vendor gave us a discount for buying as a pair', timestamp: '7:42 PM', studentName: 'Emeka' },
      { id: '5', type: 'moderator', content: 'how often do you do that, buy things together with friends', timestamp: '7:43 PM' },
      { id: '6', type: 'student', content: "quite often actually, most of the guys on my floor do it, one person can't carry the full price alone especially this economy", timestamp: '7:43 PM', studentName: 'Emeka' },
      { id: '7', type: 'moderator', content: 'what happens if your roommate wants a different item than you at the time', timestamp: '7:44 PM' },
      { id: '8', type: 'student', content: "then we just wait, no point rushing, we'll combine again for the next thing whenever it aligns", timestamp: '7:44 PM', studentName: 'Emeka' },
      { id: '9', type: 'moderator', content: 'does buying in a group ever cause wahala, like disagreement on style or size', timestamp: '7:45 PM' },
      { id: '10', type: 'student', content: "sometimes, but we don dey used to it now, we discuss well before before we pay", timestamp: '7:45 PM', studentName: 'Emeka' },
      { id: '11', type: 'moderator', content: 'thanks a lot Emeka, appreciate the honesty', timestamp: '7:46 PM' },
    ],
  },
  {
    studentName: 'Blessing Etim',
    studentCampus: 'UNIBEN, Benin City',
    studentCourse: 'Theatre Arts',
    duration: '5 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hi Blessing, when last did you buy any clothes and what was it', timestamp: '3:15 PM' },
      { id: '2', type: 'student', content: 'two weekends ago, I went to the market to hunt for vintage pieces, I got like 3 tops', timestamp: '3:16 PM', studentName: 'Blessing' },
      { id: '3', type: 'moderator', content: 'what got you into hunting for vintage pieces specifically', timestamp: '3:16 PM' },
      { id: '4', type: 'student', content: 'TikTok honestly, I kept seeing people style thrifted pieces in really creative ways, it looked way more original than buying new', timestamp: '3:17 PM', studentName: 'Blessing' },
      { id: '5', type: 'moderator', content: 'how do you actually find good pieces when you go, is there a method', timestamp: '3:18 PM' },
      { id: '6', type: 'student', content: 'you just have to dig, most people rush and grab whatever, but if you take your time and go through the piles you find better things for less', timestamp: '3:18 PM', studentName: 'Blessing' },
      { id: '7', type: 'moderator', content: 'do you go alone or with friends', timestamp: '3:19 PM' },
      { id: '8', type: 'student', content: 'always with my girls, more eyes means more good finds, and we help each other decide if something suits or not', timestamp: '3:19 PM', studentName: 'Blessing' },
      { id: '9', type: 'moderator', content: 'has a friend ever talked you out of buying something at the market', timestamp: '3:20 PM' },
      { id: '10', type: 'student', content: 'yes o, I wanted this jacket and my friend just looked at me and said "Blessing no" 😂 I put it back immediately', timestamp: '3:20 PM', studentName: 'Blessing' },
      { id: '11', type: 'moderator', content: 'thank you so much Blessing, that was fun to hear', timestamp: '3:21 PM' },
    ],
  },
  {
    studentName: 'David Okonkwo',
    studentCampus: 'Covenant, Ota',
    studentCourse: 'Economics',
    duration: '5 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hey David, tell me about the last thing you bought clothes-wise', timestamp: '1:05 PM' },
      { id: '2', type: 'student', content: 'a pair of Nike sneakers, saved up for about a month for it', timestamp: '1:06 PM', studentName: 'David' },
      { id: '3', type: 'moderator', content: 'what made that particular pair worth saving a whole month for', timestamp: '1:06 PM' },
      { id: '4', type: 'student', content: 'on campus here, what you wear says a lot, people notice shoes especially, I wanted something that put me in a certain category', timestamp: '1:07 PM', studentName: 'David' },
      { id: '5', type: 'moderator', content: 'what category do you mean', timestamp: '1:08 PM' },
      { id: '6', type: 'student', content: 'like, guys who look put together, who take their appearance serious, it affects how people relate with you honestly', timestamp: '1:08 PM', studentName: 'David' },
      { id: '7', type: 'moderator', content: 'would you have bought a cheaper alternative that looked similar', timestamp: '1:09 PM' },
      { id: '8', type: 'student', content: 'no, because people around here can tell the real from fake almost immediately, so a fake would embarrass me more than not having it at all', timestamp: '1:09 PM', studentName: 'David' },
      { id: '9', type: 'moderator', content: 'how did you save for it, any specific method', timestamp: '1:10 PM' },
      { id: '10', type: 'student', content: 'I just stopped spending on small things weekly, no more random spending, I set the amount aside first before anything else', timestamp: '1:10 PM', studentName: 'David' },
      { id: '11', type: 'moderator', content: 'thanks so much David, really appreciate the time', timestamp: '1:11 PM' },
    ],
  },
  {
    studentName: 'Zainab Yusuf',
    studentCampus: 'BUK, Kano',
    studentCourse: 'Islamic Studies',
    duration: '5 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: "hi Zainab, what's the last clothing item you bought and how did that go", timestamp: '6:00 PM' },
      { id: '2', type: 'student', content: "an abaya from a vendor on Instagram, it actually arrived fine but I almost didn't order because of past delivery wahala", timestamp: '6:01 PM', studentName: 'Zainab' },
      { id: '3', type: 'moderator', content: 'what past experience are you referring to', timestamp: '6:01 PM' },
      { id: '4', type: 'student', content: "a different vendor took almost a month to deliver, and anytime I messaged her she wouldn't reply for days, that really discouraged me from ordering online again", timestamp: '6:02 PM', studentName: 'Zainab' },
      { id: '5', type: 'moderator', content: 'so what made you trust this new vendor enough to try again', timestamp: '6:03 PM' },
      { id: '6', type: 'student', content: 'she replied fast to my questions before I even paid, and she sends tracking updates once you pay, that made me feel safer', timestamp: '6:03 PM', studentName: 'Zainab' },
      { id: '7', type: 'moderator', content: 'is fast response before payment something you always check now', timestamp: '6:04 PM' },
      { id: '8', type: 'student', content: 'yes, if a vendor is slow to reply before I\'ve even paid them, I already know after payment go worse, so I just avoid', timestamp: '6:04 PM', studentName: 'Zainab' },
      { id: '9', type: 'moderator', content: 'are there other things that reassure you before ordering from a new vendor', timestamp: '6:05 PM' },
      { id: '10', type: 'student', content: "if she has a physical location she mentions, even if I'm not going there, it makes the business feel more real to me", timestamp: '6:05 PM', studentName: 'Zainab' },
      { id: '11', type: 'moderator', content: 'thank you so much for sharing that, Zainab', timestamp: '6:06 PM' },
    ],
  },
  {
    studentName: 'Kelechi Nwachukwu',
    studentCampus: 'FUTA, Akure',
    studentCourse: 'Civil Engineering',
    duration: '5 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hey Kelechi, walk me through the last clothing purchase you made', timestamp: '8:12 AM' },
      { id: '2', type: 'student', content: 'I bought 2 shirts during a end of month sale a vendor was running, I had been watching the page for weeks before that', timestamp: '8:13 AM', studentName: 'Kelechi' },
      { id: '3', type: 'moderator', content: 'why did you wait instead of just buying when you first saw the shirts', timestamp: '8:13 AM' },
      { id: '4', type: 'student', content: "school fees period no dey easy, so anything that's not urgent I just hold, I even muted notifications so I won't be tempted before the sale period", timestamp: '8:14 AM', studentName: 'Kelechi' },
      { id: '5', type: 'moderator', content: 'how did you know a sale was coming', timestamp: '8:15 AM' },
      { id: '6', type: 'student', content: 'the vendor always posts a countdown before their sales, so once I see the countdown I know to wait', timestamp: '8:15 AM', studentName: 'Kelechi' },
      { id: '7', type: 'moderator', content: 'does that mean you generally avoid buying clothes at full price', timestamp: '8:16 AM' },
      { id: '8', type: 'student', content: "except it's something urgent, like if my old shoe just spoil finish, everything else I can wait for", timestamp: '8:16 AM', studentName: 'Kelechi' },
      { id: '9', type: 'moderator', content: 'what if the item sells out before the sale happens', timestamp: '8:17 AM' },
      { id: '10', type: 'student', content: "that has happened before honestly, I lost a shirt I liked, but I don't regret waiting, I just move on to another thing", timestamp: '8:17 AM', studentName: 'Kelechi' },
      { id: '11', type: 'moderator', content: 'thanks a lot Kelechi, this was really useful', timestamp: '8:18 AM' },
    ],
  },
  {
    studentName: 'Aisha Mohammed',
    studentCampus: 'LASU, Lagos',
    studentCourse: 'Accounting',
    duration: '5 min',
    insightsCount: 2,
    messages: [
      { id: '1', type: 'moderator', content: 'hi Aisha, tell me about your last clothing purchase', timestamp: '5:30 PM' },
      { id: '2', type: 'student', content: 'I ordered a dress online that ended up too big, I had to return it', timestamp: '5:31 PM', studentName: 'Aisha' },
      { id: '3', type: 'moderator', content: 'how did the return process go', timestamp: '5:31 PM' },
      { id: '4', type: 'student', content: "honestly it stressed me, I had to argue with the vendor before she agreed, she kept saying it's my fault for choosing wrong size", timestamp: '5:32 PM', studentName: 'Aisha' },
      { id: '5', type: 'moderator', content: 'has that changed how you shop online now', timestamp: '5:33 PM' },
      { id: '6', type: 'student', content: "yes, before I even add anything to cart now, first thing I check is the return policy, if I don't see one clearly stated I just close the page", timestamp: '5:33 PM', studentName: 'Aisha' },
      { id: '7', type: 'moderator', content: 'is there a specific policy detail you look for', timestamp: '5:34 PM' },
      { id: '8', type: 'student', content: 'whether returns are free or I\'ll pay for the shipping back, some vendors will "accept returns" but you\'re the one paying extra, which is not really fair', timestamp: '5:34 PM', studentName: 'Aisha' },
      { id: '9', type: 'moderator', content: 'did that experience change how you pick sizes now too', timestamp: '5:35 PM' },
      { id: '10', type: 'student', content: 'yes, I now message vendors directly to ask for exact measurements instead of trusting the size chart alone', timestamp: '5:35 PM', studentName: 'Aisha' },
      { id: '11', type: 'moderator', content: 'thank you so much for your time, Aisha', timestamp: '5:36 PM' },
    ],
  },
]

export function ConversationView() {
  const { nextPage } = useFlow()
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [expandedStudents, setExpandedStudents] = useState<Set<number>>(
    new Set([0])
  )

  const conversation = mockConversations[selectedConversation]

  const toggleExpanded = (idx: number) => {
    const newSet = new Set(expandedStudents)
    if (newSet.has(idx)) {
      newSet.delete(idx)
    } else {
      newSet.add(idx)
    }
    setExpandedStudents(newSet)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-6xl font-display font-bold text-foreground mb-4 leading-tight">
          Research Conversations
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
          AI-moderated conversations using Mom Test principles. Each moderator guides natural, open-ended discussions without survey language or leading questions.
        </p>
      </div>

      {/* Batch banner */}
      <div className="mb-10 p-5 rounded-xl border border-border/50 bg-muted/20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Batch #1 · {mockConversations.length} of {mockConversations.length} conversations completed
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This is a demo batch of {mockConversations.length}. Sòrò batches typically run 50–100+ conversations across verified students on connected campuses.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/15 text-accent flex-shrink-0">
          All responses collected
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Student List */}
        <div className="lg:col-span-1">
          <div className="space-y-3 sticky top-32">
            <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              Conversations ({mockConversations.length})
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {mockConversations.map((conv, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedConversation(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-smooth ${
                    selectedConversation === idx
                      ? 'border-primary/50 bg-primary/8 hover:border-primary'
                      : 'border-border/50 hover:border-border hover:bg-muted/20'
                  }`}
                >
                  <p className="font-semibold text-foreground text-sm">
                    {conv.studentName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conv.studentCampus}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conversation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-2xl p-7 space-y-5">
            {/* Student Info */}
            <div className="pb-5 border-b border-border/50">
              <p className="text-xl font-semibold text-foreground mb-1">
                {conversation.studentName}
              </p>
              <p className="text-sm text-muted-foreground font-light">
                {conversation.studentCourse} • {conversation.studentCampus}
              </p>
            </div>

            {/* Messages */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {conversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.type === 'moderator'
                      ? 'justify-start'
                      : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-xs px-5 py-3 rounded-3xl transition-smooth ${
                      msg.type === 'moderator'
                        ? 'bg-muted/60 text-foreground rounded-3xl rounded-bl-none'
                        : 'bg-primary text-primary-foreground rounded-3xl rounded-br-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {msg.content}
                    </p>
                    <p
                      className={`text-xs mt-2 opacity-70 ${
                        msg.type === 'moderator'
                          ? 'text-muted-foreground'
                          : 'text-primary-foreground'
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Conversation Stats */}
            <div className="pt-5 border-t border-border/50 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                  Duration
                </p>
                <p className="text-lg font-bold text-primary">{conversation.duration}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                  Messages
                </p>
                <p className="text-lg font-bold text-primary">
                  {conversation.messages.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                  Insights
                </p>
                <p className="text-lg font-bold text-primary">{conversation.insightsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Conversations Expandable */}
      {mockConversations.length > 1 && (
        <details className="group mb-8">
          <summary className="cursor-pointer p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              View All {mockConversations.length} Conversations
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform" />
          </summary>
          <div className="mt-3 grid gap-3 p-4 border border-border rounded-lg bg-card">
            {mockConversations.map((conv, idx) => (
              <div
                key={idx}
                className="p-3 rounded border border-border/50 hover:bg-muted/30 transition-colors cursor-pointer flex items-center justify-between"
                onClick={() => setSelectedConversation(idx)}
              >
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {conv.studentName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conv.studentCourse} • {conv.studentCampus}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{conv.insightsCount} insights</p>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* CTA */}
      <div className="flex gap-4 pt-6 border-t border-border pt-8">
        <Button 
          onClick={nextPage}
          size="lg" 
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Analyze Insights
        </Button>
        <Button type="button" variant="outline" size="lg" className="px-8">
          Export Transcripts
        </Button>
      </div>
    </div>
  )
}