import rawData from './soro-edtech-research-data.json'

export type Sentiment = 'positive' | 'neutral' | 'negative'

export type Category =
  | 'lecture_material_lossy'
  | 'content_fragmentation'
  | 'no_understanding_feedback'
  | 'cram_time_pressure'
  | 'past_question_reliance'
  | 'tool_inadequacy'
  | 'peer_dependency'
  | 'note_organization'

export interface DemoBrief {
  brandName: string
  objectives: string
  targetAudience: string
  keyQuestions: string
}

export interface DemoStudent {
  id: string
  name: string
  campus: string
  course: string
  bio: string
  compatibilityScore: number
  status: 'analyzing' | 'matched' | 'selected'
}

export interface DemoMessage {
  id: string
  type: 'student' | 'moderator'
  content: string
  timestamp: string
  studentName?: string
}

export interface DemoConversation {
  studentName: string
  studentCampus: string
  studentCourse: string
  duration: string
  insightsCount: number
  messages: DemoMessage[]
}

export interface DemoLens {
  eyebrow: string
  title: string
  description: string
  nextMove: string
  nextMoveDetail: string
  categories: Category[]
  evidenceTitle: string
  evidenceDescription: string
}

export interface DemoInsight {
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

export const meta = rawData.meta
export const categoryLabels = rawData.categoryLabels as Record<Category, string>
export const categoryActions = rawData.categoryActions as Record<Category, string>
export const lensContent = rawData.lensContent as Record<'decision' | 'product' | 'marketing' | 'campaign', DemoLens>
export const conversations = rawData.conversations as DemoConversation[]
export const insights = rawData.insights as DemoInsight[]
export const students = rawData.matchingStudents as DemoStudent[]

export const brief: DemoBrief = {
  brandName: 'Sóró EdTech Research',
  objectives: meta.researchTopic,
  targetAudience: 'Nigerian university students across different courses, campuses, and study routines.',
  keyQuestions: 'Where do study tools break down? How do students prepare under time pressure? What would make course material easier to understand, organize, and test?',
}

export const demoData = {
  meta,
  brief,
  categoryLabels,
  categoryActions,
  lensContent,
  students,
  conversations,
  insights,
}
