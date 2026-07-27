'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Download,
  Filter,
  MessageSquare,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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

interface Insight {
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
  social_discovery: 'Social & peer discovery',
  peer_trigger: 'Peer purchase triggers',
  budget_strategies: 'Budget management',
  vendor_trust: 'Vendor trust signals',
  physical_inspection: 'Physical inspection',
  personal_recommendation: 'Personal recommendations',
  status_signaling: 'Status & authenticity',
  return_fit: 'Fit & return confidence',
}

const categoryActions: Record<Category, string> = {
  social_discovery: 'Build repeated, creator-led product discovery instead of relying on a single conversion moment.',
  peer_trigger: 'Make peer proof visible at the moment a buyer is deciding.',
  budget_strategies: 'Offer clear price anchors, payment flexibility, and timed value offers.',
  vendor_trust: 'Lead with proof of quality, responsive support, and authentic customer evidence.',
  physical_inspection: 'Reduce product uncertainty with tactile detail, fit guidance, and transparent quality cues.',
  personal_recommendation: 'Turn trusted customers into a referral channel with visible, specific proof.',
  status_signaling: 'Make authenticity and social credibility easy to verify before purchase.',
  return_fit: 'Put measurements and a clear return policy before the add-to-cart decision.',
}

const mockInsights: Insight[] = [
  { id: 'c1', category: 'social_discovery', theme: 'Feed exposure builds desire over time', description: 'Repeated exposure to a style on social feeds builds desire well before the purchase actually happens.', frequency: 8, quote: '“I kept seeing different styles on my feed and I was like this is pretty dope I need to get this.”', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'positive' },
  { id: 'c2', category: 'budget_strategies', theme: 'Budget delays purchases, not interest', description: 'Students often want an item for months before buying; the delay is financial, not a lack of desire.', frequency: 6, quote: '“I no guide honestly, that’s why it took so long.”', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'neutral' },
  { id: 'c3', category: 'peer_trigger', theme: 'Peer styling is the final trigger', description: 'Seeing someone similar wear an item in person is often the tipping point that turns interest into a purchase.', frequency: 7, quote: '“I saw my coursemate wearing something similar… and it looked very nice on her, so that pushed me.”', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'positive' },
  { id: 'c4', category: 'vendor_trust', theme: 'Quality complaints beat a lower price', description: 'A cheaper option loses out once reviews mention poor quality; price becomes secondary.', frequency: 6, quote: '“The reviews under her post were giving fabric too thin, I no gree.”', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'neutral' },
  { id: 'c5', category: 'vendor_trust', theme: 'Recycled customer photos kill trust', description: 'Photos that look staged or reused are an instant red flag, even for items the buyer likes.', frequency: 5, quote: '“The lighting and background were too consistent across different customers… felt fake.”', studentName: 'Chioma Adeyemi', studentCampus: 'UI, Ibadan', sentiment: 'negative' },
  { id: 't1', category: 'physical_inspection', theme: 'Physical inspection is non-negotiable for shoes', description: 'For footwear, students want to see and touch the item before paying.', frequency: 7, quote: '“For shoes I must see and touch am first… check if the sole is still strong.”', studentName: 'Tunde Bakare', studentCampus: 'OAU, Ile-Ife', sentiment: 'positive' },
  { id: 't2', category: 'physical_inspection', theme: 'In-person bargaining is expected', description: 'At physical thrift markets, haggling and walking away are normal purchase tactics.', frequency: 6, quote: '“If you no haggle they go just dey smile.”', studentName: 'Tunde Bakare', studentCampus: 'OAU, Ile-Ife', sentiment: 'positive' },
  { id: 'a1', category: 'social_discovery', theme: 'Influencer credibility is vetted in comments', description: 'Students check prior comments and posts before trusting influencer-promoted items.', frequency: 7, quote: '“I went to check her older posts first, to see if people were complaining.”', studentName: 'Amara Nwosu', studentCampus: 'UNILAG, Lagos', sentiment: 'positive' },
  { id: 'a2', category: 'vendor_trust', theme: 'A past scam permanently increases scrutiny', description: 'One bad vendor experience changes how students vet every new seller.', frequency: 6, quote: '“Since then I dey very careful.”', studentName: 'Amara Nwosu', studentCampus: 'UNILAG, Lagos', sentiment: 'negative' },
  { id: 'f1', category: 'personal_recommendation', theme: 'Family recommendations override reviews', description: 'A trusted family referral can remove the need for independent verification.', frequency: 6, quote: '“My mother has used her for years, so I trusted her immediately.”', studentName: 'Fatima Abdullahi', studentCampus: 'ABU, Zaria', sentiment: 'positive' },
  { id: 'f2', category: 'personal_recommendation', theme: 'Finished work builds trust in new providers', description: 'For high-risk purchases, seeing a friend’s finished item matters more than ratings.', frequency: 5, quote: '“Seeing the actual finished work matters more than anything.”', studentName: 'Fatima Abdullahi', studentCampus: 'ABU, Zaria', sentiment: 'positive' },
  { id: 'e1', category: 'budget_strategies', theme: 'Group buying unlocks higher-priced items', description: 'Splitting cost with a friend turns an otherwise unaffordable item into a viable purchase.', frequency: 7, quote: '“We split it with my roommate… discount for buying as a pair.”', studentName: 'Emeka Chukwu', studentCampus: 'UNN, Nsukka', sentiment: 'positive' },
  { id: 'e2', category: 'budget_strategies', theme: 'Shared purchases need coordination', description: 'Group buying adds a coordination cost around timing and preferences.', frequency: 4, quote: '“We discuss well before before we pay.”', studentName: 'Emeka Chukwu', studentCampus: 'UNN, Nsukka', sentiment: 'neutral' },
  { id: 'b1', category: 'social_discovery', theme: 'TikTok trends drive thrift hunting', description: 'Short-form video is pushing students toward thrift markets for more original pieces.', frequency: 7, quote: '“TikTok honestly, I kept seeing people style thrifted pieces in really creative ways.”', studentName: 'Blessing Etim', studentCampus: 'UNIBEN, Benin City', sentiment: 'positive' },
  { id: 'b2', category: 'peer_trigger', theme: 'Friends act as real-time gatekeepers', description: 'Friends can veto a purchase in the moment and that veto is usually respected.', frequency: 6, quote: '“Blessing no… I put it back immediately.”', studentName: 'Blessing Etim', studentCampus: 'UNIBEN, Benin City', sentiment: 'neutral' },
  { id: 'd1', category: 'status_signaling', theme: 'Clothing choices signal social status', description: 'Specific items, especially shoes, signal how seriously someone takes appearance and standing.', frequency: 7, quote: '“People notice shoes especially, I wanted something that put me in a certain category.”', studentName: 'David Okonkwo', studentCampus: 'Covenant, Ota', sentiment: 'positive' },
  { id: 'd2', category: 'status_signaling', theme: 'Fear of fakes pushes buyers toward originals', description: 'The risk of being seen in a fake can outweigh the cost savings.', frequency: 6, quote: '“People around here can tell the real from fake almost immediately.”', studentName: 'David Okonkwo', studentCampus: 'Covenant, Ota', sentiment: 'negative' },
  { id: 'z1', category: 'vendor_trust', theme: 'Slow responses are a pre-payment red flag', description: 'Slow pre-sale replies are treated as a predictor of poor service after payment.', frequency: 7, quote: '“If a vendor is slow to reply before I’ve even paid them, I already know after payment go worse.”', studentName: 'Zainab Yusuf', studentCampus: 'BUK, Kano', sentiment: 'negative' },
  { id: 'z2', category: 'vendor_trust', theme: 'Fast replies and tracking rebuild confidence', description: 'Quick communication and delivery tracking counteract prior bad experiences.', frequency: 6, quote: '“She replied fast… sends tracking updates once you pay.”', studentName: 'Zainab Yusuf', studentCampus: 'BUK, Kano', sentiment: 'positive' },
  { id: 'k1', category: 'budget_strategies', theme: 'Buyers wait for sales to manage budget', description: 'During tight financial periods, students delay non-urgent purchases for known sale windows.', frequency: 7, quote: '“Anything that’s not urgent I just hold… once I see the countdown I know to wait.”', studentName: 'Kelechi Nwachukwu', studentCampus: 'FUTA, Akure', sentiment: 'positive' },
  { id: 'k2', category: 'budget_strategies', theme: 'Waiting for a sale can mean losing the item', description: 'Buyers generally accept the trade-off of losing an item when they wait for a better price.', frequency: 4, quote: '“I lost a shirt I liked, but I don’t regret waiting.”', studentName: 'Kelechi Nwachukwu', studentCampus: 'FUTA, Akure', sentiment: 'neutral' },
  { id: 'ai1', category: 'return_fit', theme: 'Unclear returns are a dealbreaker', description: 'A clear return policy is a first-check requirement after a stressful return experience.', frequency: 7, quote: '“First thing I check is the return policy… if I don’t see one clearly stated I just close the page.”', studentName: 'Aisha Mohammed', studentCampus: 'LASU, Lagos', sentiment: 'positive' },
  { id: 'ai2', category: 'return_fit', theme: 'Bad sizing drives direct verification', description: 'After poor fit experiences, students ask vendors for exact measurements.', frequency: 6, quote: '“I now message vendors directly to ask for exact measurements.”', studentName: 'Aisha Mohammed', studentCampus: 'LASU, Lagos', sentiment: 'positive' },
]

const campuses = [...new Set(mockInsights.map((insight) => insight.studentCampus))]
const totalConversations = 10
const totalQuotes = 53
const sentimentColors: Record<Sentiment, string> = {
  positive: '#7A8452',
  neutral: '#CFA331',
  negative: '#B74A26',
}

function formatPercent(value: number, total: number) {
  return total ? Math.round((value / total) * 100) : 0
}

export function InsightsDashboard() {
  const [selectedCampus, setSelectedCampus] = useState('all')
  const [selectedSentiment, setSelectedSentiment] = useState<'all' | Sentiment>('all')
  const [selectedCategory, setSelectedCategory] = useState<'all' | Category>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showAllEvidence, setShowAllEvidence] = useState(false)

  const filteredInsights = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return mockInsights.filter((insight) => {
      const matchesCampus = selectedCampus === 'all' || insight.studentCampus === selectedCampus
      const matchesSentiment = selectedSentiment === 'all' || insight.sentiment === selectedSentiment
      const matchesCategory = selectedCategory === 'all' || insight.category === selectedCategory
      const matchesSearch = !query || [insight.theme, insight.description, insight.quote, insight.studentName]
        .some((value) => value.toLowerCase().includes(query))

      return matchesCampus && matchesSentiment && matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCampus, selectedCategory, selectedSentiment])

  const themeData = useMemo(() => {
    const groups = new Map<Category, { category: Category; score: number; students: Set<string>; insights: Insight[] }>()

    filteredInsights.forEach((insight) => {
      const current = groups.get(insight.category) ?? {
        category: insight.category,
        score: 0,
        students: new Set<string>(),
        insights: [],
      }
      current.score += insight.frequency
      current.students.add(insight.studentName)
      current.insights.push(insight)
      groups.set(insight.category, current)
    })

    return [...groups.values()].sort((a, b) => b.score - a.score)
  }, [filteredInsights])

  const sentimentData = useMemo(() => {
    return (['positive', 'neutral', 'negative'] as Sentiment[]).map((sentiment) => ({
      sentiment,
      count: filteredInsights.filter((insight) => insight.sentiment === sentiment).length,
    }))
  }, [filteredInsights])

  const respondentCount = new Set(filteredInsights.map((insight) => insight.studentName)).size
  const maximumThemeScore = Math.max(...themeData.map((theme) => theme.score), 1)
  const activeFilters = [
    selectedCampus !== 'all' && selectedCampus,
    selectedSentiment !== 'all' && `${selectedSentiment[0].toUpperCase()}${selectedSentiment.slice(1)} signals`,
    selectedCategory !== 'all' && categoryLabels[selectedCategory],
    searchQuery.trim() && `“${searchQuery.trim()}”`,
  ].filter(Boolean) as string[]

  const clearFilters = () => {
    setSelectedCampus('all')
    setSelectedSentiment('all')
    setSelectedCategory('all')
    setSearchQuery('')
  }

  const donutStops = sentimentData.reduce(
    (stops, item, index) => {
      const start = stops[index - 1]?.end ?? 0
      const end = start + formatPercent(item.count, filteredInsights.length)
      stops.push({ ...item, start, end })
      return stops
    },
    [] as { sentiment: Sentiment; count: number; start: number; end: number }[]
  )

  const donutBackground = donutStops.length
    ? `conic-gradient(${donutStops.map((item) => `${sentimentColors[item.sentiment]} ${item.start}% ${item.end}%`).join(', ')})`
    : 'conic-gradient(var(--border) 0 100%)'

  const visibleEvidence = showAllEvidence ? filteredInsights : filteredInsights.slice(0, 5)

  return (
    <div className="w-full pb-8">
      <header className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">Research intelligence</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">What students need before they buy</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">A decision-ready readout of the strongest purchase signals from Batch #1. Start with what matters, then trace every claim back to the conversation evidence.</p>
        </div>
        <Button variant="outline" className="gap-2 border-border/70 bg-card/70 font-semibold">
          <Download className="h-4 w-4" /> Export summary
        </Button>
      </header>

      <section className="mb-8 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm md:p-5" aria-label="Research filters">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid flex-1 gap-3 sm:grid-cols-3">
            <label className="grid gap-1.5 text-xs font-semibold text-muted-foreground">
              Campus
              <select value={selectedCampus} onChange={(event) => setSelectedCampus(event.target.value)} className="h-10 rounded-lg border border-border/70 bg-background px-3 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                <option value="all">All campuses</option>
                {campuses.map((campus) => <option key={campus} value={campus}>{campus}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-muted-foreground">
              Signal type
              <select value={selectedSentiment} onChange={(event) => setSelectedSentiment(event.target.value as 'all' | Sentiment)} className="h-10 rounded-lg border border-border/70 bg-background px-3 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                <option value="all">All signals</option>
                <option value="positive">Positive signals</option>
                <option value="neutral">Neutral signals</option>
                <option value="negative">Risks & friction</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-muted-foreground">
              Research batch
              <select defaultValue="batch-1" className="h-10 rounded-lg border border-border/70 bg-background px-3 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                <option value="batch-1">Batch #1 · current</option>
              </select>
            </label>
          </div>
          <button onClick={() => setShowAdvancedFilters((shown) => !shown)} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30">
            <SlidersHorizontal className="h-4 w-4" /> Advanced filters <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showAdvancedFilters && (
          <div className="mt-4 grid gap-3 border-t border-border/50 pt-4 md:grid-cols-[1fr_220px]">
            <label className="relative block">
              <span className="sr-only">Search research evidence</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search themes, quotes, or students" className="h-10 w-full rounded-lg border border-border/70 bg-background pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30" />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-muted-foreground">
              Theme
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value as 'all' | Category)} className="h-10 rounded-lg border border-border/70 bg-background px-3 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                <option value="all">All themes</option>
                {(Object.keys(categoryLabels) as Category[]).map((category) => <option key={category} value={category}>{categoryLabels[category]}</option>)}
              </select>
            </label>
          </div>
        )}

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-4">
            <span className="text-xs font-semibold text-muted-foreground">Active filters</span>
            {activeFilters.map((filter) => <span key={filter} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"><Check className="h-3 w-3" /> {filter}</span>)}
            <button onClick={clearFilters} className="ml-1 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"><X className="h-3.5 w-3.5" /> Reset all</button>
          </div>
        )}
      </section>

      {filteredInsights.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
          <Filter className="mx-auto mb-3 h-7 w-7 text-muted-foreground" />
          <h2 className="text-lg font-bold text-foreground">No evidence matches these filters</h2>
          <p className="mt-1 text-sm text-muted-foreground">Try broadening the campus, signal type, or theme.</p>
          <Button onClick={clearFilters} variant="outline" className="mt-5">Reset filters</Button>
        </section>
      ) : (
        <>
          <section className="mb-8" aria-labelledby="executive-summary-heading">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Executive summary</p>
                <h2 id="executive-summary-heading" className="mt-1 text-2xl font-bold text-foreground">The decisions this research supports</h2>
              </div>
              <p className="hidden text-sm text-muted-foreground sm:block">Updated from the selected evidence</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between"><span className="rounded-lg bg-primary/10 p-2 text-primary"><MessageSquare className="h-4 w-4" /></span><span className="text-xs font-semibold text-muted-foreground">Batch #1</span></div>
                <p className="text-3xl font-bold text-foreground">{respondentCount}</p><p className="mt-1 text-sm text-muted-foreground">student conversations represented</p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between"><span className="rounded-lg bg-accent/15 p-2 text-accent"><BarChart3 className="h-4 w-4" /></span><span className="text-xs font-semibold text-muted-foreground">{themeData.length} themes</span></div>
                <p className="truncate text-xl font-bold text-foreground" title={themeData[0] ? categoryLabels[themeData[0].category] : ''}>{themeData[0] ? categoryLabels[themeData[0].category] : '—'}</p><p className="mt-1 text-sm text-muted-foreground">strongest recurring purchase signal</p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between"><span className="rounded-lg bg-secondary/15 p-2 text-secondary"><Users className="h-4 w-4" /></span><span className="text-xs font-semibold text-muted-foreground">Sample quality</span></div>
                <p className="text-3xl font-bold text-foreground">{totalConversations ? Math.round((respondentCount / totalConversations) * 100) : 0}%</p><p className="mt-1 text-sm text-muted-foreground">of the current 10-person batch</p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card/80 p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between"><span className="rounded-lg bg-primary/10 p-2 text-primary"><TrendingUp className="h-4 w-4" /></span><span className="text-xs font-semibold text-muted-foreground">Confidence</span></div>
                <p className="text-xl font-bold text-foreground">Directional</p><p className="mt-1 text-sm text-muted-foreground">Use to prioritize; validate at larger sample sizes.</p>
              </article>
            </div>
          </section>

          <section className="mb-8 grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
            <article className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm md:p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-2"><div><h2 className="text-lg font-bold text-foreground">Theme strength</h2><p className="mt-1 text-sm text-muted-foreground">Combined mention strength across the selected conversations.</p></div><span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">Higher = more recurring evidence</span></div>
              <div className="space-y-4">
                {themeData.slice(0, 6).map((theme) => <div key={theme.category} title={`${theme.score} combined mentions across ${theme.students.size} students`}><div className="mb-1.5 flex items-center justify-between gap-4"><span className="text-sm font-semibold text-foreground">{categoryLabels[theme.category]}</span><span className="shrink-0 text-xs font-bold text-primary">{theme.score} mentions · {theme.students.size} students</span></div><div className="h-2.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(theme.score / maximumThemeScore) * 100}%` }} /></div></div>)}
              </div>
            </article>

            <article className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm md:p-6">
              <div><h2 className="text-lg font-bold text-foreground">Signal mix</h2><p className="mt-1 text-sm text-muted-foreground">How the selected findings lean overall.</p></div>
              <div className="mt-6 flex items-center gap-6"><div className="relative grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{ background: donutBackground }} role="img" aria-label={`Signal distribution: ${sentimentData.map((item) => `${item.count} ${item.sentiment}`).join(', ')}`}><div className="grid h-24 w-24 place-items-center rounded-full bg-card text-center"><span className="text-2xl font-bold text-foreground">{filteredInsights.length}</span><span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">signals</span></div></div><div className="space-y-3">{sentimentData.map((item) => <div key={item.sentiment} className="flex items-center gap-2 text-sm" title={`${item.count} ${item.sentiment} signals`}><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sentimentColors[item.sentiment] }} /><span className="capitalize text-foreground">{item.sentiment}</span><span className="ml-auto font-semibold text-muted-foreground">{formatPercent(item.count, filteredInsights.length)}%</span></div>)}</div></div>
              <p className="mt-6 rounded-lg bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">Positive signals show moments to amplify; negative signals pinpoint purchase friction to remove.</p>
            </article>
          </section>

          <section className="mb-10" aria-labelledby="key-insights-heading">
            <div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">What to do next</p><h2 id="key-insights-heading" className="mt-1 text-2xl font-bold text-foreground">Priority insights, with proof</h2></div>
            <div className="grid gap-4 lg:grid-cols-3">
              {themeData.slice(0, 3).map((theme, index) => {
                const evidence = theme.insights.sort((a, b) => b.frequency - a.frequency)[0]
                return <article key={theme.category} className="flex flex-col rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">0{index + 1}</span><span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">{theme.students.size}/{respondentCount} students</span></div><h3 className="text-lg font-bold text-foreground">{categoryLabels[theme.category]}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{categoryActions[theme.category]}</p><div className="mt-5 border-l-2 border-primary/50 pl-3"><p className="text-sm italic leading-relaxed text-foreground/85">{evidence.quote}</p><p className="mt-2 text-xs font-semibold text-muted-foreground">{evidence.studentName} · {evidence.studentCampus}</p></div><div className="mt-auto pt-5 text-xs font-bold text-primary">Evidence strength: {theme.score} mentions</div></article>
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm md:p-6" aria-labelledby="evidence-heading">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Evidence library</p><h2 id="evidence-heading" className="mt-1 text-2xl font-bold text-foreground">Explore the conversations behind the charts</h2><p className="mt-1 text-sm text-muted-foreground">{filteredInsights.length} coded findings · {totalQuotes} supporting quotes in this batch</p></div><a href="/conversation" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">Open conversation viewer <ArrowUpRight className="h-4 w-4" /></a></div>
            <div className="divide-y divide-border/60">{visibleEvidence.map((insight) => <article key={insight.id} className="grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_auto]"><div><div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">{categoryLabels[insight.category]}</span><span className="text-xs font-bold text-primary">{insight.frequency} mentions</span></div><h3 className="font-bold text-foreground">{insight.theme}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{insight.description}</p><p className="mt-3 border-l-2 border-secondary pl-3 text-sm italic leading-relaxed text-foreground/85">{insight.quote}</p><p className="mt-2 text-xs font-semibold text-muted-foreground">{insight.studentName} · {insight.studentCampus}</p></div><a href="/conversation" className="inline-flex h-9 items-center justify-center gap-1 self-center rounded-lg border border-border px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5">View conversation <ArrowUpRight className="h-3.5 w-3.5" /></a></article>)}</div>
            {filteredInsights.length > 5 && <button onClick={() => setShowAllEvidence((showing) => !showing)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">{showAllEvidence ? 'Show fewer findings' : `Show all ${filteredInsights.length} findings`} <ChevronDown className={`h-4 w-4 transition-transform ${showAllEvidence ? 'rotate-180' : ''}`} /></button>}
          </section>
        </>
      )}
    </div>
  )
}
