'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Search, Download, Layers, List } from 'lucide-react'
import { useFlow } from '@/contexts/flow-context'

type Sentiment = 'positive' | 'neutral' | 'negative'

type Category =
  | 'social_discovery'
  | 'peer_trigger'
  | 'budget_strategies'
  | 'vendor_trust'
  | 'physical_inspection'
  | 'personal_recommendation'
  | 'status_signaling'
  | 'return_fit'

interface InsightCard {
  id: string
  category: Category
  theme: string
  description: string
  frequency: number
  quote: string
  studentName: string
  studentCampus: string
  sentiment: Sentiment
}

const categoryLabels: Record<Category, string> = {
  social_discovery: 'Peer & Social Media Discovery',
  peer_trigger: 'Friends as Real-Time Gatekeepers',
  budget_strategies: 'Budget-Conscious Buying Strategies',
  vendor_trust: 'Vendor Trust Signals',
  physical_inspection: 'Physical Inspection & In-Person Bargaining',
  personal_recommendation: 'Trust via Personal or Family Recommendation',
  status_signaling: 'Fashion as Status Signaling',
  return_fit: 'Return Policy & Fit Concerns',
}

const mockInsights: InsightCard[] = [
  { id: 'c1', category: 'social_discovery', theme: 'Feed Exposure Builds Desire Over Time', description: 'Repeated exposure to a style on the feed builds desire gradually, well before any purchase actually happens', frequency: 8, quote: '"I kept seeing different styles on my feed and I was like this is pretty dope I need to get this"', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'positive' },
  { id: 'c2', category: 'budget_strategies', theme: 'Budget Delays Purchases, Not Interest', description: 'Students often want an item for months before buying — the delay is financial, not a lack of desire', frequency: 6, quote: '"I no guide honestly, that\'s why it took so long"', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'neutral' },
  { id: 'c3', category: 'peer_trigger', theme: 'Peer Styling Is the Final Trigger', description: 'Seeing someone similar to them wear an item in person is often the tipping point that converts interest into a purchase', frequency: 7, quote: '"I saw my coursemate wearing something similar to a hangout and it looked very nice on her, so that pushed me"', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'positive' },
  { id: 'c4', category: 'vendor_trust', theme: 'Quality Complaints Beat a Lower Price', description: 'A cheaper option loses out immediately once reviews mention poor quality — price becomes secondary', frequency: 6, quote: '"The reviews under her post were giving fabric too thin, I no gree"', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'neutral' },
  { id: 'c5', category: 'vendor_trust', theme: 'Recycled Customer Photos Kill Trust', description: 'Vendor photos that look staged or reused across "different customers" are an instant red flag, even for items the buyer already likes', frequency: 5, quote: '"The lighting and background were too consistent across different customers... felt fake so I closed the app"', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'negative' },

  { id: 't1', category: 'physical_inspection', theme: 'Physical Inspection Is Non-Negotiable for Shoes', description: 'For footwear specifically, students insist on seeing and touching the item before paying, regardless of how convenient online shopping is', frequency: 7, quote: '"For shoes I must see and touch am first, feel the material, check if the sole is still strong before I put my money"', studentName: 'Tunde Bakare', studentCampus: 'OAU, Ile-Ife', sentiment: 'positive' },
  { id: 't2', category: 'physical_inspection', theme: 'In-Person Bargaining Is Expected and Effective', description: 'At physical thrift markets, haggling is a normal and expected part of the transaction, and walking away is a real negotiating tactic', frequency: 6, quote: '"I talk am down to 5k... if you no haggle they go just dey smile"', studentName: 'Tunde Bakare', studentCampus: 'OAU, Ile-Ife', sentiment: 'positive' },

  { id: 'a1', category: 'social_discovery', theme: 'Influencer Credibility Gets Vetted via Past Comments', description: 'Before buying from an influencer-promoted item, students check the influencer\'s post history for prior complaints', frequency: 7, quote: '"I went to check her older posts first, to see if people were complaining under previous items she promoted"', studentName: 'Amara Nwosu', studentCampus: 'UNILAG, Lagos', sentiment: 'positive' },
  { id: 'a2', category: 'vendor_trust', theme: 'A Past Scam Increases Vendor Scrutiny Permanently', description: 'A single bad experience with a vendor changes buying behavior long-term, not just for that vendor but for how new vendors are vetted', frequency: 6, quote: '"Paid for a jacket, waited 3 weeks, nothing came, she blocked me. Since then I dey very careful"', studentName: 'Amara Nwosu', studentCampus: 'UNILAG, Lagos', sentiment: 'negative' },

  { id: 'f1', category: 'personal_recommendation', theme: 'Family Recommendation Overrides Need for Reviews', description: 'When a service provider comes recommended by a trusted family member, students skip independent verification entirely', frequency: 6, quote: '"My mother has used her for years, so I trusted her immediately"', studentName: 'Fatima Abdullahi', studentCampus: 'ABU, Zaria', sentiment: 'positive' },
  { id: 'f2', category: 'personal_recommendation', theme: 'Seeing Finished Work Builds Trust in New Providers', description: 'For high-risk purchases like tailoring, seeing a friend\'s actual finished item matters more than any review or rating', frequency: 5, quote: '"Seeing the actual finished work matters more than anything"', studentName: 'Fatima Abdullahi', studentCampus: 'ABU, Zaria', sentiment: 'positive' },

  { id: 'e1', category: 'budget_strategies', theme: 'Group-Buying Makes Higher-Priced Items Accessible', description: 'Splitting cost with a roommate or friend turns an otherwise unaffordable item into a viable purchase, often with an added vendor discount', frequency: 7, quote: '"We split it with my roommate... discount for buying as a pair"', studentName: 'Emeka Chukwu', studentCampus: 'UNN, Nsukka', sentiment: 'positive' },
  { id: 'e2', category: 'budget_strategies', theme: 'Shared Purchases Require Extra Coordination', description: 'Group-buying comes with a coordination cost — timing and style preferences have to be discussed and aligned before paying', frequency: 4, quote: '"We discuss well before before we pay"', studentName: 'Emeka Chukwu', studentCampus: 'UNN, Nsukka', sentiment: 'neutral' },

  { id: 'b1', category: 'social_discovery', theme: 'TikTok Trends Drive In-Person Thrift Hunting', description: 'Short-form video content is pushing students toward physical thrift markets in search of more "original" pieces than mass-market new clothing', frequency: 7, quote: '"TikTok honestly, I kept seeing people style thrifted pieces in really creative ways"', studentName: 'Blessing Etim', studentCampus: 'UNIBEN, Benin City', sentiment: 'positive' },
  { id: 'b2', category: 'peer_trigger', theme: 'Friends Act as Real-Time Purchase Gatekeepers', description: 'Shopping in groups means friends can veto a purchase in the moment, and that veto is usually respected immediately', frequency: 6, quote: '"Blessing no... I put it back immediately"', studentName: 'Blessing Etim', studentCampus: 'UNIBEN, Benin City', sentiment: 'neutral' },

  { id: 'd1', category: 'status_signaling', theme: 'Clothing Choices Signal Social Status on Campus', description: 'Specific items, especially shoes, are read by peers as signals of how seriously someone takes their appearance and social standing', frequency: 7, quote: '"People notice shoes especially, I wanted something that put me in a certain category"', studentName: 'David Okonkwo', studentCampus: 'Covenant, Ota', sentiment: 'positive' },
  { id: 'd2', category: 'status_signaling', theme: 'Fear of Being Seen in Fakes Pushes Buyers Toward Originals', description: 'In status-conscious campus environments, the risk of being caught wearing a fake outweighs the cost savings of buying one', frequency: 6, quote: '"People around here can tell the real from fake almost immediately"', studentName: 'David Okonkwo', studentCampus: 'Covenant, Ota', sentiment: 'negative' },

  { id: 'z1', category: 'vendor_trust', theme: 'Slow Vendor Response Before Payment Is a Red Flag', description: 'Responsiveness before any money changes hands is treated as a strong predictor of how a vendor will behave after payment', frequency: 7, quote: '"If a vendor is slow to reply before I\'ve even paid them, I already know after payment go worse"', studentName: 'Zainab Yusuf', studentCampus: 'BUK, Kano', sentiment: 'negative' },
  { id: 'z2', category: 'vendor_trust', theme: 'Fast Responses and Tracking Rebuild Buyer Confidence', description: 'Quick pre-sale communication and delivery tracking directly counteract past bad experiences with other vendors', frequency: 6, quote: '"She replied fast... sends tracking updates once you pay"', studentName: 'Zainab Yusuf', studentCampus: 'BUK, Kano', sentiment: 'positive' },

  { id: 'k1', category: 'budget_strategies', theme: 'Buyers Deliberately Wait for Sales to Manage Budget', description: 'During tight financial periods like school fees season, students consciously delay non-urgent purchases until a known sale window', frequency: 7, quote: '"Anything that\'s not urgent I just hold... once I see the countdown I know to wait"', studentName: 'Kelechi Nwachukwu', studentCampus: 'FUTA, Akure', sentiment: 'positive' },
  { id: 'k2', category: 'budget_strategies', theme: 'Waiting for a Sale Risks Losing the Item', description: 'The trade-off for disciplined waiting is sometimes losing out on the exact item, which buyers generally accept without much regret', frequency: 4, quote: '"I lost a shirt I liked, but I don\'t regret waiting"', studentName: 'Kelechi Nwachukwu', studentCampus: 'FUTA, Akure', sentiment: 'neutral' },

  { id: 'ai1', category: 'return_fit', theme: 'Unclear Return Policies Are a Dealbreaker Before Adding to Cart', description: 'After a stressful return experience, checking the return policy became the very first step before browsing any product further', frequency: 7, quote: '"First thing I check is the return policy, if I don\'t see one clearly stated I just close the page"', studentName: 'Aisha Mohammed', studentCampus: 'LASU, Lagos', sentiment: 'positive' },
  { id: 'ai2', category: 'return_fit', theme: 'Bad Sizing Experiences Push Buyers to Verify Measurements Directly', description: 'Rather than trust a generic size chart, students now message vendors directly for exact measurements after a poor-fit experience', frequency: 6, quote: '"I now message vendors directly to ask for exact measurements instead of trusting the size chart alone"', studentName: 'Aisha Mohammed', studentCampus: 'LASU, Lagos', sentiment: 'positive' },
]

const campuses = [
  'UI, Ibadan',
  'OAU, Ile-Ife',
  'UNILAG, Lagos',
  'ABU, Zaria',
  'UNN, Nsukka',
  'UNIBEN, Benin City',
  'Covenant, Ota',
  'BUK, Kano',
  'FUTA, Akure',
  'LASU, Lagos',
]

const sentiments: Sentiment[] = ['positive', 'neutral', 'negative']
const totalConversations = 10
const totalQuotes = 53

export function InsightsDashboard() {
  const [view, setView] = useState<'individual' | 'aggregated'>('individual')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null)
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null)

  const filteredIndividual = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return mockInsights.filter((insight) => {
      const matchesSearch =
        query === '' ||
        insight.theme.toLowerCase().includes(query) ||
        insight.description.toLowerCase().includes(query) ||
        insight.quote.toLowerCase().includes(query) ||
        insight.studentName.toLowerCase().includes(query)

      const matchesCampus = !selectedCampus || insight.studentCampus === selectedCampus
      const matchesSentiment = !selectedSentiment || insight.sentiment === selectedSentiment

      return matchesSearch && matchesCampus && matchesSentiment
    })
  }, [searchQuery, selectedCampus, selectedSentiment])

  // Real aggregation: group individual insights by category, across every conversation in the batch
  const aggregatedInsights = useMemo(() => {
    const groups = new Map<
      Category,
      {
        category: Category
        totalFrequency: number
        insightCount: number
        sources: { studentName: string; studentCampus: string; quote: string; sentiment: Sentiment }[]
      }
    >()

    for (const insight of mockInsights) {
      const existing = groups.get(insight.category)
      if (existing) {
        existing.totalFrequency += insight.frequency
        existing.insightCount += 1
        existing.sources.push({
          studentName: insight.studentName,
          studentCampus: insight.studentCampus,
          quote: insight.quote,
          sentiment: insight.sentiment,
        })
      } else {
        groups.set(insight.category, {
          category: insight.category,
          totalFrequency: insight.frequency,
          insightCount: 1,
          sources: [
            {
              studentName: insight.studentName,
              studentCampus: insight.studentCampus,
              quote: insight.quote,
              sentiment: insight.sentiment,
            },
          ],
        })
      }
    }

    return Array.from(groups.values())
      .map((g) => {
        const uniqueStudents = new Set(g.sources.map((s) => s.studentName))
        const sentimentCounts = g.sources.reduce(
          (acc, s) => {
            acc[s.sentiment] += 1
            return acc
          },
          { positive: 0, neutral: 0, negative: 0 } as Record<Sentiment, number>
        )
        const dominantSentiment = (Object.entries(sentimentCounts).sort(
          (a, b) => b[1] - a[1]
        )[0][0]) as Sentiment

        return {
          ...g,
          conversationCount: uniqueStudents.size,
          dominantSentiment,
        }
      })
      .sort((a, b) => b.totalFrequency - a.totalFrequency)
  }, [])

  const filteredAggregated = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return aggregatedInsights.filter((group) => {
      const label = categoryLabels[group.category].toLowerCase()
      const matchesSearch =
        query === '' ||
        label.includes(query) ||
        group.sources.some((s) => s.quote.toLowerCase().includes(query))

      const matchesCampus =
        !selectedCampus || group.sources.some((s) => s.studentCampus === selectedCampus)

      const matchesSentiment =
        !selectedSentiment || group.dominantSentiment === selectedSentiment

      return matchesSearch && matchesCampus && matchesSentiment
    })
  }, [aggregatedInsights, searchQuery, selectedCampus, selectedSentiment])

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCampus || selectedSentiment

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCampus(null)
    setSelectedSentiment(null)
  }

  const sentimentClass = (s: Sentiment) =>
    s === 'positive'
      ? 'bg-accent/15 text-accent'
      : s === 'neutral'
        ? 'bg-secondary/15 text-secondary'
        : 'bg-red-100/15 text-red-700'

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-6xl font-display font-bold text-foreground mb-4 leading-tight">
          Research Insights
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
          AI-synthesized insights from conversations, organized by themes and behavioral patterns. All linked to original quotes and student profiles.
        </p>
      </div>

      {/* Batch banner */}
      <div className="mb-8 p-5 rounded-xl border border-border/50 bg-muted/20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Batch #1 · {totalConversations} conversations across {campuses.length} campuses
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This demo batch has {totalConversations} conversations. Larger batches (50, 100+) aggregate the same way — themes get stronger, not more scattered.
          </p>
        </div>
      </div>

      {/* View toggle */}
      <div className="mb-8 inline-flex rounded-xl border border-border/50 p-1 bg-muted/20">
        <button
          onClick={() => setView('individual')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            view === 'individual'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-foreground hover:bg-muted/40'
          }`}
        >
          <List className="w-4 h-4" />
          By Conversation
        </button>
        <button
          onClick={() => setView('aggregated')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            view === 'aggregated'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-foreground hover:bg-muted/40'
          }`}
        >
          <Layers className="w-4 h-4" />
          Aggregated (All {totalConversations})
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-10 space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search insights, quotes, themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-5 py-4 rounded-xl border border-border bg-card/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth hover:border-primary/30"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Filter:
          </div>
          <div className="flex flex-wrap gap-2">
            {campuses.map((campus) => (
              <button
                key={campus}
                onClick={() => setSelectedCampus(selectedCampus === campus ? null : campus)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-smooth ${
                  selectedCampus === campus
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/30 text-foreground hover:bg-muted/50'
                }`}
              >
                {campus}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-2">
            {sentiments.map((sentiment) => (
              <button
                key={sentiment}
                onClick={() =>
                  setSelectedSentiment(selectedSentiment === sentiment ? null : sentiment)
                }
                className={`px-3 py-2 rounded-full text-xs font-medium transition-smooth ${
                  selectedSentiment === sentiment
                    ? 'bg-secondary text-secondary-foreground shadow-sm'
                    : 'bg-muted/30 text-foreground hover:bg-muted/50'
                }`}
              >
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </button>
            ))}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-primary transition-smooth underline ml-2"
            >
              Clear all
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <p className="text-xs text-muted-foreground">
            {view === 'individual'
              ? `Showing ${filteredIndividual.length} of ${mockInsights.length} insights`
              : `Showing ${filteredAggregated.length} of ${aggregatedInsights.length} aggregated themes`}
          </p>
        )}
      </div>

      {/* INDIVIDUAL VIEW */}
      {view === 'individual' && (
        <div className="grid gap-5 mb-12">
          {filteredIndividual.length === 0 ? (
            <div className="p-12 rounded-xl border border-dashed border-border/50 text-center">
              <p className="text-sm text-muted-foreground">No insights match your search or filters.</p>
              <button onClick={clearFilters} className="text-sm text-primary font-medium hover:underline mt-2">
                Clear filters
              </button>
            </div>
          ) : (
            filteredIndividual.map((insight) => (
              <div
                key={insight.id}
                className="p-7 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-smooth group"
              >
                <div className="flex items-start justify-between gap-6 mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {insight.theme}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sentimentClass(insight.sentiment)}`}>
                        {insight.sentiment.charAt(0).toUpperCase() + insight.sentiment.slice(1)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted/40 text-muted-foreground">
                        {categoryLabels[insight.category]}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed">{insight.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Frequency
                    </p>
                    <p className="text-4xl font-bold text-primary">{insight.frequency}</p>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-muted/20 border border-border/30 mb-5">
                  <p className="text-sm italic text-foreground/80 leading-relaxed">{insight.quote}</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-3">
                    — {insight.studentName} · {insight.studentCampus}
                  </p>
                </div>

                <div className="flex gap-4 text-xs text-muted-foreground">
                  <button className="hover:text-primary transition-smooth font-medium">View Conversation</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* AGGREGATED VIEW */}
      {view === 'aggregated' && (
        <div className="grid gap-5 mb-12">
          {filteredAggregated.length === 0 ? (
            <div className="p-12 rounded-xl border border-dashed border-border/50 text-center">
              <p className="text-sm text-muted-foreground">No themes match your search or filters.</p>
              <button onClick={clearFilters} className="text-sm text-primary font-medium hover:underline mt-2">
                Clear filters
              </button>
            </div>
          ) : (
            filteredAggregated.map((group) => (
              <div
                key={group.category}
                className="p-7 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-smooth group"
              >
                <div className="flex items-start justify-between gap-6 mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {categoryLabels[group.category]}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sentimentClass(group.dominantSentiment)}`}>
                        {group.dominantSentiment.charAt(0).toUpperCase() + group.dominantSentiment.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Appears across {group.conversationCount} of {totalConversations} conversations, from {new Set(group.sources.map((s) => s.studentCampus)).size} different campus{new Set(group.sources.map((s) => s.studentCampus)).size === 1 ? '' : 'es'}.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Combined Frequency
                    </p>
                    <p className="text-4xl font-bold text-primary">{group.totalFrequency}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {group.sources.map((source, idx) => (
                    <div key={idx} className="p-5 rounded-lg bg-muted/20 border border-border/30">
                      <p className="text-sm italic text-foreground/80 leading-relaxed">{source.quote}</p>
                      <p className="text-xs font-semibold text-muted-foreground mt-3">
                        — {source.studentName} · {source.studentCampus}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="font-medium">
                    {group.insightCount} related insight{group.insightCount === 1 ? '' : 's'} · {group.conversationCount} student{group.conversationCount === 1 ? '' : 's'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-smooth">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Total Insights</p>
          <p className="text-3xl font-bold text-primary">{mockInsights.length}</p>
        </div>
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-smooth">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Conversations</p>
          <p className="text-3xl font-bold text-primary">{totalConversations}</p>
        </div>
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-smooth">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Total Quotes</p>
          <p className="text-3xl font-bold text-primary">{totalQuotes}</p>
        </div>
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-smooth">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Aggregated Themes</p>
          <p className="text-3xl font-bold text-primary">{aggregatedInsights.length}</p>
        </div>
      </div>

      {/* Export */}
      <div className="p-8 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-smooth flex items-center justify-between gap-6">
        <div>
          <h3 className="font-semibold text-foreground mb-2 text-lg">Export Research Summary</h3>
          <p className="text-sm text-foreground/70">
            Download a comprehensive report with all insights, quotes, and demographic breakdowns
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 flex-shrink-0">
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>

      {/* Demographic Breakdown */}
      <div className="mt-16 space-y-6">
        <h2 className="text-3xl font-display font-bold text-foreground">Demographic Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-smooth">
            <p className="text-xs font-semibold text-muted-foreground mb-5 uppercase tracking-wide">By Campus</p>
            <div className="space-y-3">
              {campuses.map((campus) => {
                const count = mockInsights.filter((i) => i.studentCampus === campus).length
                const pct = Math.round((count / mockInsights.length) * 100)
                return (
                  <div key={campus} className="flex justify-between items-center group">
                    <p className="text-sm text-foreground group-hover:text-primary transition-smooth">{campus}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground w-8 text-right">
                        {pct}
                        <span className="text-[10px]">%</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-smooth">
            <p className="text-xs font-semibold text-muted-foreground mb-5 uppercase tracking-wide">By Theme</p>
            <div className="space-y-3">
              {aggregatedInsights.map((group) => {
                const pct = Math.round((group.totalFrequency / aggregatedInsights.reduce((a, g) => a + g.totalFrequency, 0)) * 100)
                return (
                  <div key={group.category} className="flex justify-between items-center group">
                    <p className="text-sm text-foreground group-hover:text-secondary transition-smooth">
                      {categoryLabels[group.category]}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground w-8 text-right">
                        {pct}
                        <span className="text-[10px]">%</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}